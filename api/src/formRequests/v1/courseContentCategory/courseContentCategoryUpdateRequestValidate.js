import {body, param} from "express-validator";
import prisma from "../../../services/prisma/prisma";

const courseContentCategoryUpdateRequestValidate = () => {
    return [
        body('content_category_title', 'Title Is Required').exists()
            .isString()
            .custom((value,{req}) => {
                if (value){
                    return prisma.courseContentCategory.findFirst({
                        where : {
                            contentCategoryTitle : value
                        }
                    }).then((courseContent) => {
                        if (courseContent && courseContent.id !== parseInt(req.params.is)){
                            return Promise.reject('Title Already Taken');
                        }
                    })
                }
            })
    ];
};

export default courseContentCategoryUpdateRequestValidate