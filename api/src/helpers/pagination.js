import {DEFAULT_PAGINATION_LIMIT} from "../constants/global";
import morgan from "morgan";

const getLimitOffset = (request) => {

    const offSet = parseInt(request.query.offset) || 0;
    const limit = parseInt(request.query.limit) || DEFAULT_PAGINATION_LIMIT;
    return {
        offSet,
        limit
    }
}

const getResponseMeta = (request) => {

    const offSet = parseInt(request.query.offset) || 0;
    const limit = parseInt(request.query.limit) || DEFAULT_PAGINATION_LIMIT;
    return {
        offSet,
        limit
    }
}

export {
    getLimitOffset,
    getResponseMeta,
}