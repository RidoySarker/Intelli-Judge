import { Link } from "react-router-dom";

const ContestList = ({contests, deleteContest}) => {

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <Link to='/new-contest'>
                        <button className="btn btn-sm btn-success">New Contest</button>
                    </Link>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table mb-0 table-centered">
                            <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Access Code</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th className="text-end">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {contests && contests.map((contest,index) =>{
                                return (<tr key={index}>
                                        <td>{ index + 1 }</td>
                                        <td>{ contest.title }</td>
                                        <td>{ contest.slug }</td>
                                        <td>{ contest.accessCode }</td>
                                        <td>{ contest.startTime }</td>
                                        <td>{ contest.endTime }</td>
                                        <td className="text-end">
                                            {/*<button onClick={() => editCourse(contest.id)} className="btn btn-de-dashed-info">*/}
                                            {/*    <i className="fa fa-edit"></i>*/}
                                            {/*</button>*/}

                                            <button className="btn btn-de-dashed-danger" onClick={() => deleteContest(contest.id)}>
                                                <i className="fa fa-times"></i>
                                            </button>

                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContestList;