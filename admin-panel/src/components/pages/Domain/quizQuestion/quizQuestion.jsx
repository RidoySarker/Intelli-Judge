import {useFormik} from "formik";
import * as Yup from "yup";
import http from "../../../../interceptors/http";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import QuizQuestionForm from "./quizQuestionForm";
import QuizQuestionList from "./quizQuestionList";

const QuizQuestion = () => {
    const quizQuestionForm = useFormik({
        initialValues : {
            quiz_id: '',
            question_id: ''
        },

        validationSchema:Yup.object( {
            quiz_id: Yup.string().required('Quiz Is Required'),
            question_id: Yup.string().required('Question Is Required'),
        }),

        onSubmit: (values, {resetForm}) => {
            http.post(`/quiz-questions`, values)
                .then(() => {
                    toast.success("Quiz Question Added Successfully");
                    resetForm({values: ''});
                    getQuizs();
                })
                .catch(({error}) => {
                    console.log(error)
                });
        },
    });

    const [quizs, setQuizes] = useState([]);
    const [courseQuestions, setCourseQuestions] = useState([]);
    const [quizQuestions, setQuizQuestions] = useState([]);

    const getQuizs = async () => {
        try {
            const {data:data} = await http.get(`/fetch-quizs`)
            setQuizes(data);
        } catch (error) {
            console.log(error)
        }
    }

    const getCourseQuestions = async () => {
        try {
            const {data:data} = await http.get(`/fetch-course-questions`)
            setCourseQuestions(data);
        } catch (error) {
            console.log(error)
        }
    }

    const getQuizQuestions = async () => {
        try {
            const {data:data} = await http.get(`/quiz-questions`)
            setQuizQuestions(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const editQuizQuestion = async () => {
        try {

        } catch (exception) {

        }
    }
    const deleteQuizQuestions = async (id) => {
        try {
            await http.delete(`/quiz-questions/${id}`);
            toast.success("Quiz Deleted Successfully");
            return getQuizQuestions();
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getQuizs();
        getCourseQuestions();
        getQuizQuestions();
    }, []);

    return (
        <>
            <div className="row mt-5">
                <ToastContainer/>
                <div className="col-lg-4">
                    <QuizQuestionForm quizQuestionForm={quizQuestionForm} quizs={quizs} courseQuestions={courseQuestions} />
                </div>
                <div className="col-lg-8">
                    <QuizQuestionList quizQuestions={quizQuestions} editQuizQuestion={editQuizQuestion} deleteQuizQuestions={deleteQuizQuestions} />
                </div>
            </div>
        </>
    );
}

export default QuizQuestion;