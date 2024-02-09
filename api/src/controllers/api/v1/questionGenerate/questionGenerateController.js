import prisma from "../../../../services/prisma/prisma";
import {error, success} from "../../../../helpers/apiResponse";
import {
    HTTP_CREATED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_OK
} from "../../../../constants/statusCode";
import logger from "../../../../services/logger/loggerService";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";

const generateQuestion = async (request, response) => {
    try {
        let data = [];
        const courses = request.body;
        const courseQuestion = await prisma.courseQuestion.findMany({
            take: 20,
            where: {
                courseId: {
                    in: courses.map(course => course.course_id)
                }
            }
        });
        let title = Object.values(courses).map(course => course.name).join("-");
        let quiz = await prisma.quiz.create({
            data: {
                QuizTitle: title,
                marks: 100
            }
        });

        courseQuestion.forEach((question) => {
            data.push({
                quizId: quiz.id,
                questionsId: question.id
            })
        });

        let quizQuestion = await prisma.quizQuestion.createMany({
            data: [...data],
            skipDuplicates: true
        })

        return response.status(HTTP_OK).send(success(quiz, 'Generate course question Successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create course : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {generateQuestion}