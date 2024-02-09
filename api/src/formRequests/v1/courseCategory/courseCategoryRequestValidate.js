import {body} from "express-validator";
import prisma from "../../../services/prisma/prisma";

const courseCategoryRequestValidate = () => {
    return [
        body('name', 'Name Is Required').exists()
            .isString()
            .custom((value) => {
                if (value) {
                    return prisma.courseCategory.findFirst({where: {name: value}}).then((courseCategory) => {
                        if (courseCategory) {
                            return Promise.reject('Name is Taken');
                        }
                    });
                }
            }),
    ];
};

export default courseCategoryRequestValidate;