import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import http from "../../../../interceptors/http";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useEffect, useState } from "react";

const ContestForm = () => {
    const [formValues, setFormValues] = useState([{title: ""}])
    const [problems, setProblems] = useState([]);
    const contestForm = useFormik({
        initialValues: {
            title: '',
            slug: '',
            access_code: '',
            start_time: '',
            end_time: '',
            status: '',
            problems: [],
        }, validationSchema: Yup.object({
            title: Yup.string().required('Title Is Required'),
            slug: Yup.string().required('Slug Is Required'),
            access_code: Yup.string().required('Access Code Is Required'),
            start_time: Yup.string().required('Start Time Is Required'),
            end_time: Yup.string().required('End Time Is Required'),
        }), onSubmit: (values, {resetForm}) => {
            values['status'] = 1;
            console.log({values});
            http.post(`/contest`, values, {
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(({data}) => {
                toast.success("Contest Added Successfully");
                resetForm({values: ''});
            }).catch(({error}) => {
                console.error(error)
            });
        },
    });

    const fetchProblems = async () => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-problems`);
            let options = data?.data?.map(item => {
                return {
                    option: item.id,
                    label: item.title,
                }
            })
            setProblems(options);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProblems();
    }, []);

    return (
        <>
            <ToastContainer/>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Contest</h4>
                </div>
                <div className="card-body">
                    <form className="row g-3 needs-validation" noValidate onSubmit={contestForm.handleSubmit}>
                        <div className='row'>
                            <div className="col-md-12">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text"
                                       className="form-control"
                                       id="title"
                                       name="title"
                                       onChange={contestForm.handleChange}
                                       onBlur={contestForm.handleBlur}
                                       value={contestForm.values.title}
                                />
                                <div className="text-danger">
                                    {contestForm.touched.title && contestForm.errors.title && (
                                        <div>{contestForm.errors.title}</div>)}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="slug" className="form-label">Slug</label>
                                <input type="text"
                                       className="form-control"
                                       id="slug"
                                       name="slug"
                                       onChange={contestForm.handleChange}
                                       onBlur={contestForm.handleBlur}
                                       value={contestForm.values.slug}
                                />
                                <div className="text-danger">
                                    {contestForm.touched.slug && contestForm.errors.slug && (
                                        <div>{contestForm.errors.slug}</div>)}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="access_code" className="form-label">Access Code</label>
                                <input type="text"
                                       className="form-control"
                                       id="access_code"
                                       name="access_code"
                                       onChange={contestForm.handleChange}
                                       onBlur={contestForm.handleBlur}
                                       value={contestForm.values.access_code}
                                />
                                <div className="text-danger">
                                    {contestForm.touched.access_code && contestForm.errors.access_code && (
                                        <div>{contestForm.errors.access_code}</div>)}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="start_time" className="form-label">Start Time</label>
                                <input type="datetime-local"
                                       className="form-control"
                                       id="start_time"
                                       name="start_time"
                                       onChange={contestForm.handleChange}
                                       onBlur={contestForm.handleBlur}
                                       value={contestForm.values.start_time}
                                />
                                <div className="text-danger">
                                    {contestForm.touched.start_time && contestForm.errors.start_time && (
                                        <div>{contestForm.errors.start_time}</div>)}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="end_time" className="form-label">End Time</label>
                                <input type="datetime-local"
                                       className="form-control"
                                       id="end_time"
                                       name="end_time"
                                       onChange={contestForm.handleChange}
                                       onBlur={contestForm.handleBlur}
                                       value={contestForm.values.end_time}
                                />
                                <div className="text-danger">
                                    {contestForm.touched.end_time && contestForm.errors.end_time && (
                                        <div>{contestForm.errors.end_time}</div>)}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="problems" className="form-label">Problems</label>
                                <Select
                                    name={"problems"}
                                    id={"problems"}
                                    options={problems}
                                    components={makeAnimated()}
                                    defaultValue={contestForm.values.problems}
                                    onChange={problem => contestForm.setFieldValue("problems", problem)}
                                    isMulti
                                />
                                <div className="text-danger">
                                    {contestForm.touched.problems && contestForm.errors.problems && (
                                        <div>{contestForm.errors.problems}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-12" style={{marginTop: '10px'}}>
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ContestForm;