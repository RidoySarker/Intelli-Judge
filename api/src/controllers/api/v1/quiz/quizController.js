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
        const quiz = await prisma.quiz.findMany({
            skip: offset,
            take: limit
        });
        return response.status(HTTP_OK).send(success(quiz,
            'quiz fetched successfully',
            HTTP_OK,
            getResponseMeta(request)
        ))
    } catch (exception) {
        logger.error(`quiz course fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const store = async (request,response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()){
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {quiz_title,marks} = request.body;
        const quiz = await prisma.quiz.create({
            data : {
                QuizTitle : quiz_title,
                marks : marks
            }
        });
        logger.info('create quiz');
        return response.status(HTTP_OK).send(success(quiz, 'quiz created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create quiz course : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const quiz = await prisma.quiz.findUnique({
            where : {
                id : id
            }
        });
        return response.status(HTTP_OK).send(success(quiz, 'quiz fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`quiz fetching : ${exception.message} `);
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
        let {quiz_title,marks} = request.body;
        const quiz = await prisma.quiz.update({
            where : {
                id : id
            },
            data : {
                QuizTitle : quiz_title,
                marks : marks
            }
        });
        logger.info('update quiz');
        return response.status(HTTP_OK).send(success(quiz, 'quiz update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update quiz: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const destroy = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const quiz = await prisma.quiz.findUnique({
            where : {
                id : id
            }
        });
        if (quiz){
            const quiz = await prisma.quiz.delete({
                where : {
                    id : id
                }
            })
        }
        return response.status(HTTP_OK).send(success([], 'quiz deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`quiz deleting : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {index,store,show,update,destroy}