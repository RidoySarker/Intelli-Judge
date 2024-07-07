import { body } from "express-validator";
import prisma from "../../../services/prisma/prisma";

const contestRequestValidate = () => {
    return [
        body('title', 'Title Is Required').exists()
            .isString(),
    ];
};

export default contestRequestValidate;