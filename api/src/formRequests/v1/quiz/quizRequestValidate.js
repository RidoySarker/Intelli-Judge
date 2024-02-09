import {body} from "express-validator";
import prisma from "../../../services/prisma/prisma";

const quizRequestValidate = () => {
    return [
        body('quiz_title', 'Title Is Required').exists()
            .isString()
            .custom((value) => {
                if (value) {
                    return prisma.quiz.findFirst({where: {QuizTitle: value}})
                        .then((quiz) => {
                            if (quiz) {
                                return Promise.reject('Title is Taken');
                            }
                        });
                }
            }),
        body('marks', 'Marks Is Required')
    ];
};

export default quizRequestValidate;