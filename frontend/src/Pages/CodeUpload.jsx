import Header from "../Shared/Header";
import Offcanvas from "../Shared/Offcanvas";
import React, {useEffect, useState} from "react";
import http from "../interceptors/http";
import {Link} from "react-router-dom";
import PageBannerStart from "../Component/Course/PageBannerStart";
import CodeUpload from "../Component/Contribute/CodeUpload";

export default function SolveProblem() {
    const [problems, setProblems] = useState([]);
    const email = localStorage.getItem('userEmail');

    useEffect(() => {

    }, []);

    return (
        <>
            <Header/>
            <Offcanvas/>
            <PageBannerStart name="Contribute Problem"/>
            <div className="section section-padding">
                <div className="container">
                    <div className='row'>
                        <div class="d-flex justify-content-end">
                            <a className="btn btn-outline-warning" style={{marginLeft: '13px'}}>
                                <Link
                                    className="text-black"
                                    to={`/contribute`}>Back &nbsp; <i
                                    className="fa fa-arrow-left"></i></Link>
                            </a>

                        </div>
                        <CodeUpload></CodeUpload>
                    </div>
                </div>
            </div>

        </>
    )
}