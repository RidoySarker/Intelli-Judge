import Header from "../../Shared/Header";
import Offcanvas from "../../Shared/Offcanvas";
import PageBannerStart from "./PageBannerStart";
import React, {useEffect, useState} from "react";
import {Link, Route, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import parse from 'html-react-parser';
import http from "../../interceptors/http";


export default function ContentReading() {
    let navigate = useNavigate();
    const {courseId, id} = useParams();
    const [courseRead, setCourseRead] = useState([]);
    const [courseContentCategory, setCourseContentCategory] = useState([]);
    const [isContentRead, setContentRead] = useState(false);
    const [isNext, setNext] = useState(false);
    const [isPrevious, setPrevious] = useState(false);

    const getReadContent = async () => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-reading-content/${courseId}/${id}`)
            if (data.data[0].id) {
                setCourseRead(data.data[0]);
                await contentReadComplete(data.data[0].id);
            }
            if (data.data[1] == null){
                setNext(true)
            }
            if (data.data[2] == null){
                setPrevious(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getCourseContent = async () => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-course-contents/${courseId}`);
            console.log(data.data, 'courseId')
            setCourseContentCategory(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    function nextFunction(courseRead) {
        let path = `/course-content-reading/${courseRead.courseId}/${courseRead.id + 1}`;
        navigate(path);
        window.location.reload();
    }

    function previousFunction(courseRead) {
        let path = `/course-content-reading/${courseRead.courseId}/${courseRead.id - 1}`;
        navigate(path);
        window.location.reload();
    }

    const contentRead = async (content) => {
        let path = `/course-content-reading/${content.courseId}/${content.id}`;
        await contentReadComplete(content.id);
        navigate(path);
        window.location.reload();
    }

    const contentComplete = async (courseRead) => {
        try {
            const values = {
                course_id: courseRead.courseId, course_content_id: courseRead.id
            }
            const {data: data} = await http.post(`/course-progress`, values);
            if (data.code === 201) {
                setContentRead(false);
                await contentReadComplete(courseRead.id)
            }

            if (data.code === 200) {
                setContentRead(true);
                await contentReadComplete(courseRead.id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const contentReadComplete = async (id) => {
        try {
            const {data: data} = await http.get(`/is-content-complete/${id}`);
            if (data.data) {
                setContentRead(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getReadContent();
        getCourseContent();
    }, []);
    console.log(isNext,'next');
    console.log(isPrevious,'isPrevious');
    return (<>
        <Header/>
        <Offcanvas/>
        <PageBannerStart name={courseRead.contentTitle}/>

        <div className="section section-padding">
            <div className="container">

                {/* <!-- Course List Wrapper Start --> */}
                <div className="course-list-wrapper">
                    <div className="row">
                        <div className="col-lg-3">
                            {/* <!-- Sidebar Wrapper Start --> */}
                            <div>

                                {/* <!-- Sidebar Wrapper Start --> */}
                                <div>
                                    <h3 className="widget-title">Contents</h3>

                                    <div className="course-accordion accordion" id="accordionCourse">
                                        {courseContentCategory.map((category) => <div className="accordion-item"
                                                                                      key={category.id}>
                                            <button data-bs-toggle="collapse"
                                                    data-bs-target="#collapseOne">{category.contentCategoryTitle} </button>
                                            <div id="collapseOne" className="accordion-collapse collapse show"
                                                 data-bs-parent="#accordionCourse">
                                                <div className="accordion-body">
                                                    {category.courseContent.map((content) => {
                                                            return (
                                                                <ul className="lessons-list" key={content.id}>
                                                                    {/*{content.CourseProgress.length > 0 ? <hr style={{*/}
                                                                    {/*    margin: '0rem 0',*/}
                                                                    {/*    opacity: '1.25',*/}
                                                                    {/*    marginBottom: '-15px',*/}
                                                                    {/*    marginLeft: '20px',*/}
                                                                    {/*}}/> : ''}*/}
                                                                    {content.CourseProgress.length > 0 ?
                                                                        (<i className='fa-solid fa-circle-check'></i>) :
                                                                        (<i className='fa fa-times-circle'></i>)}
                                                                    &nbsp;
                                                                    <a onClick={() => contentRead(content)}>
                                                                        {content.contentTitle}
                                                                    </a>

                                                                </ul>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </div>)}

                                    </div>
                                </div>
                                {/* <!-- Sidebar Wrapper End --> */}


                            </div>
                            {/* <!-- Sidebar Wrapper End --> */}
                        </div>
                        <div className="col-lg-9">
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="list">
                                    {/* <!-- Course List Start --> */}
                                    <div className="course-list-items">
                                        <div className="course-content">
                                            <h3 className="title">
                                                {courseRead.contentTitle}
                                            </h3>
                                            <p>
                                                     <span dangerouslySetInnerHTML={{__html: courseRead.content}}>
                                                        </span>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-9">
                            <div className="d-flex justify-content-between" style={{marginTop: '5%'}}>
                                <div>
                                    <button className="btn btn-outline-info"
                                            disabled={isPrevious}
                                            onClick={() => previousFunction(courseRead)}>
                                        <i className="fa fa-arrow-alt-circle-left"></i> &nbsp; BACK
                                    </button>
                                </div>


                                <div>
                                    <button className="btn btn-outline-success"
                                            onClick={() => contentComplete(courseRead)}>
                                        <i className="fa fa-circle-check"></i> &nbsp; MARK AS COMPLETE
                                    </button>
                                </div>

                                <div>
                                    <button className="btn btn-outline-primary"
                                            disabled={isNext}
                                            onClick={() => nextFunction(courseRead)}>
                                        NEXT  &nbsp;<i className="fa fa-arrow-alt-circle-right"></i>
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    </>)
}