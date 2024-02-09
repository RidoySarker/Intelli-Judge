import {getLimitOffset, getResponseMeta} from "../../../../helpers/pagination";
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

const index = async (request, response) => {
    try {
        const {offset, limit} = getLimitOffset(request);
        const courseProgress = await prisma.courseProgress.findMany({
            skip: offset,
            take: limit
        });
        return response.status(HTTP_OK).send(success(courseProgress,
            'course progress fetched successfully',
            HTTP_OK,
            getResponseMeta(request)
        ))
    } catch (exception) {
        logger.error(`course progress fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const store = async (request, response) => {
    try {
        // const errors = validationResult(request);
        // if (!errors.isEmpty()){
        //     return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        // }
        let {course_id, course_content_id} = request.body;
        const subscribedCourse = await prisma.subscribedCourse.findFirst({
            where: {
                'courseId': course_id
            }
        })
        const existCourseProgress = await prisma.courseProgress.findFirst({
            where: {
                'subscribedCourseId': subscribedCourse.id,
                'courseContentId': course_content_id
            }
        });
        if (existCourseProgress) {
            const deleteExistCourse = await prisma.courseProgress.delete({
                where: {
                    'id': existCourseProgress.id
                }
            });
            return response.status(HTTP_CREATED).send(success(deleteExistCourse, 'course progress update successfully', HTTP_CREATED));
        }
        const courseProgress = await prisma.courseProgress.create({
            data: {
                subscribedCourse: {
                    connect: {id: subscribedCourse.id}
                },
                courseContent: {
                    connect: {id: course_content_id}
                },
            }
        });
        return response.status(HTTP_OK).send(success(courseProgress, 'course progress created successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`create course progress : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const show = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const courseProgress = await prisma.courseProgress.findUnique({
            where: {
                id: id
            }
        });
        return response.status(HTTP_OK).send(success(courseProgress, 'course progress fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course progress fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const update = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        const id = parseInt(request.params.id) || 0;
        let {subscribed_course_id, course_content_id} = request.body;
        const courseProgress = await prisma.courseProgress.update({
            where: {
                id: id
            },
            data: {
                subscribedCourse: {
                    connect: {id: subscribed_course_id}
                },
                courseContent: {
                    connect: {id: course_content_id}
                },
            }
        });
        logger.info('update course progress');
        return response.status(HTTP_OK).send(success(courseProgress, 'course progress update successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`update course progress: ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const destroy = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const courseProgress = await prisma.courseProgress.findUnique({
            where: {
                id: id
            }
        });
        if (courseProgress) {
            const courseProgress = await prisma.courseProgress.delete({
                where: {
                    id: id
                }
            })
        }
        return response.status(HTTP_OK).send(success([], 'course progress deleted successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course progress deleting : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

const isContentComplete = async (request, response) => {
    try {
        const id = parseInt(request.params.id) || 0;
        const courseProgress = await prisma.courseProgress.findFirst({
            where: {
                courseContentId: id
            }
        });
        return response.status(HTTP_OK).send(success(courseProgress, 'fetch successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course progress fetching : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {index, store, show, update, destroy,isContentComplete}