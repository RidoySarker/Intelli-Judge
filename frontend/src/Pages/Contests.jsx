import Header from "../Shared/Header";
import Offcanvas from "../Shared/Offcanvas";
import React, { useEffect, useState } from "react";
import http from "../interceptors/http";
import { Link } from "react-router-dom";
import PageBannerStart from "../Component/Course/PageBannerStart";

export default function Contests() {
    const [contest, setContest] = useState([]);

    const getContests = async () => {
        try {
            let email = localStorage.getItem('userEmail');
            const {data: data} = await http.get(`frontend/fetch-contests`, {
                params: {
                    email: email,
                }
            });

            setContest(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getContests();
    }, []);

    return (
        <>
            <Header/>
            <Offcanvas/>
            <PageBannerStart name="Coding Contests"/>
            <div className="section section-padding">
                <div className="container">
                    <div className='row'>
                        {contest.map((contest, index) => {
                            return (
                                <div className="col-lg-12" style={{margin: '1%'}} key={contest.id}>
                                    <div className="card"
                                         style={{boxShadow: '0 4px 10px rgba(0,0,0,0.16), 0 4px 10px rgba(0,0,0,0.23)'}}>
                                        <div className="single-course-list p-4" style={{
                                            minHeight: '0',
                                        }}>
                                            <div className="course-content">
                                                <div className="top-meta">
                                                    <a className="tag" href="#">
                                                        {contest.title.toUpperCase()}
                                                    </a>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h3 className="title">
                                                        <Link
                                                            to={`/contests/${contest.slug}`}>{contest.title.toUpperCase()}</Link>
                                                    </h3>

                                                    <a className="btn btn-outline-primary">
                                                    <Link
                                                        className="text-black"
                                                        to={`/contests/${contest.slug}`}>Join It Now!</Link>
                                                    </a>
                                                </div>
                                                <span
                                                    dangerouslySetInnerHTML={{__html: '' + '....'}}>
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