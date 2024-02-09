import prisma from "../../../../services/prisma/prisma";
import {error, success} from "../../../../helpers/apiResponse";
import {
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_OK
} from "../../../../constants/statusCode";
import logger from "../../../../services/logger/loggerService";

const courseCategory = async (request, response) => {
    try {
        const courseCategories = await prisma.courseCategory.findMany();
        const formatData = courseCategories.map(function (category) {
            return {
                value : category.id,
                label : category.name
            }
        })
        return response.status(HTTP_OK).send(courseCategories,'Course Categories Fetch Successfully',HTTP_OK)
    } catch (exception) {
        logger.error(`course categories fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const courseInstructor = async (request,response) => {
    try {
        const courseInstructor = await prisma.instructor.findMany();

        return response.status(HTTP_OK).send(courseInstructor,'Course Instructor Fetch Successfully',HTTP_OK)
    } catch (exception) {
        logger.error(`course categories fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const course = async (request,response) => {
    try {
        const courses = await  prisma.course.findMany();
        return response.status(HTTP_OK).send(courses,'Course Fetch Successfully',HTTP_OK)
    } catch (exception) {
        logger.error(`course fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const courseContentCategory = async (request,response) => {
    try {
        const courseContentCategories = await prisma.courseContentCategory.findMany();
        return response.status(HTTP_OK).send(courseContentCategories, 'Course Content Category Fetch Successfully', HTTP_OK);
    } catch (exception) {
        logger.error(`course content category fetching : ${exception.message}`);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const courseQuestion = async (request,response) => {
    try {
        const courseQuestions = await prisma.courseQuestion.findMany();
        return response.status(HTTP_OK).send(courseQuestions, 'Course Question Fetch Successfully', HTTP_OK);
    } catch (exception) {
        logger.error(`course question fetching : ${exception.message}`);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const quiz = async (request,response) => {
    try {
        const quizs = await prisma.quiz.findMany();
        return response.status(HTTP_OK).send(quizs, 'Quiz Fetch Successfully', HTTP_OK);
    } catch (exception) {
        logger.error(`quiz fetching : ${exception.message}`);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {courseCategory,course,courseContentCategory,courseQuestion,quiz,courseInstructor}