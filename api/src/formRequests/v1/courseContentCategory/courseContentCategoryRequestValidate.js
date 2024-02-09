import {body} from "express-validator";
import prisma from "../../../services/prisma/prisma";

const courseContentCategoryRequestValidate = () => {
    return [
        body('content_category_title', 'Title Is Required').exists()
            .isString()
            .custom((value) => {
                if (value) {
                    return prisma.courseContentCategory.findFirst({where: {contentCategoryTitle: value}}).then((CourseContentCategory) => {
                        if (CourseContentCategory) {
                            return Promise.reject('Title is Taken');
                        }
                    });
                }
            }),
    ];
};

export default courseContentCategoryRequestValidate;