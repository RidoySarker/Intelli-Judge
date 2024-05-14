import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import http from "../../interceptors/http";
import {HOST} from "../../constants/app";

export default function CourseList() {
    const [courseCategories, setCourseCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [searchIds, setSearchIds] = useState([]);
    const [totalCourse, setTotalCourse] = useState(0);
    const getCourseCategories = async () => {
        try {
            const {data: data} = await http.get(`/fetch-course-category`)
            setCourseCategories(data);
        } catch (error) {
            console.log(error)
        }
    }

    const getCourses = async () => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-course`)
            setCourses(data);
            setTotalCourse(data.length)
        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        if(searchIds.length) {
            searchWiseCourse(searchIds);
        } else {
            getCourses();
        }
    }, [searchIds]);

    const searchWiseCourse = async (id) => {
        try {

            const {data: data} = await http.get(`/frontend/fetch-multiple-category-wise-course`, {
                params : {
                    search : searchIds.join(',')
                }
            })
            setCourses(data.data)
            setTotalCourse(data.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourseCategories();
    }, []);
    return (
        <>
            <div className="section section-padding">
                <div className="container">

                    {/* <!-- Course List Wrapper Start --> */}
                    <div className="course-list-wrapper">
                        <div className="row flex-row-reverse">
                            <div className="col-lg-9">

                                {/* <!-- Course Top Bar Start --> */}
                                <div className="course-top-bar">
                                    <div className="course-top-text">
                                        <p>We found <span>{totalCourse}</span> Courses For You</p>
                                    </div>
                                    <div className="course-top-inner">
                                        {/*<ul className="course-top-menu">*/}
                                        {/*    <span className="label">View</span>*/}
                                        {/*    <ul className="nav">*/}
                                        {/*        <li>*/}
                                        {/*            <button data-bs-toggle="tab" data-bs-target="#grid"><i*/}
                                        {/*                className="fa fa-th-large"></i></button>*/}
                                        {/*        </li>*/}
                                        {/*        <li>*/}
                                        {/*            <button className="active" data-bs-toggle="tab"*/}
                                        {/*                    data-bs-target="#list"><i className="fa fa-th-list"></i>*/}
                                        {/*            </button>*/}
                                        {/*        </li>*/}
                                        {/*    </ul>*/}
                                        {/*</ul>*/}
                                        {/*<div className="course-top-action">*/}
                                        {/*    <span className="label"><i className="fa fa-align-left"*/}
                                        {/*                               aria-hidden="true"></i> Sort By:</span>*/}
                                        {/*    <select className="select">*/}
                                        {/*        <option data-display="Default" value="1">Default</option>*/}
                                        {/*        <option value="1">Option 01</option>*/}
                                        {/*        <option value="2">Option 02</option>*/}
                                        {/*        <option value="3">Option 03</option>*/}
                                        {/*    </select>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                {/* <!-- Course Top Bar End --> */}

                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="list">
                                        {/* <!-- Course List Start --> */}
                                        <div className="course-list-items">


                                            {/* <!-- Course List Start --> */}
                                            {courses.map((course) => {
                                                    return (
                                                        <>
                                                            <div className="single-course-list" key={course.id}>
                                                                <div className="course-image">
                                                                    <Link to="">
                                                                        <img style={{width: '400px'}}
                                                                             src={`${HOST}${course.Image}`} alt="Courses"/>
                                                                    </Link>
                                                                </div>
                                                                <div className="course-content">
                                                                    <div className="top-meta">
                                                                        {course.courseLevel && course.courseLevel == 1 ?
                                                                            <span
                                                                                className="tag">Beginner</span> : course.courseLevel == 2 ?
                                                                                <span className="tag">Beginner</span> :
                                                                                <span className="tag">Expert</span>
                                                                        }
                                                                        {/*<Link className="tag" to="#">Beginner</Link>*/}
                                                                    </div>
                                                                    <h3 className="title">
                                                                        <Link
                                                                            to={`/course-details/${course.id}`}>{course.name}</Link>
                                                                    </h3>
                                                                    <span
                                                                        className="author-name">{course.instructor.name}</span>

                                                                    <p>{course.shortDescription.substr(0, 100) + '....'}</p>

                                                                    <div className="bottom-meta">
                                                                        <p className="meta-action"><i
                                                                            className="fa fa-clock-o"></i> Student</p>
                                                                        <p className="meta-action"><i
                                                                            className="fa fa-signal"></i> Student</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            )}
                                            {/* <!-- Course List End --> */}

                                        </div>
                                        {/* <!-- Course List End --> */}
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-3">
                                {/* <!-- Sidebar Wrapper Start --> */}
                                <div className="sidebar-wrap-02">

                                    {/* <!-- Sidebar Wrapper Start --> */}
                                    <div className="sidebar-widget-02">
                                        <h3 className="widget-title">Categories</h3>

                                        <div className="widget-checkbox">
                                            <ul className="checkbox-list">
                                                {courseCategories.map(({id, name}, index) =>
                                                    <li className="form-check" key={id}>
                                                        <input onChange={
                                                            (e) => {
                                                                setSearchIds((c) => {
                                                                    return e.target.checked ?
                                                                        [...c, id]
                                                                        :
                                                                        c.filter(el => el !== id)
                                                                })
                                                            }
                                                        }
                                                               className="form-check-input"
                                                               id={name}
                                                               type="checkbox" value=""/>
                                                        <label className="form-check-label"
                                                               for={name}>{name}</label>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <!-- Sidebar Wrapper End --> */}


                                </div>
                                {/* <!-- Sidebar Wrapper End --> */}
                            </div>
                        </div>
                    </div>
                    {/* <!-- Course List Wrapper End --> */}

                </div>
            </div>
        </>
    )
}
