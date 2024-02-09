import {body} from "express-validator";


const loginRequestValidate = () => {
    return [
        body('email', 'Email Is Required').exists().isEmail().normalizeEmail(),
        body('password', 'Password Is Required').exists()
    ];
};

export default loginRequestValidate;