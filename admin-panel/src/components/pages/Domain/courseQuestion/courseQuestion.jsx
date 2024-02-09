import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from "../../../../interceptors/http";
import CourseQuestionForm from "./courseQuestionForm";
import CourseQuestionList from "./courseQuestionList";

const CourseQuestion = () => {

    const [courseQuestions, setCourseQuestions] = useState([]);

    const getCourseQuestion = async () => {
        try {
            const {data:data} = await http.get(`/course-question`)
            setCourseQuestions(data.data);
        } catch (error) {
            console.log(error)
        }
    }
    const deleteQuestion = async (id) => {
        try {
            await http.delete(`/course-question/${id}`);
            toast.success("Course Question Deleted Successfully");
            return getCourseQuestion();
        } catch (error) {
            console.log(error)
        }
    }


    const editCourseQuestion = async () => {
        try {

        } catch (error) {

        }
    }

    useEffect(() => {
        getCourseQuestion();
    }, []);

    return (
        <>
            <div className="row mt-5">
                <ToastContainer/>
                <div className="col-lg-12">
                    <CourseQuestionList
                        courseQuestions={courseQuestions}
                        editCourseQuestion={editCourseQuestion}
                        deleteQuestion={deleteQuestion}
                    />
                </div>
            </div>
        </>
    );
}

export default CourseQuestion;