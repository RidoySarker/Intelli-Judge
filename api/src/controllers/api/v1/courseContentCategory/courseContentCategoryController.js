import {getLimitOffset, getResponseMeta} from "../../../../helpers/pagination";
import prisma from "../../../../services/prisma/prisma";
import {error, success} from "../../../../helpers/apiResponse";
import {
    HTTP_CREATED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_OK,
    HTTP_VALIDATION_ERROR
} from "../../../../constants/statusCode";
import logger from "../../../../services/logger/loggerService";
import {validationResult} from "express-validator";

const index = async (request, response) => {
    try {
        const {offset, limit} = getLimitOffset(request);
        const course = await prisma.CourseContentCategory.findMany({
            skip: offset,
            take: limit,
            include : {
                course : true
            }
        });
        return response.status(HTTP_OK).send(success(course,
            'Course Content Category fetched successfully',
            HTTP_OK,
            getResponseMeta(request)
        ));
    } catch (exception) {
        logger.error(`courses fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}
const store = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {content_category_title, course_id} = request.body;
        let course_image = request.files.Image;
        let file_path = null;
        let new_path = null;
        if(course_image){
            new_path = '/assets/course_content_category/' + course_image.name;
            file_path = './public' + new_path
            course_image.mv(file_path);
        }
        const courseContentCategory = await prisma.courseContentCategory.create({
            data: {
                contentCategoryTitle: content_category_title,
                Image: new_path,
                course: {
                    connect: {id: parseInt(course_id)}
                }

            }
        })
        logger.info('create course content category');
        return response.status(HTTP_OK).send(success(courseContentCategory, 'course content category created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create course content category: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const courseContentCategory = await prisma.courseContentCategory.findUnique({
            where: {
                id: id
            }
        })
        return response.status(HTTP_OK).send(success(courseContentCategory, 'course content category fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course content category fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}
const update = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        const id = parseInt(request.params.id) || 0;
        let {content_category_title, course_id} = request.body;
        let course_image = request.files.Image;
        let file_path = null;
        let new_path = null;
        if(course_image){
            new_path = '/assets/course_content_category/' + course_image.name;
            file_path = './public' + new_path
            course_image.mv(file_path);
        }else{
            new_path = '';
        }
        const courseContentCategory = await prisma.courseContentCategory.update({
            where: {
                id: id
            },
            data: {
                contentCategoryTitle: content_category_title,
                Image: new_path,
                course: {
                    connect: {id: course_id}
                }
            }
        })
        logger.info('update course content category');
        return response.status(HTTP_OK).send(success(courseContentCategory, 'course content category update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update course content category: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}
const destroy = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const courseContentCategory = await prisma.courseContentCategory.findUnique({
            where: {
                id: id
            }
        });
        if (courseContentCategory) {
            const courseContentCategory = await prisma.courseContentCategory.delete({
                where: {
                    id: id
                }
            });
        }
        return response.status(HTTP_OK).send(success([], 'course content category deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course content category deleting : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {index, store, show, update, destroy}