import {body, param} from "express-validator";

const participatorProgressRequestValidate = () => {
    return [
        body('quiz_id', 'Quiz Is Required'),
        body('user_id', 'User Is Required'),
        body('question_id', 'Question Is Required'),
        body('is_correct', 'Correct Is Required')
    ];
}

export default participatorProgressRequestValidate;