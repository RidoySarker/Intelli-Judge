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

const index = async (request,response) => {
    try {
        const {offset,limit} = getLimitOffset(request);
        const courseContent = await prisma.courseContent.findMany({
            skip : offset,
            take : limit,
            include : {
                course : true,
                contentCategory : true
            }
        });
        return response.status(HTTP_OK).send(success(courseContent,
            'Course Content Fetched Successfully',
            HTTP_OK,
            getResponseMeta(request)
            ))
    } catch (exception) {
        logger.error(`course contents fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const store = async (request,response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()){
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {course_id,content_category_id,content_title,content} = request.body;
        let image = request.files.Image;
        let file_path = null;
        let new_path = null;
        if(image){
            new_path = '/assets/course_content/' + image.name;
            file_path = './public' + new_path
            image.mv(file_path);
        }
        const courseContent = await prisma.courseContent.create({
            data : {
                course : {
                    connect: {id : parseInt(course_id)}
                },
                contentCategory : {
                    connect : {id : parseInt(content_category_id)}
                },
                contentTitle : content_title,
                content : content,
                Image : new_path
            }
        });
        logger.info('create course content');
        return response.status(HTTP_OK).send(success(courseContent, 'course content created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create course content : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const courseContent = await prisma.courseContent.findUnique({
            where : {
                id : id
            }
        });
        return response.status(HTTP_OK).send(success(courseContent, 'course content fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course content fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}
const update = async (request,response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()){
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        const id = parseInt(request.params.id) || 0;
        let {course_id,content_category_id,content_title,content} = request.body;
        let image = request.files.Image;
        let file_path = null;
        let new_path = null;
        if(image){
            new_path = '/assets/course_content/' + image.name;
            file_path = './public' + new_path
            image.mv(file_path);
        }
        const courseContent = await prisma.courseContent.update({
            where : {
              id : id
            },
            data : {
                course : {
                    connect: {id : course_id}
                },
                contentCategory : {
                    connect : {id : content_category_id}
                },
                contentTitle : content_title,
                content : content,
                Image : new_path
            }
        });
        logger.info('update course content');
        return response.status(HTTP_OK).send(success(courseContent, 'course content update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update course content: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const destroy = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const courseContent = await prisma.courseContent.findUnique({
            where : {
                id : id
            }
        });
        if (courseContent){
            const courseContent = await prisma.courseContent.delete({
                where : {
                    id : id
                }
            })
        }
        return response.status(HTTP_OK).send(success([], 'course content deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course content deleting : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {index,store,show,update,destroy}