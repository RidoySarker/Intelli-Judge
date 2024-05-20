import { error, success } from "../../../../helpers/apiResponse";
import {
    HTTP_CREATED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_OK,
    HTTP_VALIDATION_ERROR
} from "../../../../constants/statusCode";
import logger from "../../../../services/logger/loggerService";
import RunnerManager from "../../../../services/onlineJudge/RunnerManager"
import moment from "moment";
import * as fs from "fs";
import { sleep } from "../../../../services/onlineJudge/Sleeper";
import prisma from "../../../../services/prisma/prisma";
import { validationResult } from "express-validator";
import path from "path";
import appRoot from "app-root-path";
import FileApi from "../../../../services/onlineJudge/FileApi";

const userCodeUpload = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(HTTP_VALIDATION_ERROR).json({errors: errors.array()})
        }
        let {
            title,
            question_type,
            level,
            problem_statement,
            testcase,
            solution,
            solution_tester,
            template,
            email,
        } = request.body;

        const user = await prisma.user.findUnique({
            where: {
                'email': email
            }
        });

        const slug = title.toLowerCase().replaceAll(' ', '-');
        const targetDir = path.resolve(
            `${appRoot}`,
            "public/coding-problems",
            slug,
            "python"
        );
        const solutionSourceFile = path.resolve(targetDir, "Solution.py");
        const solutionTesterSourceFile = path.resolve(targetDir, "SolutionTester.py");
        const testCase4SourceFile = path.resolve(targetDir, "testcase.txt");
        FileApi.saveFile(solutionSourceFile, solution, () => {

        });
        FileApi.saveFile(solutionTesterSourceFile, solution_tester, () => {

        });
        FileApi.saveFile(testCase4SourceFile, testcase, () => {

        });
        const codingChallenge = await prisma.codingChallenge.create({
            data: {
                title: title,
                slug: slug,
                question_type: question_type,
                level: level,
                problem_statement: problem_statement,
                testcase: testcase,
                solution: solution,
                solution_tester: solution_tester,
                template: template,
                userId: user?.id,
                is_approved: 0,
            }
        });
        logger.info('create coding challenge');
        return response.status(HTTP_OK).send(success(codingChallenge, 'user code upload successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`user code question : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export { userCodeUpload };