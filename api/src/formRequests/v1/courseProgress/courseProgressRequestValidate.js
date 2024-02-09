import {body} from "express-validator";

const courseProgressRequestValidate = () => {
    return [
        body('subscribed_course_id', 'subscribed course is required'),
        body('course_content_id', 'course content is required'),
    ];
}

export default courseProgressRequestValidate;