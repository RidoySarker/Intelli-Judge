import {body} from "express-validator";

const codingChallengeValidate = () => {
    return [
        body('title', 'Title is required'),
        body('question_type', 'Question Type is required'),
        body('level', 'Level is required'),
        body('problem_statement', 'Problem Statement  is required'),
        body('testcase', 'Testcase is required'),
        body('solution', 'Solution is required'),
        body('solution_tester', 'Solution Tester four is required'),
        body('template', 'Template is required')
    ];
}

export default codingChallengeValidate;