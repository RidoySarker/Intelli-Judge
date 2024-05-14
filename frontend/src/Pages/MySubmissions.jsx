import Header from "../Shared/Header";
import Offcanvas from "../Shared/Offcanvas";
import React, { useEffect, useState } from "react";
import http from "../interceptors/http";
import { Link } from "react-router-dom";
import PageBannerStart from "../Component/Course/PageBannerStart";

export default function MySubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const email = localStorage.getItem('userEmail');
    const getProblems = async () => {
        try {
            const {data: data} = await http.get(`frontend/fetch-submissions/${email}`);
            setSubmissions(data.data);
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
            <PageBannerStart name="My Submissions"/>
            <div className="section section-padding">
                <div className="container">
                    <div className='row'>
                        {submissions.map((submission, index) => {
                            return (
                                <div className="col-lg-12" style={{margin: '1%'}} key={submission.id}>
                                    <div className="card"
                                         style={{boxShadow: '0 4px 10px rgba(0,0,0,0.16), 0 4px 10px rgba(0,0,0,0.23)'}}>
                                        <div className="single-course-list p-4"  style={{
                                            minHeight: '0',
                                        }}>
                                            <div className="course-content">
                                                <div className="top-meta">
                                                    <a className="tag" href="#">
                                                        {submission.question.level.toUpperCase()}
                                                    </a>
                                                    <a className="tag" href="#">
                                                        {submission.question.question_type.toUpperCase()}
                                                    </a>
                                                    <span className="tag-warning">
                                                        {submission.run_time}&nbsp; MS
                                                    </span>
                                                    <span className="tag-warning">
                                                        {new Date(submission.createdAt).toLocaleString('en-US')}
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h3 className="title">
                                                        <Link
                                                            to={`/solve-problem/${submission.question.slug}`}>{submission.question.title.toUpperCase()}</Link>
                                                    </h3>

                                                    <a className="btn btn-outline-primary">
                                                        <Link
                                                            className={`text-${submission.status === 'pass' ? 'success' : 'danger'}`}
                                                            to={`#`}>{submission.status === 'pass' ? 'Accepted !' : 'Wrong !'}</Link>
                                                    </a>
                                                </div>
                                                <span
                                                    dangerouslySetInnerHTML={{__html: submission.question.problem_statement.substr(0, 100) + '....'}}>
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