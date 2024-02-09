import {body} from "express-validator";
import prisma from "../../../services/prisma/prisma";

const courseRequestValidate = () => {
    return [
        body('name', 'Name Is Required').exists()
            .isString()
            .custom((value) => {
                if (value) {
                    return prisma.Course.findFirst({where: {name: value}}).then((Course) => {
                        if (Course) {
                            return Promise.reject('Name is Taken');
                        }
                    });
                }
            }),
    ];
};

export default courseRequestValidate;