import {useFormik} from "formik";
import * as Yup from "yup";
import http from "../../../../interceptors/http";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const CourseForm = (props) => {

    const [formValues, setFormValues] = useState([{title: ""}])
    const [text, setText] = useState("");
    const courseForm = useFormik({

        initialValues: {
            name: '',
            status: '',
            course_category_id: '',
            short_description: '',
            course_overview: '',
            Image: '',
            instructor_id: '',
            course_level: '',
        }, validationSchema: Yup.object({
            course_category_id: Yup.string().required('Course Category Is Required'),
            name: Yup.string().required('Name Is Required'),
            status: Yup.string().required('Status Is Required'),
            short_description: Yup.string().required('Short Description Is Required'),
            course_overview: Yup.string().required('Overview Is Required'),
            Image: Yup.mixed().required('File Is Required'),
            instructor_id: Yup.mixed().required('Course Instructor Is Required'),
            course_level: Yup.mixed().required('Course Level Is Required'),
        }), onSubmit: (values, {resetForm}) => {
            values['status'] = values['status'] === "1";
            values['con'] = formValues;
            console.log(values,'values')
            http.post(`/courses`, values, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }).then(({data}) => {
                storeCourseLearn(data.data.id)
                toast.success("Course Added Successfully");
                resetForm({values: ''});
            })
                .catch(({error}) => {
                    console.log(error)
                });
        },
    });

    const [courseCategories, setCourseCategories] = useState([]);
    const [courseInstructors, setCourseInstructor] = useState([]);
    const [title, setTitle] = useState('');
    const [courseLearns, setCourseLearns] = useState([]);

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, {title: ""}])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    const getCourseCategories = async () => {
        try {
            const {data: data} = await http.get(`/fetch-course-category`)
            setCourseCategories(data);
        } catch (error) {
            console.log(error)
        }
    }

    const getCourseInstructors = async () => {
        try {
            const {data: data} = await http.get(`/fetch-course-instructor`)
            setCourseInstructor(data);
        } catch (error) {
            console.log(error)
        }
    }

    const storeCourseLearn = (id) => {
        try {
            const {data: data} = http.post(`/course-learn/${id}`,formValues)
            setFormValues([{title: ''}]);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourseCategories();
        getCourseInstructors();
    }, []);
    console.log(formValues, 'formValues')
    return (<>
        <ToastContainer/>
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Course</h4>
            </div>
            <div className="card-body">
                <form className="row g-3 needs-validation" noValidate onSubmit={courseForm.handleSubmit}>
                    <div className='row'>
                        <div className="col-md-12">
                            <label htmlFor="course_category_id" className="form-label">Course Category</label>
                            <select
                                className="form-control"
                                id="course_category_id"
                                name="course_category_id"
                                onChange={courseForm.handleChange}
                                onBlur={courseForm.handleBlur}
                                value={courseForm.values.course_category_id}
                            >
                                <option value="">Select</option>
                                {courseCategories.map(({id, name}, index) => <option value={id}
                                                                                     key={index}>{name}</option>)}
                            </select>
                            <div className="text-danger">
                                {courseForm.touched.course_category_id && courseForm.errors.course_category_id && (
                                    <div>{courseForm.errors.course_category_id}</div>)}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text"
                                   className="form-control"
                                   id="name"
                                   name="name"
                                   onChange={courseForm.handleChange}
                                   onBlur={courseForm.handleBlur}
                                   value={courseForm.values.name}
                            />
                            <div className="text-danger">
                                {courseForm.touched.name && courseForm.errors.name && (
                                    <div>{courseForm.errors.name}</div>)}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="short_description" className="form-label">Short Description</label>

                            <CKEditor
                                editor={ClassicEditor}
                                id="short_description"
                                name="short_description"
                                data={''}
                                onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log("Editor is ready to use!", editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    courseForm.setFieldValue('short_description', data);
                                    setText(data);
                                }}
                            />
                            <div className="text-danger">
                                {courseForm.touched.short_description && courseForm.errors.short_description && (
                                    <div>{courseForm.errors.short_description}</div>)}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="course_overview" className="form-label">Course Overview</label>

                            <CKEditor
                                editor={ClassicEditor}
                                id="course_overview"
                                name="course_overview"
                                data={''}
                                onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log("Editor is ready to use!", editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    courseForm.setFieldValue('course_overview', data);
                                    setText(data);
                                }}
                            />
                            <div className="text-danger">
                                {courseForm.touched.course_overview && courseForm.errors.course_overview && (
                                    <div>{courseForm.errors.course_overview}</div>)}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                className="form-control"
                                id="status"
                                name="status"
                                onChange={courseForm.handleChange}
                                onBlur={courseForm.handleBlur}
                                value={courseForm.values.status}
                            >
                                <option value="">Select</option>
                                <option value={1}>Active</option>
                                <option value={0}>In Active</option>
                            </select>
                            <div className="text-danger">
                                {courseForm.touched.status && courseForm.errors.status && (
                                    <div>{courseForm.errors.status}</div>)}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="instructor_id" className="form-label">Instructor</label>
                            <select
                                className="form-control"
                                id="instructor_id"
                                name="instructor_id"
                                onChange={courseForm.handleChange}
                                onBlur={courseForm.handleBlur}
                                value={courseForm.values.instructor_id}
                            >
                                <option value="">Select</option>
                                {courseInstructors.map(({id, name}, index) => <option value={id}
                                                                                      key={index}>{name}</option>)}
                            </select>
                            <div className="text-danger">
                                {courseForm.touched.instructor_id && courseForm.errors.instructor_id && (
                                    <div>{courseForm.errors.instructor_id}</div>)}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="course_level" className="form-label">Course Level</label>
                            <select
                                className="form-control"
                                id="course_level"
                                name="course_level"
                                onChange={courseForm.handleChange}
                                onBlur={courseForm.handleBlur}
                                value={courseForm.values.course_level}
                            >
                                <option value="">Select</option>
                                <option value="1">Beginner</option>
                                <option value="2">Intermediate</option>
                                <option value="3">Expert</option>
                            </select>
                            <div className="text-danger">
                                {courseForm.touched.course_level && courseForm.errors.course_level && (
                                    <div>{courseForm.errors.course_level}</div>)}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="courseImage" className="form-label">Image</label>
                            <input type="file"
                                   className="form-control"
                                   id="courseImage"
                                   onChange={event => {
                                       courseForm.setFieldValue('Image', event.currentTarget.files[0]);
                                   }}
                                   onBlur={courseForm.handleBlur}
                            />

                            <div className="text-danger">
                                {courseForm.touched.Image && courseForm.errors.Image && (
                                    <div>{courseForm.errors.Image}</div>)}
                            </div>
                        </div>


                    </div>


                    <div className='row' style={{marginTop: '10px'}}>

                        <div className="table-responsive">
                            <table className="table mb-0 table-centered table-bordered">
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th className="text-end">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {formValues.map((element, index) => (<tr key={index}>
                                    <td>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='title'
                                            onChange={e => handleChange(index, e)}
                                        />
                                    </td>
                                    <td className="text-center">
                                        {
                                            index ?
                                                <button type="button" className="btn btn-danger button remove"
                                                        onClick={() => removeFormFields(index)}>
                                                    <i className="fa fa-trash"></i></button>
                                                : null
                                        }
                                        <button className="btn btn-info" type='button'
                                                onClick={() => addFormFields()}
                                                style={{marginLeft: '6px'}}
                                        >
                                            <i className="fa fa-save"></i>
                                        </button>
                                    </td>
                                </tr>))}
                                </tbody>
                            </table>
                        </div>

                        <div className="col-12" style={{marginTop: '10px'}}>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>);
}

export default CourseForm;