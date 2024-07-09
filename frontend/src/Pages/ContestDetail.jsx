import Header from "../Shared/Header";
import Offcanvas from "../Shared/Offcanvas";
import React, { useEffect, useState } from "react";
import http from "../interceptors/http";
import { Link, useParams } from "react-router-dom";
import PageBannerStart from "../Component/Course/PageBannerStart";
import Modal from 'react-modal';
import { toast, ToastContainer } from "react-toastify";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '30%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function ContestDetail() {
    const {slug} = useParams();
    const [problems, setProblems] = useState([]);
    const [contest, setContest] = useState({
        problems: [],
    });

    const getContest = async () => {
        try {
            let email = localStorage.getItem('userEmail');
            const {data: data} = await http.get(`frontend/fetch-slug-wise-contest`, {
                params: {
                    slug: slug,
                }
            });

            setContest(data?.data?.contest);
            setProblems(data?.data?.problems);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getContest();
    }, []);

    return (
        <>
            <Header/>
            <Offcanvas/>
            <ToastContainer/>
            <PageBannerStart name={`${contest.title}`}/>
            <div className="section section-padding">
                <div className="container">
                    <div className='row'>
                        {problems.length && problems.map((problem, index) => {
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
                                                        {problem.title.toUpperCase()}
                                                    </a>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h3 className="title">
                                                        <Link
                                                            to={`/contests/${contest.slug}/${problem.slug}`}>{problem.title.toUpperCase()}</Link>
                                                    </h3>

                                                    <a className="btn btn-outline-primary">
                                                        <Link
                                                            className="text-black"
                                                            to={`/contests/${contest.slug}/${problem.slug}`}>Solve It Now!</Link>
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