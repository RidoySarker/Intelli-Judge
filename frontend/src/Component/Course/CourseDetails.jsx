import React, {useEffect, useState} from 'react'
import Header from '../../Shared/Header'
import Offcanvas from '../../Shared/Offcanvas'
import PageBannerStart from './PageBannerStart'
import Footer from '../../Shared/Footer'
import axios from "axios";
import {Link, Route, useParams, useNavigate} from 'react-router-dom'
import http from "../../interceptors/http";
import {Dna} from 'react-loader-spinner';
import {HOST} from "../../constants/app";

export default function CourseDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [courseDetail, setCourseDetail] = useState([]);
    const [courseContentCategory, setCourseContentCategory] = useState([]);
    const [subscribedCourseUser, setSubscribedCourseUser] = useState([]);
    const [relatedCourse, setRelatedCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalLecture, setTotalLecture] = useState(0)
    const email = localStorage.getItem('userEmail');
    const getCourseDetail = async () => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-course-details/${id}`)
            setCourseDetail(data.data[0]);
            setTotalLecture(data.data[1]);
            setRelatedCourse(data.data[2]);
            if (email) {
                checkUserSubscribedCourse(email, data.data[0].id);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getCourseContent = async () => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-course-contents/${id}`);
            setCourseContentCategory(data.data);
        } catch (error) {
            console.log(error)
        }
    }
    const checkUserSubscribedCourse = async (email, courseId) => {
        try {
            const {data: data} = await http.get(`/frontend/check-user-subscribed/${email}/${courseId}`);
            console.log(data,'data')
            setSubscribedCourseUser(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const courseSubscribed = async (id) => {
        try {
            if (!email) {
                navigate(`/login`);
                return;
            }
            setLoading(true);
            const {data: data} = await http.post(`/subscribed-course/${email}/${id}`);
            navigate(`/course-content-reading/${data.data.courseId}/${data.data.id}`);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const continueCourse = async (id) => {

    }

    useEffect(() => {
        getCourseDetail();
        getCourseContent();
    }, []);
    console.log(subscribedCourseUser, 'subscribedCourseUser');
    return (<>
        {/*{loading ? (*/}
        {/*    <Dna*/}
        {/*        visible={true}*/}
        {/*        height="500"*/}
        {/*        width="500"*/}
        {/*        ariaLabel="dna-loading"*/}
        {/*        wrapperStyle={{}}*/}
        {/*        wrapperClass="dna-wrapper"*/}
        {/*    />*/}
        {/*) : ''}*/}
        <Header/>
        <Offcanvas/>
        <div className="section page-banner-section bg-color-1">

            <img className="shape-4" src="assets/images/shape/shape-21.png" alt="shape"/>
            <img className="shape-5" src="assets/images/shape/shape-21.png" alt="shape"/>

            <div className="container">
                <div className="course-details-banner-content">
                    <h2 className="title">{courseDetail.name}</h2>

                    <p dangerouslySetInnerHTML={{ __html:courseDetail.shortDescription }}></p>

                    <div className="course-details-meta">
                        <div className="meta-action">
                            <div className="meta-author">
                                <img src={`${HOST}${courseDetail.instructor && courseDetail.instructor.image}`}
                                     alt="Author"/>
                            </div>
                            <div className="meta-name">
                                <h5 className="name">{courseDetail.instructor && courseDetail.instructor.name}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="section section-padding">
            <div className="container">

                <div className="row justify-content-between">
                    <div className="col-xl-7 col-lg-8">

                        {/* <!-- Course Details Wrapper Start --> */}
                        <div className="course-details-wrapper">

                            {/* <!-- Course Overview Start --> */}
                            <div className="course-overview">
                                <h3 className="title">Course Overview</h3>
                                <p dangerouslySetInnerHTML={{ __html:courseDetail.courseOverview }}></p>
                            </div>

                            <div className="course-learn-list">
                                <h3 className="title">What you will learn</h3>
                                {courseDetail.courseLearn && courseDetail.courseLearn.map(function (learn) {
                                    return (<ul key={learn.id}>
                                        <li>{learn.title}</li>
                                    </ul>);
                                })}
                            </div>

                            {/* <!-- Course Lessons Start --> */}
                            <div className="course-lessons">

                                <div className="lessons-top">
                                    <h3 className="title">Course Content</h3>
                                    <div className="lessons-time">
                                        <span>{totalLecture && totalLecture} Chapter</span>
                                    </div>
                                </div>

                                {/* <!-- Course Accordion Start --> */}
                                <div className="course-accordion accordion" id="accordionCourse">
                                    {courseContentCategory.map((category) => <div className="accordion-item"
                                                                                  key={category.id}>
                                        <button data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne">{category.contentCategoryTitle} </button>
                                        <div id="collapseOne" className="accordion-collapse collapse show"
                                             data-bs-parent="#accordionCourse">
                                            <div className="accordion-body">
                                                {category.courseContent.map((content) => <ul className="lessons-list" key={content.id}>
                                                    <li>
                                                        <Link
                                                            style={{  pointerEvents: subscribedCourseUser && subscribedCourseUser.id ? "" : 'none' }}
                                                            to={`/course-content-reading/${content.courseId}/${content.id}`}>
                                                            {subscribedCourseUser && subscribedCourseUser.id ? <i className='fa-solid fa-lock-open'></i> : <i className='fa-solid fa-lock'></i>}
                                                            {content.contentTitle}
                                                        </Link>
                                                    </li>
                                                </ul>)}
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                                {/* <!-- Course Accordion End --> */}

                            </div>
                            {/* <!-- Course Lessons End --> */}

                            <div className="sidebar-details-course">
                                <h4 className="sidebar-details-title">Related Courses</h4>

                                <ul className="sidebar-details-courses">
                                    {relatedCourse && relatedCourse.map(function (course) {
                                        return (<li>
                                            <div className="sidebar-course-item">
                                                <div className="item-image">
                                                    <Link to={`/course-details/${course.id}`}>
                                                        <img src={`${HOST}${course.Image}`} alt="Courses"/>
                                                    </Link>
                                                </div>
                                                <div className="item-content">
                                                    <h3 className="title"><Link
                                                        to={`/course-details/${course.id}`}>{course.name}</Link>
                                                    </h3>
                                                </div>
                                            </div>
                                        </li>);
                                    })}
                                </ul>
                            </div>

                        </div>
                        {/* <!-- Course Details Wrapper End --> */}

                    </div>

                    <div className="col-lg-4">
                        {/* <!-- Sidebar Wrapper Start --> */}
                        <div className="sidebar-details-wrap">

                            {/* <!-- Sidebar Details Video Description Start --> */}
                            <div className="sidebar-details-video-description">
                                <div className="sidebar-video">
                                    <img style={{height: '270px'}} src={`${HOST}${courseDetail.Image}`}
                                         alt="video"/>
                                </div>
                                <div className="sidebar-description">
                                    {/*<div className="price">*/}
                                    {/*    <span className="sale-price">$49.99</span>*/}
                                    {/*    <span className="regular-price">$102</span>*/}
                                    {/*</div>*/}
                                    {/*<a className="btn btn-primary btn-hover-heading-color w-100" href=".">Add To Cart</a>*/}
                                    <ul className="description-list">
                                        {/*<li><i className="fa fa-clock-o"></i> Duration <span>52 mins</span></li>*/}
                                        <li>
                                            <i className="fa fa-sliders"></i> Level
                                            {courseDetail.courseLevel && courseDetail.courseLevel == 1 ?
                                                <span>Beginner</span> : courseDetail.courseLevel == 2 ?
                                                    <span>Expert</span> : <span>Expert</span>}
                                        </li>
                                        <li><i
                                            className="fa fa-file-o"></i> Lectures <span>{totalLecture && totalLecture} Chapter</span>
                                        </li>
                                        {/*<li><i className="fa fa-language"></i> Language <span>English</span></li>*/}
                                        {/*<li><i className="fa fa-user-o"></i> Enrolled <span>4 Enrolled</span></li>*/}
                                    </ul>
                                    {subscribedCourseUser && subscribedCourseUser.id ?
                                        <button type='button' onClick={() => continueCourse(courseDetail.id)}
                                                className="btn btn-primary w-100">Continue</button> :
                                        <button type='button' onClick={() => courseSubscribed(courseDetail.id)}
                                                className="btn btn-primary w-100">Subscribed Course</button>

                                    }
                                </div>
                            </div>

                        </div>
                        {/* <!-- Sidebar Wrapper End --> */}
                    </div>
                </div>


            </div>
        </div>

        <Footer/>
    </>)
}
