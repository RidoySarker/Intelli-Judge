import { getLimitOffset, getResponseMeta } from "../../../../helpers/pagination";
import prisma from "../../../../services/prisma/prisma";
import { error, success } from "../../../../helpers/apiResponse";
import {
    HTTP_CREATED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_OK,
    HTTP_VALIDATION_ERROR
} from "../../../../constants/statusCode";
import logger from "../../../../services/logger/loggerService";
import { validationResult } from "express-validator";
import moment from "moment";

const index = async (request, response) => {
    try {
        const {offset, limit} = getLimitOffset(request);

        const contest = await prisma.contest.findMany({
            skip: offset,
            take: limit,
        });

        return response.status(HTTP_OK).send(success(contest,
            'contest fetched successfully',
            HTTP_OK,
            getResponseMeta(request)
        ));
    } catch (exception) {
        logger.error(`contest fetching : ${exception.message} `);

        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const store = async (request, response) => {
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }

        let {
            title,
            slug,
            access_code,
            start_time,
            end_time,
            status,
            problems,
        } = request.body;
        console.log(problems, request.body);

        const contest = await prisma.contest.create({
            data: {
                title: title,
                slug: slug,
                accessCode: access_code,
                startTime: new Date(start_time),
                endTime: new Date(end_time),
                status: Number(status),
                problems: problems,
            }
        });

        return response.status(HTTP_OK).send(success(contest, 'contest created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create contest : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;

        const contest = await prisma.contest.findUnique({
            where: {
                id: id
            }
        });

        return response.status(HTTP_OK).send(success(contest, 'contest fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`contests fetching : ${exception.message} `);

        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const update = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }

        // return response.status(HTTP_OK).send(success(course, 'course update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update contest: ${exception.message} `);

        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const destroy = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const contest = await prisma.contest.findUnique({
            where: {
                id: id
            }
        });

        if (contest) {
            const contest = await prisma.contest.delete({
                where: {
                    id: id
                }
            });
        }

        return response.status(HTTP_OK).send(success([], 'contest deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`contest deleting : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {index, store, show, update, destroy};