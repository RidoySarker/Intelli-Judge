import Header from "../Shared/Header";
import Offcanvas from "../Shared/Offcanvas";
import React, { useEffect, useState } from "react";
import http from "../interceptors/http";
import { Link } from "react-router-dom";
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

export default function Contests() {
    const [contest, setContest] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState("");
    const [selectedSlug, setSelectedSlug] = useState("");
    const [selectedCode, setSelectedCode] = useState("");

    const openModal = (slug, accessCode) => {
        setIsOpen(true);
        setSelectedSlug(slug);
        setSelectedCode(accessCode);
    }

    const closeModal = () => {
        setIsOpen(false);
        setSelectedSlug("");
        setSelectedCode("");
    }

    const getContests = async () => {
        try {
            const {data: data} = await http.get(`frontend/fetch-contests`);
            setContest(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const enterContest = (event) => {
        event.preventDefault();

        if (code === selectedCode) {
            window.location = `/contests/${selectedSlug}`;
        } else {
            setIsOpen(false);
            setSelectedSlug("");
            setSelectedCode("");
            toast.warning('Access code invalid!');
        }
    }

    useEffect(() => {
        getContests();
    }, []);

    return (
        <>
            <Header/>
            <Offcanvas/>
            <ToastContainer/>
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
                                                        <div
                                                            onClick={() => openModal(contest.slug, contest.accessCode)}
                                                            className="text-black">Join It Now!
                                                        </div>
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

                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <h2>Enter Access Code</h2>
                    </div>
                    <form onSubmit={enterContest}>
                        <div class="row">
                            <div class="col-md-12">
                                <input
                                    type="test"
                                    className="form-control form-control-sm"
                                    placeholder="Enter contest access code..."
                                    onChange={(e) => setCode(e?.target?.value)}
                                />
                            </div>
                            <div class="col-md-12 text-end">
                                <button type="submit" className="btn text-success">Submit</button>
                                <button type="button" className="btn text-danger" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    )
}