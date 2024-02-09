import {body} from "express-validator";

const courseQuestionValidate = () => {
    return [
        body('course_id', 'course is required'),
            body('content_category_id', 'content category is required'),
            body('question','question is required'),
            body('choice_one','choice one is required'),
            body('choice_two','choice two is required'),
            body('choice_three','choice three is required'),
            body('choice_four','choice four is required'),
            body('correct_choice','correct choice is required')
    ];
}

export default courseQuestionValidate;