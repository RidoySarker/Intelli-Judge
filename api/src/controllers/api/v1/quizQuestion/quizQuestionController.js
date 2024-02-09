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
        const quizQuestion = await prisma.quizQuestion.findMany({
            skip: offset,
            take: limit,
            include: {
                quiz: true,
                courseQuestion: true
            }
        });
        return response.status(HTTP_OK).send(success(quizQuestion,
            'quiz question fetched successfully',
            HTTP_OK,
            getResponseMeta(request)
        ))
    } catch (exception) {
        logger.error(`quiz question fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const store = async (request,response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()){
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {quiz_id,question_id} = request.body;
        const quizQuestion = await prisma.quizQuestion.create({
            data : {
                quiz : {
                    connect : {id : parseInt(quiz_id)}
                },
                courseQuestion : {
                    connect : {id : parseInt(question_id)}
                }
            }
        });
        logger.info('create quiz question');
        return response.status(HTTP_OK).send(success(quizQuestion, 'quiz question created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create quiz question : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const quizQuestion = await prisma.quizQuestion.findUnique({
            where : {
                id : id
            }
        });
        return response.status(HTTP_OK).send(success(quizQuestion, 'quiz question fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`quiz question fetching : ${exception.message} `);
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
        let {quiz_id,question_id} = request.body;
        const quizQuestion = await prisma.quizQuestion.update({
            where : {
                id : id
            },
            data : {
                quiz : {
                    connect : {id : quiz_id}
                },
                courseQuestion : {
                    connect : {id : question_id}
                }
            }
        });
        logger.info('update quiz question');
        return response.status(HTTP_OK).send(success(quizQuestion, 'quiz question update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update quiz question: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const destroy = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const quizQuestion = await prisma.quiz.findUnique({
            where : {
                id : id
            }
        });
        if (quizQuestion){
            const quiz = await prisma.quizQuestion.delete({
                where : {
                    id : id
                }
            })
        }
        return response.status(HTTP_OK).send(success([], 'quiz question deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`quiz question deleting : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {index,store,show,update,destroy}