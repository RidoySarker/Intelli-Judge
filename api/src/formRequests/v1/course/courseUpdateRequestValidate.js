import {body, param} from "express-validator";
import prisma from "../../../services/prisma/prisma";

const courseUpdateRequestValidate = () => {
    return [
        body('name', 'Name Is Required').exists()
            .isString()
            .custom((value, {req}) => {
                if (value) {
                    return prisma.Course.findFirst({
                        where: {
                            name: value
                        }
                    })
                        .then((Course) => {
                            if (Course && Course.id !== parseInt(req.params.id)) {
                                return Promise.reject('Name Already Taken');
                            }
                        });
                }
            }),
    ];
};

export default courseUpdateRequestValidate;