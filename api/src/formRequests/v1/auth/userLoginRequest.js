import {body} from "express-validator";

const userLoginRequest = () => {
    return [
        body('email', 'Email Is Required').exists().isEmail().normalizeEmail(),
        body('password', 'Password Is Required').exists()
    ];
}

export default userLoginRequest;