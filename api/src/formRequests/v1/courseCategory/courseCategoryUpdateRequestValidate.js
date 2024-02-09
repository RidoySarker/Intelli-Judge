import {body, param} from "express-validator";
import prisma from "../../../services/prisma/prisma";

const courseCategoryRequestValidate = () => {
    return [
        body('name', 'Name Is Required').exists()
            .isString()
            .custom((value, {req}) => {
                if (value) {
                    return prisma.courseCategory.findFirst({
                        where: {
                            name: value
                        }
                    })
                        .then((courseCategory) => {
                            if (courseCategory && courseCategory.id !== parseInt(req.params.id)) {
                                return Promise.reject('Name Already Taken');
                            }
                        });
                }
            }),
    ];
};

export default courseCategoryRequestValidate;