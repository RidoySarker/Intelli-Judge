const path = require("path");
const FileApi = require("./FileApi");
const appRoot = require("app-root-path");
const PythonRunner = require('./PythonRunner')
const moment = require("moment");

function Factory() {
    this.createRunner = function createRunner(lang) {
        return new PythonRunner();
    };
}

module.exports = {
    run(question, lang, solution, callback, errorCallback) {
        const factory = new Factory();
        const runner = factory.createRunner(lang.toLowerCase());

        // copy all files in the question folder from solution folder
        const sourceDir = path.resolve(
            `${appRoot}`,
            "public/coding-problems",
            question
        );
        const targetDir = path.resolve(
            `${appRoot}`,
            "public/coding-problems",
            "temp",
            question + "_" + lang + "_" + moment().toISOString() // 2013-02-04T22:44:30.652Z
        );

        // copy source code files
        FileApi.copyDirectory(path.join(sourceDir, lang), targetDir, err => {
            if (err) {
                callback("99", String(err)); // 99, system error
            }

            const testcaseFile = path.join(targetDir, "testcase.txt");

            // copy test case file
            FileApi.copyFile(
                path.join(sourceDir, "python/testcase.txt"),
                testcaseFile,
                err => {
                    if (err) {
                        callback("99", String(err)); // 99, system error
                    }
                    // save the solution to Solution.java
                    const sourceFile = path.resolve(targetDir, runner.sourceFile());
                    const filename = path.parse(sourceFile).name;
                    const extension = path.parse(sourceFile).ext;
                    //console.log(`filename: ${filename}`);
                    //console.log(`extension: ${extension}`);
                    FileApi.saveFile(sourceFile, solution, () => {
                        const testFile = path.resolve(targetDir, runner.testFile());
                        const testFileName = path.parse(testFile).name; // main
                        runner.run(testFile, targetDir, testFileName, extension, function (
                            status,
                            message
                        ) {
                            if (status == "ok") {
                                // no error
                                console.log("message");
                                console.log(message);
                                if (message.startsWith("[Success]")) {
                                    callback("pass", message.slice(9), targetDir); // ok, pass
                                } else {
                                    callback("fail", message.slice(6), targetDir); // ok, fail
                                }
                            } else {
                                callback(status, message);
                            }
                        });
                    });
                }
            );
        });
    }
};