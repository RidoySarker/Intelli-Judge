import { body } from "express-validator";
import prisma from "../../../services/prisma/prisma";

const contestRequestValidate = () => {
    return [
        body('title', 'Title Is Required').exists()
            .isString(),
        body('slug', 'Slug Is Required').exists()
            .isString()
            .custom((value) => {
                if (value) {
                    return prisma.contest.findFirst({where: {slug: value}}).then((contest) => {
                        if (contest) {
                            return Promise.reject('Slug is Taken');
                        }
                    });
                }
            }),
    ];
};

export default contestRequestValidate;