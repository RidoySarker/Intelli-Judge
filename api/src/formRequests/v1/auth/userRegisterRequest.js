import {body} from "express-validator";
import prisma from "../../../services/prisma/prisma";

const userRegisterRequest = () => {
    return [
        body('first_name', 'First Name Is Required').exists().isString(),
        body('last_name', 'Last Name Is Required').exists().isString(),
        body('email', 'Email Is Required').exists().isEmail().normalizeEmail()
            .custom((value) => {
                if (value) {
                    return prisma.user.findFirst({where : {email : value}})
                        .then((user) => {
                            if (user) {
                                return Promise.reject('Email is Taken');
                            }
                        });
                }
            }),
        body('password', 'Password Is Required').exists().isLength({min: 8}),
    ];
}

export default userRegisterRequest;