import {body} from "express-validator";
import prisma from "../../../services/prisma/prisma";

const courseContentRequestValidate = () => {
    return [
        body('course_id', 'Course Is Required'),
        body('content_category_id', 'Course Category Is Required'),
        body('content_title', 'Title Is Required').exists()
            .isString()
            .custom((value) => {
                if (value) {
                    return prisma.courseContent.findFirst({where: {contentTitle: value}})
                        .then((courseContent) => {
                            if (courseContent) {
                                return Promise.reject('Title is Taken');
                            }
                        });
                }
            }),
        body('content','Content is Required'),
    ];
};

export default courseContentRequestValidate;