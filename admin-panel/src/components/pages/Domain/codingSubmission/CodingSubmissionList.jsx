import { useEffect, useState } from "react";
import http from "../../../../interceptors/http";
import { Link } from "react-router-dom";

const CodingSubmissionList = () => {
    const [submissions, setSubmissions] = useState([]);

    const getSubmissions = async () => {
        try {
            const {data: data} = await http.get(`frontend/fetch-all-submissions`);
            setSubmissions(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSubmissions();
    }, []);

    return (
        <>
            <div className="row mt-5">
                <div className="card mt-2">
                    <div className="card-header">
                        <h4 className="card-title">Coding Submissions List</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table mb-0 table-centered">
                                <thead>
                                <tr>
                                    <th>Sl No</th>
                                    <th>User Name</th>
                                    <th>Question</th>
                                    <th>Question Type</th>
                                    <th>Question Level</th>
                                    <th>Date</th>
                                    <th>Run Time</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {submissions && submissions.map((submission, index) => {
                                    return (<tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{submission?.user?.firstName} {submission?.user?.lastName}</td>
                                            <td>{submission.question.title.toUpperCase()}</td>
                                            <td>{submission.question.question_type.toUpperCase()}</td>
                                            <td>{submission.question.level.toUpperCase()}</td>
                                            <td>{new Date(submission.createdAt).toLocaleString('en-US')}</td>
                                            <td>{submission.run_time} MS</td>
                                            <td>
                                                <a className="btn btn-outline-primary">
                                                    <Link
                                                        className={`text-${submission.status === 'pass' ? 'success' : 'danger'}`}
                                                        to={`#`}>{submission.status === 'pass' ? 'Accepted !' : 'Wrong !'}</Link>
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CodingSubmissionList;