import { Link } from "react-router-dom";

const ContestList = () => {
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

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContestList;