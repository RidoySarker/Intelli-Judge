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
        const {offset, limit} = getLimitOffset(request);
        const participatorProgress = await prisma.participatorProgress.findMany({
            skip: offset,
            take: limit
        });
        return response.status(HTTP_OK).send(success(participatorProgress,
            'participator progress fetched successfully',
            HTTP_OK,
            getResponseMeta(request)
        ))
    } catch (exception) {
        logger.error(`participator progress fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const store = async (request,response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()){
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {quiz_id,user_id,question_id,is_correct} = request.body;
        const participatorProgress = await prisma.participatorProgress.create({
            data : {
                quiz : {
                    connect : {id : quiz_id}
                },
                user : {
                    connect : {id : user_id}
                },
                courseQuestion : {
                    connect : {id : question_id}
                },
                isCorrect : is_correct
            }
        });
        logger.info('create participator progress');
        return response.status(HTTP_OK).send(success(participatorProgress, 'participator progress created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create participator progress: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const participatorProgress = await prisma.participatorProgress.findUnique({
            where : {
                id : id
            }
        });
        return response.status(HTTP_OK).send(success(participatorProgress, 'participator progress fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`participator progress fetching : ${exception.message} `);
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
        let {quiz_id,user_id,question_id,is_correct} = request.body;
        const participatorProgress = await prisma.participatorProgress.update({
            where : {
                id : id
            },
            data : {
                quiz : {
                    connect : {id : quiz_id}
                },
                user : {
                    connect : {id : user_id}
                },
                courseQuestion : {
                    connect : {id : question_id}
                },
                isCorrect : is_correct
            }
        });
        logger.info('update participator progress');
        return response.status(HTTP_OK).send(success(participatorProgress, 'participator progress update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update participator progress: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const destroy = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const participatorProgress = await prisma.participatorProgress.findUnique({
            where : {
                id : id
            }
        });
        if (participatorProgress){
            const participatorProgress = await prisma.participatorProgress.delete({
                where : {
                    id : id
                }
            })
        }
        return response.status(HTTP_OK).send(success([], 'participator progress deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`participator progress deleting : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {index,store,show,update,destroy}