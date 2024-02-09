import {validationResult} from "express-validator";
import {
    HTTP_OK, HTTP_INTERNAL_SERVER_ERROR, HTTP_VALIDATION_ERROR, HTTP_CREATED
} from "../../../../constants/statusCode"
import logger from "../../../../services/logger/loggerService";
import * as bcrypt from 'bcryptjs';
import prisma from "../../../../services/prisma/prisma";
import {success, error} from "../../../../helpers/apiResponse";
import * as jwt from "jsonwebtoken";
import {TOKEN_KEY} from "../../../../constants/jwt";
import md5 from "md5";

const register = async (request, response) => {
    try {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {first_name, last_name, email, password,referral_code} = request.body;
        let encryptPassword = await bcrypt.hash(password, 10);
        const md5 = require('md5');
        const registerForm = await prisma.user.create({
            data: {
                firstName: first_name,
                lastName: last_name,
                email: email,
                password: encryptPassword,
                totpSecret: '',
                lastLogin: '',
                referedBy: 1,
                remainingPoints: 3000,
                referralCode: md5(email)
            }
        });
        delete registerForm.password;
        const referralUser = await prisma.user.findFirst({
            where: {
                referralCode: referral_code
            }
        });
        if (referralUser){
            const totalPoints = (referralUser.remainingPoints + 3000);
            await prisma.user.update({
                where: {
                    email: referralUser.email
                },
                data: {
                    remainingPoints: totalPoints
                }
            });

            await prisma.referralToken.create({
                data:{
                    userId: registerForm.id,
                    token : referral_code
                }
            })
        }
        logger.info('user register');
        return response.status(HTTP_OK).send(success(registerForm, 'user created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`user register : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const login = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {email, password, referral_code} = request.body;
        const getUser = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!getUser) {
            return response.status(400).send(error('User not exists', 400));
        }
        let encryptPassword = await bcrypt.compare(password, getUser.password);
        if (!encryptPassword) {
            return response.status(400).send(error('Password not matched', 400));
        }
        let payload = {
            user_id: getUser.id, email
        };
        let additional = {expiresIn: '7days'};
        const token = jwt.sign(payload, TOKEN_KEY, additional);
        let userInfo = {
            user: getUser, token
        };
        delete userInfo.user.password;
        logger.info('user logged in');
        return response.status(HTTP_OK).send(success(userInfo, 'logged in successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`user logged in : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const fetchUser = async (request, response) => {
    try {
        const email = request.params.email;
        const user = await prisma.user.findUnique({
            where: {
                'email': email
            }
        });
        return response.status(HTTP_OK).send(success(user, 'fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`user fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const profileUpdate = async(request,response) => {
    try {
        const paramsEmail = request.params.email;
        let {first_name, last_name, email} = request.body;
        const user = await prisma.user.update({
            where: {
                'email': paramsEmail
            },
            data : {
                firstName: first_name,
                lastName: last_name,
                email: email,
            }
        });
        return response.status(HTTP_OK).send(success(user, 'Update successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`user fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {register, login, fetchUser,profileUpdate}