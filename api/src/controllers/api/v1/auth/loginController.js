import {validationResult} from "express-validator";
import {
    HTTP_OK,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_VALIDATION_ERROR,
    HTTP_CREATED
} from "../../../../constants/statusCode"
import logger from "../../../../services/logger/loggerService";
import * as bcrypt from 'bcryptjs';
import prisma from "../../../../services/prisma/prisma";
import {success, error} from "../../../../helpers/apiResponse";
import * as jwt from "jsonwebtoken";
import {TOKEN_KEY} from "../../../../constants/jwt";

const login = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {email, password} = request.body;
        const getUser = await prisma.adminUser.findFirst({
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
            user_id: getUser.id,
            email
        };
        let additional = {expiresIn: '7days'};
        const token = jwt.sign(payload, TOKEN_KEY, additional);
        let userInfo = {
            user: getUser,
            token
        };
        delete userInfo.user.password;
        logger.info('user logged in');
        return response.status(HTTP_OK).send(success(userInfo, 'logged in successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`user logged in : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }

}

const register = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {first_name, last_name, email, password} = request.body;
        let encryptPassword = await bcrypt.hash(password, 10);
        const userForm = await prisma.adminUser.create({
            data: {
                firstName: first_name,
                lastName: last_name,
                email: email,
                password: encryptPassword,
                totpSecret: '',
                lastLogin: '',
            }
        })
        delete userForm.password;
        logger.info('user register');
        return response.status(HTTP_OK).send(success(userForm, 'admin user created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`user register : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }

}


export {
    login,
    register,
}