import {body, param} from "express-validator";

const quizParticipatorRequestValidate = () => {
    return [
        body('quiz_id', 'Quiz Is Required'),
        body('user_id', 'User Is Required'),
        body('total_obtained_marks', 'Total Obtained Marks Required')
    ];
}

export default quizParticipatorRequestValidate;