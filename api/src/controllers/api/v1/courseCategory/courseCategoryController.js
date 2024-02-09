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
        const {offSet, limit} = getLimitOffset(request);
        const courseCategories = await prisma.courseCategory.findMany({
            skip: offSet,
            take: limit
        });
        return response.status(HTTP_OK).send(success(courseCategories,
            'course categories fetched successfully',
            HTTP_OK,
            getResponseMeta(request)
        ));
    } catch (exception) {
        logger.error(`course categories fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const store = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        
        let {name, status} = request.body;
        let course_image = request.files.courseImage;
        let file_path = null;
        let new_path = null;
        if(course_image){
            new_path = '/assets/course_category/' + course_image.name;
            file_path = './public' + new_path;
            course_image.mv(file_path);
        }
       
        // logger.info(file_path);
        
        const courseCategory = await prisma.courseCategory.create({
            data: {
                name:name,
                status: Boolean(status),
                courseImage: new_path
            }
        })
        logger.info('create course category');
        return response.status(HTTP_OK).send(success(courseCategory, 'course category created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create course category : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const courseCategory = await prisma.courseCategory.findUnique({
            where: {
                id: id
            }
        });
        return response.status(HTTP_OK).send(success(courseCategory, 'course category fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course categories fetching : ${exception.message} `);
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
        let {name, status} = request.body;
        let course_image = request.files.courseImage;
        let file_path = null ;
        let new_path = null;
        if(course_image){
            new_path = '/assets/course_category/' + course_image.name;
            file_path = '.' + new_path;
            course_image.mv(file_path);
        }
        const courseCategory = await prisma.courseCategory.update({
            where: {
                id: id
            },
            data: {
                name:name,
                status: Boolean(status),
                courseImage: new_path
            }
        })
        logger.info('update course category');
        return response.status(HTTP_OK).send(success(courseCategory, 'course category update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update course category: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const destroy = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const courseCategory = await prisma.courseCategory.findUnique({
            where: {
                id: id
            }
        });
        if (courseCategory) {
            const courseCategory = await prisma.courseCategory.delete({
                where: {
                    id: id
                }
            });
        }
        return response.status(HTTP_OK).send(success([], 'course deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course categories deleting : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {
    index,
    store,
    show,
    update,
    destroy,
}