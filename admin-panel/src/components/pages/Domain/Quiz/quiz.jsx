import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from "../../../../interceptors/http";
import QuizForm from "./quizForm";
import QuizList from "./quizList";

const Quiz = () => {
    const quizForm = useFormik({
        initialValues : {
            quiz_title: '',
            marks: ''
        },
        validationSchema: Yup.object({
            quiz_title: Yup.string().required('Title Is Required'),
            marks: Yup.number().required('Marks Is Required')
        }),
        onSubmit: (values, {resetForm}) => {
            http.post(`/quizs`, values)
                .then(() => {
                    toast.success("Quiz Added Successfully");
                    getQuizs();
                    resetForm({values: ''});
                })
                .catch(({error}) => {
                    console.log(error)
                });
        },
    });

    const [quizs, setQuizs] = useState([]);

    const getQuizs = async () => {
        try {
            const {data:data} = await http.get(`/quizs`)
            setQuizs(data.data);
        } catch (error) {
            console.log(error)
        }
    }
    const deleteQuizs = async (id) => {
        try {
            await http.delete(`/quizs/${id}`);
            toast.success("Quiz Deleted Successfully");
            return getQuizs();
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getQuizs();
    }, []);

    return (
        <>
            <div className="row mt-5">
                <ToastContainer/>
                <div className="col-lg-4">
                    <QuizForm quizForm={quizForm} />
                </div>
                <div className="col-lg-8">
                    <QuizList quizs={quizs} deleteQuizs={deleteQuizs} />
                </div>
            </div>
        </>
    );
}

export default Quiz;