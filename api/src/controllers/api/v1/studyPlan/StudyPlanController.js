import prisma from "../../../../services/prisma/prisma";
import {error, success} from "../../../../helpers/apiResponse";
import {
    HTTP_CREATED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_OK,
    HTTP_VALIDATION_ERROR
} from "../../../../constants/statusCode";
import logger from "../../../../services/logger/loggerService";
import {validationResult} from "express-validator";

const store = async (request, response) => {
    try {
        let {start_date, end_date, title, status, email,color} = request.body;
        const user = await prisma.user.findUnique({
            where: {
                'email': email
            }
        });
        const studyPlan = await prisma.studyPlan.create({
            data: {
                userId: user.id,
                startDate: start_date,
                endDate: end_date != null ? end_date : '',
                title: title,
                status: Boolean(status),
                color: color != null ? color : ''
            }
        });
        logger.info('create study plan');
        return response.status(HTTP_OK).send(success(studyPlan, 'Study Plan created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create study plan : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const fetchStudyPlan = async (request, response) => {
    try {
        const email = request.params.email;
        const user = await prisma.user.findUnique({
            where: {
                'email': email
            }
        });
        let studyPlan = await prisma.studyPlan.findMany({
            where: {
                userId: user.id
            }
        })
        const formatData = studyPlan.map(function (data) {
            return {
                'id': data.id,
                'start': new Date(data.startDate).toISOString(),
                'end': data.endDate ? new Date(data.endDate).toISOString() : data.endDate,
                'title': data.title,
                'color' : data.color
            }
        })
        logger.info(JSON.stringify(formatData))
        return response.status(HTTP_OK).send(success(formatData, 'fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`user fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const update = async (request,response) => {
    try {
        const id = request.params.id;
        let {start_date, end_date} = request.body;
        const studyPlan = await prisma.studyPlan.update({
            where:{
                id : parseInt(id)
            },
            data:{
                startDate: start_date,
                endDate: end_date != null ? end_date : undefined
            }
        })
        logger.info('update study plan');
        return response.status(HTTP_OK).send(success(studyPlan, 'Study Plan created successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`Update Successfully : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {store, fetchStudyPlan,update}