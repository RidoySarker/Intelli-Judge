import Header from "../Shared/Header";
import Offcanvas from "../Shared/Offcanvas";
import React, {useEffect, useState} from "react";
import {default as ReactSelect} from "react-select";
import Select from "react-select";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import http from "../interceptors/http";
import {current} from "@reduxjs/toolkit";
import {array} from "yup";
import PageBannerStart from "../Component/Course/PageBannerStart";
import {HOST} from "../constants/app";

export default function Quiz() {
    let navigate = useNavigate();
    const [courses, setCourse] = useState([]);
    const [courseSelect, selectedCourse] = useState([]);

    const getCourse = async () => {
        try {
            const {data: data} = await http.get(`frontend/fetch-course`)
            setCourse(data);
        } catch (error) {
            console.log(error)
        }
    }

    function handleCourseSelect(course, index) {
        let selectedCourses = [...courseSelect];
        const isExists = selectedCourses.findIndex(v => v.course_id === course.id);
        if (isExists !== -1) {
            selectedCourses = selectedCourses.filter(v => v.course_id !== course.id);
            selectedCourse([...selectedCourses]);
        } else {
            selectedCourse(current => [...current, {course_id: course.id, name: course.name}]);
        }

    }

    const isSelected = (course_id) => {
        const selectedCourses = [...courseSelect];
        return !!selectedCourses.find(v => v.course_id === course_id);
    }

    async function handleJump() {
        try {
            const {data} = await http.post(`question-generate`, courseSelect);
            navigate(`/quiz-question/${data.data.id}`)
            console.log(data, 'data')
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getCourse();
    }, []);

    return (
        <>
            <Header/>
            <Offcanvas/>
            <PageBannerStart name="Quizes" title='Click To Choose Course for Playing Quiz'/>
            <div className="section p-5">
                <div className="d-flex justify-content-end" style={{
                    marginRight : '2%'
                }}>
                    <button className='btn btn-sm btn-outline-info text-center' onClick={() => handleJump()}>
                        Start Quiz &nbsp; <i className="fa fa-arrow-right"></i>
                    </button>
                </div>
                <div className="container mt-5">

                    <div className='row g-5'>
                        {courses.map((course, index) => {
                            return (
                                <div className="col-6 position-relative" onClick={() => handleCourseSelect(course, index)}
                                     style={{cursor: "pointer"}}>

                                    <div className="p-3 border bg-light">
                                        <span className="quiz-select">
                                            {isSelected(course.id) && (
                                                <i className="fa fa-check-circle-o" style={{
                                                    fontSize: '30px',
                                                    color: '#2fb92fb8',
                                                }}/>
                                            )}

                                            </span>

                                        <div className="single-course-list">

                                            <div className="course-image">
                                                <img style={{width: '200px'}}
                                                     src={`${HOST}${course.Image}`} alt="Courses"/>
                                            </div>
                                            <div className="course-content">
                                                <div className="top-meta">
                                                    {course.courseLevel && course.courseLevel == 1 ?
                                                        <span
                                                            className="tag">Beginner</span> : course.courseLevel == 2 ?
                                                            <span className="tag">Beginner</span> :
                                                            <span className="tag">Expert</span>
                                                    }
                                                </div>
                                                <h3 className="title">
                                                    {course.name.length > 50 ? course.name.substr(0, 50) + '...' : course.name}
                                                </h3>
                                                <p className="course-description">
                                                   <span dangerouslySetInnerHTML={{__html :  course.shortDescription.length > 100 ? course.shortDescription.substr(0, 100) + '...' : course.shortDescription}}></span>
                                                </p>
                                                <div className="bottom-meta">
                                                    <p className="meta-action"><i
                                                        className="fa fa-clock-o"></i> Student</p>
                                                    <p className="meta-action"><i
                                                        className="fa fa-signal"></i> Student</p>
                                                    <p className="meta-action">
                                                        <Link className="btn-sm btn-outline-primary" to={`/course-details/${course.id}`}>
                                                            <i
                                                                className="fa fa-link"></i> Go to Course
                                                        </Link>
                                                        </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>

        </>
)
}