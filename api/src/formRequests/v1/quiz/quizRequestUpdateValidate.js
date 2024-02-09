import {body, param} from "express-validator";
import prisma from "../../../services/prisma/prisma";

const quizRequestUpdateValidate = () => {
    return [
        body('quiz_title', 'Title Is Required').exists()
            .isString()
            .custom((value, {req}) => {
                if (value) {
                    return prisma.quiz.findFirst({
                        where: {
                            QuizTitle: value
                        }
                    }).then((quiz) => {
                        if (quiz && quiz.id !== parseInt(req.params.id) || 0) {
                            return Promise.reject('Title Already Taken');
                        }
                    })
                }
            }),
        body('marks', 'Marks Is Required')
    ];
}

export default quizRequestUpdateValidate;