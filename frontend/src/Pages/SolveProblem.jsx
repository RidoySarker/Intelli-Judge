import Header from "../Shared/Header";
import Offcanvas from "../Shared/Offcanvas";
import React, {useEffect, useState} from "react";
import http from "../interceptors/http";
import {Link} from "react-router-dom";
import PageBannerStart from "../Component/Course/PageBannerStart";

export default function SolveProblem() {
    const [problems, setProblems] = useState([]);

    const getProblems = async () => {
        try {
            const {data: data} = await http.get(`frontend/fetch-problems`);
            // console.log(data.data)
            setProblems(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProblems();
    }, []);

    return (
        <>
            <Header/>
            <Offcanvas/>
            <PageBannerStart name="Solve Problem"/>
            <div className="section section-padding">
                <div className="container">
                    <div className='row'>
                        <div class="d-flex justify-content-end">
                            <a className="btn btn-outline-warning" style={{marginLeft: '13px'}}>
                                <Link
                                    className="text-black"
                                    to={`/my-submissions`}>My Submissions &nbsp; <i
                                    className="fa fa-arrow-right"></i></Link>
                            </a>

                        </div>
                        {problems.map((problem, index) => {
                            return (
                                <div className="col-lg-12" style={{margin: '1%'}} key={problem.id}>
                                    <div className="card"
                                         style={{boxShadow: '0 4px 10px rgba(0,0,0,0.16), 0 4px 10px rgba(0,0,0,0.23)'}}>
                                        <div className="single-course-list p-4" style={{
                                            minHeight: '0',
                                        }}>
                                            <div className="course-content">
                                                <div className="top-meta">
                                                    <a className="tag" href="#">
                                                        {problem.level.toUpperCase()}
                                                    </a>
                                                    <a className="tag" href="#">
                                                        {problem.question_type.toUpperCase()}
                                                    </a>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h3 className="title">
                                                        <Link
                                                            to={`/solve-problem/${problem.slug}`}>{problem.title.toUpperCase()}</Link>
                                                    </h3>

                                                    <a className="btn btn-outline-primary">
                                                        <Link
                                                            className="text-black"
                                                            to={`/solve-problem/${problem.slug}`}>Solve It Now!</Link>
                                                    </a>
                                                </div>
                                                <span
                                                    dangerouslySetInnerHTML={{__html: problem.problem_statement.substr(0, 100) + '....'}}>
                                                </span>
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