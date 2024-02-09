export const success = (data = [], message = '', code = 200, meta = {}) => {
    return {
        meta,
        data,
        message,
        code,
    };
};

export const error = (message = '', code = 500) => {
    return {
        message,
        code
    };
}