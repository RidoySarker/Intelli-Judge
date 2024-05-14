import React, {useEffect, useState} from 'react'
import http from "../../interceptors/http";
import {Link} from "react-router-dom";
import {HOST} from "../../constants/app";

export default function Course() {
    const [courseCategories, setCourseCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [totalCourse, setTotalCourse] = useState(0);

    const getCourseCategories = async () => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-course-category`);
            setCourseCategories(data);
            if (data[0].id) {
                await fetchCategoryWiseCourse(data[0].id);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCategoryWiseCourse = async (id) => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-category-wise-courses/${id}`);
            setCourses(data);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchTotalCourses = async () => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-total-course`);
            console.log(data.data, 'course')
            setTotalCourse(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourseCategories();
        fetchTotalCourses();
    }, []);
    return (<>
        <div className="section section-padding">
            <div className="container">
                {/* <!-- Section Title Start --> */}
                <div className="section-title text-center">
                    <h2 className="title"><span>Top Rated</span> Learning Tutorials</h2>
                </div>
                {/* <!-- Section Title End --> */}

                {/* <!-- Courses Wrapper Start --> */}
                <div className="courses-wrapper">

                    {/* <!-- Courses Tab Start --> */}
                    <div className="courses-tab">

                        <div className="tab-menu">
                            <ul className="nav justify-content-center">
                                {courseCategories && courseCategories.map(function (category) {
                                    return (<li key={category.id}>
                                        <button type='button'
                                                className="active"
                                                data-bs-toggle={category.id}
                                                onClick={() => fetchCategoryWiseCourse(category.id)}
                                                data-bs-target={category.id}>
                                            {category.name}
                                        </button>
                                    </li>)
                                })}
                            </ul>
                        </div>

                        {/* <!-- Courses Tab Content Start --> */}
                        <div className="tab-content courses-tab-content">
                            {courses && courses.map(function (course) {
                                return (<div className="tab-pane active" id={course.categoryId} key={course.id}>
                                    <div className="row">
                                        {course.Course && course.Course.map(function (item) {
                                            return (<div className="col-lg-3 col-sm-6" key={item.id}>
                                                {/* <!-- Single Courses Start --> */}
                                                <div className="single-course" style={{height: '370px'}}>
                                                    <div className="courses-image">
                                                        <Link to={`/course-details/${item.id}`}>
                                                            <img style={{height: '180px'}} src={`${HOST}${item.Image}`}
                                                                 alt="Courses"/>
                                                        </Link>
                                                    </div>
                                                    <div className="courses-content"
                                                         style={{padding: '0px 7px', height: '115px'}}>
                                                        <div className="top-meta">
                                                            {item.courseLevel && item.courseLevel == 1 ?
                                                                <span
                                                                    className="tag">Beginner</span> : item.courseLevel == 2 ?
                                                                    <span className="tag">Expert</span> :
                                                                    <span className="tag">Expert</span>}

                                                        </div>
                                                        <h3 className="title">
                                                            <Link to={`/course-details/${item.id}`}>{item.name}</Link>
                                                        </h3>
                                                    </div>
                                                    <div className="courses-meta" style={{height: '70px'}}>
                                                        <div>
                                                            <span></span>
                                                        </div>
                                                        <div>
                                                            <Link to={`/course-details/${item.id}`}>Get Start <i
                                                                className='fa fa-arrow-right'></i> </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- Single Courses End --> */}
                                            </div>)
                                        })}

                                    </div>

                                </div>)
                            })}
                        </div>
                        {/* <!-- Courses Tab Content End --> */}

                    </div>
                    {/* <!-- Courses Tab End --> */}

                    <div className="courses-more text-center">

                        <img className="shape-1" src="assets/images/shape/shape-8.png" alt="Shape"/>
                        <img className="shape-2" src="assets/images/shape/shape-9.png" alt="Shape"/>

                        <p><strong>{totalCourse}</strong> more skillful courses you can explore</p>
                        <Link to='/course' className="btn btn-primary btn-hover-heading-color">Explore All
                            Courses</Link>
                    </div>

                </div>
                {/* <!-- Courses Wrapper End --> */}
            </div>
        </div>
    </>)
}
