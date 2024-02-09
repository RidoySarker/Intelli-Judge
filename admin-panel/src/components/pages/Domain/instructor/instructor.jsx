import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from "../../../../interceptors/http";
import InstructorForm from "./instructorForm";
import InstructorList from "./instructorList";

const Instructor = () => {

    const instructorForm = useFormik({

        initialValues: {
            name: '',
            image: ''

        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name Is Required'),
            image: Yup.mixed().required('File Is Required'),
        }),
        onSubmit: (values, {resetForm}) => {
            http.post(`/course-instructor`, values, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }).then(() => {
                toast.success("Instructor Added Successfully");
                resetForm({values: ''});
                window.location.reload()
            }).catch(({error}) => {
                console.log(error)
            });
        },
    });

    const [courseInstructors, setCourseInstructors] = useState([]);

    const getCourseInstructors = async () => {
        try {
            const {data:data} = await http.get(`/course-instructor`)
            setCourseInstructors(data.data);
        } catch (error) {
            console.log(error)
        }
    }
    const deleteCourseInstructors = async (id) => {
        try {
            await http.delete(`/course-instructor/${id}`);
            toast.success("Course Instructor Deleted Successfully");
            return getCourseInstructors();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourseInstructors();
    }, []);

    return (
        <>
            <div className="row mt-5">
                <ToastContainer/>
                <div className="col-lg-4">
                    <InstructorForm instructorForm={instructorForm}/>
                </div>
                <div className="col-lg-8">
                    <InstructorList
                        courseInstructors={courseInstructors}
                        deleteCourseInstructors={deleteCourseInstructors}
                    />
                </div>
            </div>
        </>
    );
}

export default Instructor;