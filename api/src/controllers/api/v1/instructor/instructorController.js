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
        const courseCategories = await prisma.instructor.findMany({
            skip: offSet,
            take: limit
        });
        return response.status(HTTP_OK).send(success(courseCategories,
            'instructor fetched successfully',
            HTTP_OK,
            getResponseMeta(request)
        ));
    } catch (exception) {
        logger.error(`instructor fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const store = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }

        let {name} = request.body;
        let image = request.files.image;
        let file_path = null;
        let new_path = null;
        if(image){
            new_path = '/assets/instructor/' + image.name;
            file_path = './public' + new_path;
            image.mv(file_path);
        }

        const instructor = await prisma.instructor.create({
            data: {
                name:name,
                image: new_path
            }
        })
        logger.info('create course category');
        return response.status(HTTP_OK).send(success(instructor, 'instructor created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create instructor : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const instructor = await prisma.instructor.findUnique({
            where: {
                id: id
            }
        });
        return response.status(HTTP_OK).send(success(instructor, 'instructor fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`instructor fetching : ${exception.message} `);
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
        let {name} = request.body;
        let image = request.files.image;
        let file_path = null;
        let new_path = null;
        if(image){
            new_path = '/assets/instructor/' + image.name;
            file_path = '.' + new_path;
            image.mv(file_path);
        }
        const instructor = await prisma.courseCategory.update({
            where: {
                id: id
            },
            data: {
                name:name,
                courseImage: new_path
            }
        })
        logger.info('update instructor');
        return response.status(HTTP_OK).send(success(instructor, 'instructor update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update instructor: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const destroy = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const instructor = await prisma.instructor.findUnique({
            where: {
                id: id
            }
        });
        if (instructor) {
            const instructor = await prisma.instructor.delete({
                where: {
                    id: id
                }
            });
        }
        return response.status(HTTP_OK).send(success([], 'instructor deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course instructor deleting : ${exception.message} `);
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