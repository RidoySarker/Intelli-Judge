import {body} from "express-validator";

const subscribedCourseRequestValidate = () => {
    return [
        body('user_id', 'user is required'),
        body('course_id', 'course is required'),
    ];
}

export default subscribedCourseRequestValidate;