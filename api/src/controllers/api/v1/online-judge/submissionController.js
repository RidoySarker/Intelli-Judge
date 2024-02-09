import {error} from "../../../../helpers/apiResponse";
import {HTTP_INTERNAL_SERVER_ERROR} from "../../../../constants/statusCode";
import logger from "../../../../services/logger/loggerService";
import RunnerManager from "../../../../services/onlineJudge/RunnerManager"
import moment from "moment";
import * as fs from "fs";
import {sleep} from "../../../../services/onlineJudge/Sleeper";
import prisma from "../../../../services/prisma/prisma";

const submission = async (request, response) => {
    try {

        let start = moment(new Date(Date.now()));
        const {question_id, user_email, slug, solution} = request.body;
        const user = await prisma.user.findFirst({
            where: {email: user_email},
        });

        RunnerManager.run(
            slug,
            "python",
            solution,
            async function (status, message, targetDir) {
                const result = {
                    status,
                    message,
                    targetDir
                };


                if (status == "pass" || status == "fail") {
                    let end = moment(new Date(Date.now()));

                    let ms = moment(end, "DD/MM/YYYY HH:mm:ss").diff(
                        moment(start, "DD/MM/YYYY HH:mm:ss")
                    );
                    console.log(ms)
                    const submission = await prisma.submission.create({
                        data: {
                            question: {
                                connect: {id: parseInt(question_id)}
                            },
                            user: {
                                connect: {id: parseInt(user?.id)}
                            },
                            status: status,
                            language: "python",
                            run_time : String(ms)
                        }
                    });
                    console.log({
                        targetDir,
                        submission
                    })
                    fs.rm(targetDir, {recursive: true}, () => {
                        console.log("Folder Removed")
                    });
                    return response.status(200).json(result);
                } else {
                    return response.status(200).json(result);
                }
            }
        );
    } catch (exception) {
        logger.error(`submission : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {submission};