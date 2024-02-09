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
        const courseQuestion = await prisma.courseQuestion.findMany({
            skip: offset,
            take: limit,
            include: {
                course: true,
                contentCategory: true
            }
        });
        return response.status(HTTP_OK).send(success(courseQuestion,
            'course question fetched successfully',
            HTTP_OK,
            getResponseMeta(request)
        ))
    } catch (exception) {
        logger.error(`course question fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const store = async (request,response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()){
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {
            course_id,
            content_category_id,
            question,
            choice_one,
            choice_two,
            choice_three,
            choice_four,
            correct_choice,
            is_multi
        } = request.body;
        const courseQuestion = await prisma.courseQuestion.create({
            data : {
                course : {
                    connect : {id : parseInt(course_id)}
                },
                contentCategory : {
                    connect : {id : parseInt(content_category_id)}
                },
                question : question,
                choiceOne : choice_one,
                choiceTwo : choice_two,
                choiceThree : choice_three,
                choiceFour : choice_four,
                correntChoice : correct_choice,
                isMulti : is_multi
            }
        });
        logger.info('create course question');
        return response.status(HTTP_OK).send(success(courseQuestion, 'course content question successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create course question : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const  courseQuestion = await prisma.courseQuestion.findUnique({
            where : {
                id : id
            }
        });
        return response.status(HTTP_OK).send(success(courseQuestion, 'course question created successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course question fetching : ${exception.message} `);
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
        let {
            course_id,
            content_category_id,
            question,
            choice_one,
            choice_two,
            choice_three,
            choice_four,
            correct_choice
        } = request.body;
        const courseQuestion = await prisma.courseQuestion.update({
            where : {
                id : id
            },
            data : {
                course : {
                    connect : {id : course_id}
                },
                contentCategory : {
                    connect : {id : content_category_id}
                },
                question : question,
                choiceOne : choice_one,
                choiceTwo : choice_two,
                choiceThree : choice_three,
                choiceFour : choice_four,
                correntChoice : correct_choice
            }
        });
        logger.info('update course question');
        return response.status(HTTP_OK).send(success(courseQuestion, 'course question update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update course question: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const destroy = async (request,response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const  courseQuestion = await prisma.courseQuestion.findUnique({
            where : {
                id : id
            }
        });
        if (courseQuestion) {
            const courseQuestion = await prisma.courseQuestion.delete({
                where : {
                    id : id
                }
            })
        }
        return response.status(HTTP_OK).send(success([], 'course question deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course question deleting : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}
export {index,store,show,update,destroy}