import React, {useEffect, useState} from 'react'
import Header from '../Shared/Header'
import PageBannerStart from "../Component/Course/PageBannerStart";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useFormik} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import {API} from "../constants/app";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../slices/authSlice";

export default function Login() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const loginForm = useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validationSchema:Yup.object({
            email: Yup.string().email('Invalid Email').required('Email Is Required'),
            password: Yup.string().required('Password Is Required'),
        }),
        onSubmit: (values) => {
            axios.post(`${API}/user-login`, values)
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(login(response.data.data));
                        navigate('/',{replace: true});
                    }
                    toast.success("Login Successfully");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    })

    const handleLogIn = () => {
        loginForm.handleSubmit();
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/', {replace: true});
        }
    }, [isLoggedIn, navigate]);
    return (
        <>
            <ToastContainer/>
            <Header />
            {/*<PageBannerStart name="Login" />*/}

            <div className="section section-padding">
                <div className="container">

                    <div className="login-register-wrapper">
                        <div className="row gx-5">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-6">

                                <div className="login-register-box">
                                    <div className="section-title">
                                        <h2 className="title">Login</h2>
                                    </div>

                                    <div className="login-register-form">
                                        <form action="#">
                                            <div className="single-form">
                                                <label id='email'>Email</label>
                                                <input type="text"
                                                       id='email'
                                                       className="form-control"
                                                       placeholder="email"
                                                       name='email'
                                                       onChange={loginForm.handleChange}
                                                       onBlur={loginForm.handleBlur}
                                                       value={loginForm.values.email}
                                                />

                                                <div className="text-danger">
                                                    {
                                                        loginForm.touched.email &&
                                                        loginForm.errors.email &&
                                                        (<div>{loginForm.errors.email}</div>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="single-form">
                                                <label id='password'>Password</label>
                                                <input type="password"
                                                       id='password'
                                                       className="form-control"
                                                       placeholder="Password"
                                                       name='password'
                                                       onChange={loginForm.handleChange}
                                                       onBlur={loginForm.handleBlur}
                                                       value={loginForm.values.password}
                                                />

                                                <div className="text-danger">
                                                    {
                                                        loginForm.touched.password &&
                                                        loginForm.errors.password &&
                                                        (<div>{loginForm.errors.password}</div>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="single-form">
                                                <button
                                                    onClick={handleLogIn}
                                                    className="btn btn-primary btn-hover-heading-color w-100"
                                                    type="button">Login</button>
                                            </div>
                                            {/*<div className="single-form">*/}
                                            {/*    <p><a href="#">Lost your password?</a></p>*/}
                                            {/*</div>*/}
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
