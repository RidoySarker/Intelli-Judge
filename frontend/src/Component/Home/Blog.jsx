import React, {useEffect, useState} from 'react'
import http from "../../interceptors/http";
import {HOST} from "../../constants/app";
import {Link} from "react-router-dom";

export default function Blog() {
    const [courses, setCourse] = useState([]);

    const getCourses = async () => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-latest-course`);
            setCourse(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourses();
    }, []);
    return (
        <>
            <div class="section section-padding-02">
                <div class="container">

                    {/* <!-- Section Title Start --> */}
                    <div class="section-title text-center">
                        <h2 class="title">Get from our <span>Latest Course</span></h2>
                    </div>
                    {/* <!-- Section Title End --> */}

                    {/* <!-- Blog Wrapper Start --> */}
                    <div class="blog-wrapper">
                        <div class="row">
                            {courses && courses.map(function (course) {
                                return (
                                    <div className="col-lg-4 col-md-6">
                                        {/* <!-- Single Blog Start --> */}
                                        <div className="single-blog">
                                            <div className="blog-image">
                                                <Link to="">
                                                    <img style={{ height:'400px' }} src={`${HOST}${course.Image}`} alt="Blog"/>
                                                </Link>
                                                <span className="tags">{course.name}</span>
                                            </div>
                                            <div className="blog-content">
                                                <div className="meta">
                                                    {/*<a className="date" href=".">{ }</a>*/}
                                                    <Link className="author" to="">{course.instructor.name}</Link>
                                                </div>
                                                <h3 className="title">
                                                    <Link to="">{course.name}</Link>
                                                </h3>
                                                <p>{course.shortDescription.substr(0, 100) + '....'}</p>
                                            </div>
                                        </div>
                                        {/* <!-- Single Blog End --> */}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* <!-- Blog Wrapper End --> */}
                </div>
            </div>
        </>
    )
}
