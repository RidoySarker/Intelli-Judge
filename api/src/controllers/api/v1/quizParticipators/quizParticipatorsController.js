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
        const quizParticipator = await prisma.quizParticipator.findMany({
            skip: offset,
            take: limit
        });
        return response.status(HTTP_OK).send(success(quizParticipator,
            'quiz participator fetched successfully',
            HTTP_OK,
            getResponseMeta(request)
        ))
    } catch (exception) {
        logger.error(`quiz participator fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const store = async (request,response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()){
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {quiz_id,user_id,total_obtained_marks} = request.body;
        const quizParticipator = await prisma.quizParticipator.create({
            data : {
                quiz : {
                    connect : {id : quiz_id}
                },
                user : {
                    connect : {id : user_id}
                },
                totalObtainedMarks : total_obtained_marks
            }
        });
        logger.info('create quiz participator');
        return response.status(HTTP_OK).send(success(quizParticipator, 'quiz participator created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create quiz participator : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const quizParticipator = await prisma.quizParticipator.findUnique({
            where : {
                id : id
            }
        });
        return response.status(HTTP_OK).send(success(quizParticipator, 'quiz participator fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`quiz participator fetching : ${exception.message} `);
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
        let {quiz_id,user_id,total_obtained_marks} = request.body;
        const quizParticipator = await prisma.quizParticipator.update({
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
                totalObtainedMarks : total_obtained_marks
            }
        });
        logger.info('update quiz participator');
        return response.status(HTTP_OK).send(success(quizParticipator, 'quiz participator update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update quiz participator: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const destroy = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const quizParticipator = await prisma.quizParticipator.findUnique({
            where : {
                id : id
            }
        });
        if (quizParticipator){
            const quizParticipator = await prisma.quizParticipator.delete({
                where : {
                    id : id
                }
            })
        }
        return response.status(HTTP_OK).send(success([], 'quiz participator deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`quiz participator deleting : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {index,store,show,update,destroy}