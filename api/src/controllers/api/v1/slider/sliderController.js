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
        const courseCategories = await prisma.slider.findMany({
            skip: offSet,
            take: limit
        });
        return response.status(HTTP_OK).send(success(courseCategories,
            'slider fetched successfully',
            HTTP_OK,
            getResponseMeta(request)
        ));
    } catch (exception) {
        logger.error(`slider fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const store = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }

        let image = request.files.image;
        let file_path = null;
        let new_path = null;
        if(image){
            new_path = '/assets/slider/' + image.name;
            file_path = './public' + new_path;
            image.mv(file_path);
        }

        const slider = await prisma.slider.create({
            data: {
                image: new_path
            }
        })
        logger.info('create slider');
        return response.status(HTTP_OK).send(success(slider, 'slider created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create slider : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const instructor = await prisma.slider.findUnique({
            where: {
                id: id
            }
        });
        return response.status(HTTP_OK).send(success(instructor, 'slider fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`slider fetching : ${exception.message} `);
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
        let image = request.files.image;
        let file_path = null;
        let new_path = null;
        if(image){
            new_path = '/assets/instructor/' + image.name;
            file_path = '.' + new_path;
            image.mv(file_path);
        }
        const slider = await prisma.slider.update({
            where: {
                id: id
            },
            data: {
                image: new_path
            }
        })
        logger.info('update slider');
        return response.status(HTTP_OK).send(success(slider, 'slider update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update instructor: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const destroy = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const slider = await prisma.slider.findUnique({
            where: {
                id: id
            }
        });
        if (slider) {
            const instructor = await prisma.slider.delete({
                where: {
                    id: id
                }
            });
        }
        return response.status(HTTP_OK).send(success([], 'slider deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`slider deleting : ${exception.message} `);
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