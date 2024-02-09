import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import http from "../../../../interceptors/http";
const CodingChallengeList = () => {


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
            <div className="row mt-5">
                <div className="">
                    <a className="btn  btn-primary">
                        <Link className="text-white" to="/coding-challenge">Add New Coding Challenge </Link>
                    </a>
                </div>
                <div className="card mt-2">
                    <div className="card-header">
                        <h4 className="card-title">Coding Challenge List</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table mb-0 table-centered">
                                <thead>
                                <tr>
                                    <th>Sl No</th>
                                    <th>Title</th>
                                    <th>Level</th>
                                    <th>Type</th>
                                </tr>
                                </thead>
                                <tbody>
                                {problems && problems.map((challenge, index) => {
                                    return (<tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{challenge.title}</td>
                                            <td><span class="badge bg-secondary">{challenge.level.toUpperCase()}</span></td>
                                            <td><span class="badge bg-primary">{challenge.question_type.toUpperCase()}</span></td>
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

export default CodingChallengeList;