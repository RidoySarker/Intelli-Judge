import prisma from "../../../../services/prisma/prisma";
import {error, success} from "../../../../helpers/apiResponse";
import {
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_OK
} from "../../../../constants/statusCode";
import logger from "../../../../services/logger/loggerService";

const contentDetails = async (request,response) => {
    try {
        const id = request.params.id;
        const contentDetails = await prisma.courseContent.findMany({
            where :{
                contentCategoryId:parseInt(id)
            },
            include:{
                course:true,
                contentCategory:true
            }
        });
        return response.status(HTTP_OK).send(success(contentDetails, 'course content fetched successfully', HTTP_OK));
    } catch (exception) {
        logger.error(`course content details : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {contentDetails}