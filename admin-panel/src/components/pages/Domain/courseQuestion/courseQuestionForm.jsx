import {useEffect, useState} from "react";
import Select from "react-select";
import {useFormik} from "formik";
import * as Yup from "yup";
import http from "../../../../interceptors/http";
import {toast} from "react-toastify";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CourseQuestionForm = (props) => {
    const [selectedOptions, setSelectedOptions] = useState();
    const [text, setText] = useState("");

    const courseQuestionForm = useFormik({

        initialValues: {
            course_id: '',
            content_category_id: '',
            question: '',
            choice_one: '',
            choice_two: '',
            choice_three: '',
            choice_four: '',
            correct_choice: '',
            is_multi: '',
        },
        validationSchema: Yup.object({
            course_id: Yup.string().required('Course Is Required'),
            content_category_id: Yup.string().required('Course Category Is Required'),
            question: Yup.string().required('Question Is Required'),
            choice_one: Yup.string().required('Choice One Is Required'),
            choice_two: Yup.string().required('Choice Two Is Required'),
            choice_three: Yup.string().required('Choice Three Is Required'),
            choice_four: Yup.string().required('Choice Four Is Required'),
            is_multi: Yup.string().required('Multiple Check Is Required'),
            // correct_choice: Yup.string().when("is_multi",{
            //
            // }),
        }),
        onSubmit: (values, {resetForm}) => {
            values.correct_choice = selectedOptions;
            console.log(values, 'values')
            http.post(`/course-question`, values)
                .then(() => {
                    toast.success("Course Question Added Successfully");
                    resetForm({values: ''});
                })
                .catch(({error}) => {
                    console.log(error)
                });
        },
    });

    const [courseContentCategories, setCourseContentCategories] = useState([]);
    const [courses, setCourses] = useState([]);

    const getCourseContentCategories = async () => {
        try {
            const {data: data} = await http.get(`/fetch-course-content-category`)
            setCourseContentCategories(data);
        } catch (error) {
            console.log(error)
        }
    }

    const getCourses = async () => {
        try {
            const {data: data} = await http.get(`/fetch-courses`)
            setCourses(data);
        } catch (error) {
            console.log(error)
        }
    }

    function handleSelect(data) {
        setSelectedOptions(data);
    }

    const correctList = [
        {value: "choice_one", label: "Choice One"},
        {value: "choice_two", label: "Choice Two"},
        {value: "choice_three", label: "Choice Three"},
        {value: "choice_four", label: "Choice Four"},
    ];

    useEffect(() => {
        getCourseContentCategories();
        getCourses();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Course Question</h4>
                </div>
                <div className="card-body">
                    <form className="row g-3 needs-validation" noValidate onSubmit={courseQuestionForm.handleSubmit}>
                        <div className="col-md-12">
                            <label htmlFor="course_id" className="form-label">Course</label>
                            <select
                                className="form-control"
                                id="course_id"
                                name="course_id"
                                onChange={courseQuestionForm.handleChange}
                                onBlur={courseQuestionForm.handleBlur}
                                value={courseQuestionForm.values.course_id}
                            >
                                <option value="">Select</option>
                                {courses.map(({id, name}, index) => <option value={id} key={index}>{name}</option>)}
                            </select>
                            <div className="text-danger">
                                {
                                    courseQuestionForm.touched.course_id &&
                                    courseQuestionForm.errors.course_id &&
                                    (<div>{courseQuestionForm.errors.course_id}</div>)
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="content_category_id" className="form-label">Course Category</label>
                            <select
                                className="form-control"
                                id="content_category_id"
                                name="content_category_id"
                                onChange={courseQuestionForm.handleChange}
                                onBlur={courseQuestionForm.handleBlur}
                                value={courseQuestionForm.values.content_category_id}
                            >
                                <option value="">Select</option>
                                {courseContentCategories.map(({id, contentCategoryTitle}, index) => <option value={id}
                                                                                                            key={index}>{contentCategoryTitle}</option>)}
                            </select>
                            <div className="text-danger">
                                {
                                    courseQuestionForm.touched.content_category_id &&
                                    courseQuestionForm.errors.content_category_id &&
                                    (<div>{courseQuestionForm.errors.content_category_id}</div>)
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="question" className="form-label">Question</label>
                            <CKEditor
                                editor={ClassicEditor}
                                id="short_description"
                                name="question"
                                data={''}
                                onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log("Editor is ready to use!", editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    courseQuestionForm.setFieldValue('question', data);
                                    setText(data);
                                }}
                            />
                            <div className="text-danger">
                                {
                                    courseQuestionForm.touched.question &&
                                    courseQuestionForm.errors.question &&
                                    (<div>{courseQuestionForm.errors.question}</div>)
                                }
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="content" className="form-label">Choice One</label>
                            <input type="text"
                                   className="form-control"
                                   id="choice_one"
                                   name="choice_one"
                                   onChange={courseQuestionForm.handleChange}
                                   onBlur={courseQuestionForm.handleBlur}
                                   value={courseQuestionForm.values.choice_one}
                            />
                            <div className="text-danger">
                                {
                                    courseQuestionForm.touched.choice_one &&
                                    courseQuestionForm.errors.choice_one &&
                                    (<div>{courseQuestionForm.errors.choice_one}</div>)
                                }
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="choice_two" className="form-label">Choice Two</label>
                            <input type="text"
                                   className="form-control"
                                   id="choice_two"
                                   name="choice_two"
                                   onChange={courseQuestionForm.handleChange}
                                   onBlur={courseQuestionForm.handleBlur}
                                   value={courseQuestionForm.values.choice_two}
                            />
                            <div className="text-danger">
                                {
                                    courseQuestionForm.touched.choice_two &&
                                    courseQuestionForm.errors.choice_two &&
                                    (<div>{courseQuestionForm.errors.choice_two}</div>)
                                }
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="choice_three" className="form-label">Choice Three</label>
                            <input type="text"
                                   className="form-control"
                                   id="choice_three"
                                   name="choice_three"
                                   onChange={courseQuestionForm.handleChange}
                                   onBlur={courseQuestionForm.handleBlur}
                                   value={courseQuestionForm.values.choice_three}
                            />
                            <div className="text-danger">
                                {
                                    courseQuestionForm.touched.choice_three &&
                                    courseQuestionForm.errors.choice_three &&
                                    (<div>{courseQuestionForm.errors.choice_three}</div>)
                                }
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="choice_four" className="form-label">Choice Four</label>
                            <input type="text"
                                   className="form-control"
                                   id="choice_four"
                                   name="choice_four"
                                   onChange={courseQuestionForm.handleChange}
                                   onBlur={courseQuestionForm.handleBlur}
                                   value={courseQuestionForm.values.choice_four}
                            />
                            <div className="text-danger">
                                {
                                    courseQuestionForm.touched.choice_four &&
                                    courseQuestionForm.errors.choice_four &&
                                    (<div>{courseQuestionForm.errors.choice_four}</div>)
                                }
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="is_multi" className="form-label">Is Multiple</label>
                            <select
                                className="form-control"
                                id="is_multi"
                                name="is_multi"
                                onChange={courseQuestionForm.handleChange}
                                onBlur={courseQuestionForm.handleBlur}
                                value={courseQuestionForm.values.is_multi}
                            >
                                <option value=''>Select</option>
                                <option value='0'>No</option>
                                <option value='1'>Yes</option>
                            </select>
                            <div className="text-danger">
                                {
                                    courseQuestionForm.touched.is_multi &&
                                    courseQuestionForm.errors.is_multi &&
                                    (<div>{courseQuestionForm.errors.is_multi}</div>)
                                }
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="correct_choice" className="form-label">Correct Choice</label>
                            {parseInt(courseQuestionForm.values.is_multi) === 1 ?
                                <Select
                                    className="form-control"
                                    id="correct_choice"
                                    name="correct_choice"
                                    options={correctList}
                                    placeholder="Select Choice"
                                    value={selectedOptions}
                                    onChange={handleSelect}
                                    isSearchable={true}
                                    // onChange={courseQuestionForm.handleChange}
                                    onBlur={courseQuestionForm.handleBlur}
                                    isMulti
                                /> :
                                <Select
                                    className="form-control"
                                    id="correct_choice"
                                    name="correct_choice"
                                    options={correctList}
                                    placeholder="Select Choice"
                                    value={selectedOptions}
                                    onChange={handleSelect}
                                    isSearchable={true}
                                    // onChange={courseQuestionForm.handleChange}
                                    onBlur={courseQuestionForm.handleBlur}
                                />
                            }
                            <div className="text-danger">
                                {
                                    courseQuestionForm.touched.correct_choice &&
                                    courseQuestionForm.errors.correct_choice &&
                                    (<div>{courseQuestionForm.errors.correct_choice}</div>)
                                }
                            </div>
                        </div>

                        <div className="col-12">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );

}

export default CourseQuestionForm;