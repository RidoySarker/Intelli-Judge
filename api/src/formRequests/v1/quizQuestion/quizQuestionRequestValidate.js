import {body, param} from "express-validator";

const quizQuestionRequestValidate = () => {
    return [
        body('quiz_id', 'Quiz Is Required'),
        body('question_id', 'Question Is Required')
    ];
}

export default quizQuestionRequestValidate;