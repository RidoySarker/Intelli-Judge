import {useFormik} from "formik";
import * as Yup from "yup";
import http from "../../../../interceptors/http";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AceEditor from "react-ace";

import "../../../../../node_modules/ace-builds/src-min-noconflict/theme-monokai"
import "../../../../../node_modules/ace-builds/src-min-noconflict/theme-twilight"
import "../../../../../node_modules/ace-builds/src-min-noconflict/theme-github"
import "../../../../../node_modules/ace-builds/src-min-noconflict/mode-python"
import "../../../../../node_modules/ace-builds/src-noconflict/ext-language_tools";
import "../../../../fontawesome-free-6.2.1-web/css/fontawesome.css"
import "../../../../fontawesome-free-6.2.1-web/css/brands.css"
import "../../../../fontawesome-free-6.2.1-web/css/solid.css"

const ace = require("ace-builds/src-noconflict/ace");
ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/"
);
ace.config.setModuleUrl(
    "ace/mode/javascript_worker",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js"
);
const CodingChallengeAdd = () => {

    const questionLevels = [
        {
            id: 'beginner',
            name: "Beginner"
        },
        {
            id: 'intermediate',
            name: "Intermediate"
        },
        {
            id: 'expert',
            name: "Expert"
        }
    ];

    const questionTypes = [
        {
            id: 'number',
            name: "Number"
        },
        {
            id: 'string',
            name: "String"
        },
        {
            id: 'array',
            name: "Array"
        },
        {
            id: 'linked-list',
            name: "Linked List"
        },
        {
            id: 'stack',
            name: "Stack"
        },
        {
            id: 'queue',
            name: "Queue"
        },
        {
            id: 'tree',
            name: "Tree"
        },
        {
            id: 'hashmap',
            name: "Hashmap"
        },
        {
            id: 'graph',
            name: "Graph"
        }
    ];


    const codingChallengeForm = useFormik({
        initialValues: {
            title: '',
            question_type: '',
            level: '',
            problem_statement: '',
            testcase: '',
            solution: '',
            solution_tester: '',
            template: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title Is Required'),
            question_type: Yup.string().required('Question Type Is Required'),
            level: Yup.string().required('Level Is Required'),
            problem_statement: Yup.string().required('Statement Is Required'),
            testcase: Yup.mixed().required('Testcase Is Required'),
            solution: Yup.mixed().required('Solution Is Required'),
            solution_tester: Yup.mixed().required('Solution Tester Is Required'),
            template: Yup.mixed().required('Template Is Required'),
        }),
        onSubmit: (values, {resetForm}) => {
            http.post(`/add-coding-challenge`, values).then(() => {
                toast.success("Coding Challenge Added Successfully");
                // console.log(CKEditor,'content')
                // CKEditor.instances['content'].setData('');
                resetForm({values: ''});
                window.location.reload();
            })
                .catch(({error}) => {
                    console.log(error)
                });
        },
    });

    useEffect(() => {

    }, []);


    return (
        <>
            <div className="row mt-5">
                <div className='col-lg-1'></div>
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Problem Statement</h4>
                        </div>
                        <div className="card-body">
                            <form className="row g-3 needs-validation" noValidate
                                  onSubmit={codingChallengeForm.handleSubmit}>

                                <div className="col-md-12">
                                    <label htmlFor="content_title" className="form-label">Title</label>
                                    <input type="text"
                                           className="form-control"
                                           id="title"
                                           name="title"
                                           onChange={codingChallengeForm.handleChange}
                                           onBlur={codingChallengeForm.handleBlur}
                                           value={codingChallengeForm.values.content_title}
                                    />
                                    <div className="text-danger">
                                        {
                                            codingChallengeForm.touched.title &&
                                            codingChallengeForm.errors.title &&
                                            (<div>{codingChallengeForm.errors.title}</div>)
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="content_title" className="form-label">Question Type</label>

                                    <select
                                        className="form-control"
                                        id="question_type"
                                        name="question_type"
                                        onChange={codingChallengeForm.handleChange}
                                        onBlur={codingChallengeForm.handleBlur}
                                        value={codingChallengeForm.values.course_id}
                                    >
                                        <option value="">Select</option>
                                        {questionTypes.map(({id, name}, index) => <option value={id}
                                                                                          key={index}>{name}</option>)}
                                    </select>

                                    <div className="text-danger">
                                        {
                                            codingChallengeForm.touched.question_type &&
                                            codingChallengeForm.errors.question_type &&
                                            (<div>{codingChallengeForm.errors.question_type}</div>)
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="content_title" className="form-label">Question Level</label>
                                    <select
                                        className="form-control"
                                        id="level"
                                        name="level"
                                        onChange={codingChallengeForm.handleChange}
                                        onBlur={codingChallengeForm.handleBlur}
                                        value={codingChallengeForm.values.course_id}
                                    >
                                        <option value="">Select</option>
                                        {questionLevels.map(({id, name}, index) => <option value={id}
                                                                                           key={index}>{name}</option>)}
                                    </select>

                                    <div className="text-danger">
                                        {
                                            codingChallengeForm.touched.level &&
                                            codingChallengeForm.errors.level &&
                                            (<div>{codingChallengeForm.errors.level}</div>)
                                        }
                                    </div>
                                </div>


                                <div className="col-md-12">
                                    <label htmlFor="content" className="form-label">Problem Statement</label>
                                    <CKEditor
                                        className="form-control"
                                        editor={ClassicEditor}
                                        name="problem_statement"
                                        data={''}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            codingChallengeForm.setFieldValue('problem_statement', data)
                                        }}

                                    />

                                    <div className="text-danger">
                                        {
                                            codingChallengeForm.touched.problem_statement &&
                                            codingChallengeForm.errors.problem_statement &&
                                            (<div>{codingChallengeForm.errors.problem_statement}</div>)
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="content" className="form-label">Testcase</label>
                                    <textarea
                                        className="form-control"
                                        id="testcase"
                                        name="testcase"
                                        rows={20}
                                        onChange={codingChallengeForm.handleChange}
                                        onBlur={codingChallengeForm.handleBlur}
                                        value={codingChallengeForm.values.testcase}
                                    ></textarea>
                                    {/*<CKEditor*/}
                                    {/*    className="form-control"*/}
                                    {/*    editor={ClassicEditor}*/}
                                    {/*    name="testcase"*/}
                                    {/*    data={''}*/}
                                    {/*    onChange={(event, editor) => {*/}
                                    {/*        const data = editor.getData();*/}
                                    {/*        codingChallengeForm.setFieldValue('testcase', data)*/}
                                    {/*    }}*/}

                                    {/*/>*/}

                                    <div className="text-danger">
                                        {
                                            codingChallengeForm.touched.testcase &&
                                            codingChallengeForm.errors.testcase &&
                                            (<div>{codingChallengeForm.errors.testcase}</div>)
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="content" className="form-label">Solution</label>
                                    {AceEditor && (
                                        <AceEditor
                                            placeholder={"Enter your code here"}
                                            mode={"python"}
                                            height={500}
                                            width='95%'
                                            theme="github"
                                            name="blah2"
                                            onChange={event => {
                                                codingChallengeForm.setFieldValue('solution', event)
                                            }}
                                            fontSize={20}
                                            showPrintMargin={true}
                                            showGutter={true}
                                            highlightActiveLine={true}
                                            value={codingChallengeForm.values.solution}
                                            setOptions={{
                                                enableBasicAutocompletion: true,
                                                enableLiveAutocompletion: true,
                                                enableSnippets: true,
                                                showLineNumbers: true,
                                                tabSize: 4,
                                            }}></AceEditor>
                                    )}

                                    <div className="text-danger">
                                        {
                                            codingChallengeForm.touched.solution &&
                                            codingChallengeForm.errors.solution &&
                                            (<div>{codingChallengeForm.errors.solution}</div>)
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="content" className="form-label">Solution Tester</label>
                                    {AceEditor && (
                                        <AceEditor
                                            placeholder={"Enter your code here"}
                                            mode={"python"}
                                            height={500}
                                            width='95%'
                                            theme="github"
                                            name="blah2"
                                            onChange={event => {
                                                codingChallengeForm.setFieldValue('solution_tester', event)
                                            }}
                                            fontSize={20}
                                            showPrintMargin={true}
                                            showGutter={true}
                                            highlightActiveLine={true}
                                            value={codingChallengeForm.values.solution_tester}
                                            setOptions={{
                                                enableBasicAutocompletion: true,
                                                enableLiveAutocompletion: true,
                                                enableSnippets: true,
                                                showLineNumbers: true,
                                                tabSize: 4,
                                            }}></AceEditor>
                                    )}

                                    <div className="text-danger">
                                        {
                                            codingChallengeForm.touched.solution_tester &&
                                            codingChallengeForm.errors.solution_tester &&
                                            (<div>{codingChallengeForm.errors.solution_tester}</div>)
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="content" className="form-label">Template</label>
                                    {AceEditor && (
                                        <AceEditor
                                            placeholder={"Enter your code here"}
                                            mode={"python"}
                                            height={500}
                                            width='95%'
                                            theme="github"
                                            name="blah2"
                                            onChange={event => {
                                                codingChallengeForm.setFieldValue('template', event)
                                            }}
                                            fontSize={20}
                                            showPrintMargin={true}
                                            showGutter={true}
                                            highlightActiveLine={true}
                                            value={codingChallengeForm.values.template}
                                            setOptions={{
                                                enableBasicAutocompletion: true,
                                                enableLiveAutocompletion: true,
                                                enableSnippets: true,
                                                showLineNumbers: true,
                                                tabSize: 4,
                                            }}></AceEditor>
                                    )}

                                    <div className="text-danger">
                                        {
                                            codingChallengeForm.touched.template &&
                                            codingChallengeForm.errors.template &&
                                            (<div>{codingChallengeForm.errors.template}</div>)
                                        }
                                    </div>
                                </div>


                                <div className="col-12">
                                    <button className="btn btn-primary" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CodingChallengeAdd;