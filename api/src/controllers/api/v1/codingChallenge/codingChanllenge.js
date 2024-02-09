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
import path from "path";
import appRoot from "app-root-path";
import moment from "moment/moment";
import FileApi from "../../../../services/onlineJudge/FileApi";

const fs = require('fs');

const store = async (request, response) => {
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
        } = request.body;

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
            }
        });
        logger.info('create coding challenge');
        return response.status(HTTP_OK).send(success(codingChallenge, 'course coding challenge successfully', HTTP_CREATED));
    } catch (exception) {
        logger.error(`create course question : ${exception.message} `);
        return response.status(HTTP_INTERNAL_SERVER_ERROR).send(error(exception.message));
    }
}

export {
    store
}