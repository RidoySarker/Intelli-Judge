import {body, param} from "express-validator";
import prisma from "../../../services/prisma/prisma";
import request from "supertest";

const courseContentUpdateRequestValidate = () => {
    return [
        body('course_id', 'Course Is Required'),
        body('content_category_id', 'Course Category Is Required'),
        body('content_title', 'Title Is Required').exists()
            .isString()
            .custom((value,{req}) => {
                if (value) {
                    return prisma.courseContent.findFirst({
                        where : {
                            contentTitle : value
                        }
                    }).then((courseContent) => {
                        if (courseContent && courseContent.id !== parseInt(req.params.id) || 0){
                            return Promise.reject('Title Already Taken');
                        }
                    })
                }
            }),
        body('content','Content is Required'),
    ];
}

export default courseContentUpdateRequestValidate;