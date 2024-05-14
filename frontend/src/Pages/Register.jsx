import React, {useEffect, useState} from 'react'
import Header from '../Shared/Header'
import PageBannerStart from "../Component/Course/PageBannerStart";
import {useFormik} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import http from "../interceptors/http";

export default function Register() {
    const navigator = useNavigate();
    let navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [referCode, setReferCode] = useState([]);

    const registerForm = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            referral_code: '',
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('First Name Is Required'),
            last_name: Yup.string().required('Last Name Is Required'),
            email: Yup.string().email('Invalid email').required('Email Is Required'),
            password: Yup.string().min(8, "Must Contain 8 Characters")
                .required('Password is required'),
            passwordConfirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords Not match')
                .required('Confirm Password Required')
        }),
        onSubmit: (values, {resetForm}) => {
            values.referral_code = referCode;
            http.post(`/user-register`, values)
                .then(() => {
                    toast.success("Registration Successfully");
                    navigator('/login')
                })
                .catch(({error}) => {
                    console.log(error)
                });
        },
    })

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/', {replace: true});
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const  urlParams = new URLSearchParams(window.location.search);
        setReferCode(urlParams.get(''));
    },[]);

    return (
        <>
            <ToastContainer/>
            <Header/>
            {/*<PageBannerStart name="Register" />*/}

            <div className="section section-padding">
                <div className="container">

                    <div className="login-register-wrapper">
                        <div className="row gx-5">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-6">
                                <div className="login-register-box">
                                    <div className="section-title">
                                        <h2 className="title">Register</h2>
                                    </div>

                                    <div className="login-register-form">
                                        <form onSubmit={registerForm.handleSubmit}>
                                            <div className="single-form">
                                                <input type="text"
                                                       className="form-control"
                                                       placeholder="First Name"
                                                       name="first_name"
                                                       onChange={registerForm.handleChange}
                                                       onBlur={registerForm.handleBlur}
                                                       value={registerForm.values.first_name}
                                                />
                                                <div className="text-danger">
                                                    {
                                                        registerForm.touched.first_name &&
                                                        registerForm.errors.first_name &&
                                                        (<div>{registerForm.errors.first_name}</div>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="single-form">
                                                <input type="text"
                                                       className="form-control"
                                                       placeholder="Last Name"
                                                       name="last_name"
                                                       onChange={registerForm.handleChange}
                                                       onBlur={registerForm.handleBlur}
                                                       value={registerForm.values.last_name}
                                                />
                                                <div className="text-danger">
                                                    {
                                                        registerForm.touched.last_name &&
                                                        registerForm.errors.last_name &&
                                                        (<div>{registerForm.errors.last_name}</div>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="single-form">
                                                <input type="text"
                                                       className="form-control"
                                                       placeholder="Email"
                                                       name="email"
                                                       onChange={registerForm.handleChange}
                                                       onBlur={registerForm.handleBlur}
                                                       value={registerForm.values.email}
                                                />
                                                <div className="text-danger">
                                                    {
                                                        registerForm.touched.email &&
                                                        registerForm.errors.email &&
                                                        (<div>{registerForm.errors.email}</div>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="single-form">
                                                <input type="password"
                                                       className="form-control"
                                                       placeholder="Password"
                                                       name="password"
                                                       onChange={registerForm.handleChange}
                                                       onBlur={registerForm.handleBlur}
                                                       value={registerForm.values.password}
                                                />
                                                <div className="text-danger">
                                                    {
                                                        registerForm.touched.password &&
                                                        registerForm.errors.password &&
                                                        (<div>{registerForm.errors.password}</div>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="single-form">
                                                <input type="password"
                                                       className="form-control"
                                                       placeholder="Confirm Password"
                                                       name="passwordConfirmation"
                                                       onChange={registerForm.handleChange}
                                                       onBlur={registerForm.handleBlur}
                                                       value={registerForm.values.passwordConfirmation}
                                                />
                                                <div className="text-danger">
                                                    {
                                                        registerForm.touched.passwordConfirmation &&
                                                        registerForm.errors.passwordConfirmation &&
                                                        (<div>{registerForm.errors.passwordConfirmation}</div>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="single-form">
                                                <label id='referral_code'>Referral Code</label>
                                                <input type="text"
                                                       readOnly
                                                       id='referral_code'
                                                       className="form-control"
                                                       placeholder="Referral Code"
                                                       name='referral_code'
                                                       onChange={registerForm.handleChange}
                                                       onBlur={registerForm.handleBlur}
                                                       value={referCode}
                                                />
                                            </div>
                                            <div className="single-form">
                                                <button className="btn btn-primary btn-hover-heading-color w-100"
                                                        type="submit">Register
                                                </button>
                                            </div>
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
