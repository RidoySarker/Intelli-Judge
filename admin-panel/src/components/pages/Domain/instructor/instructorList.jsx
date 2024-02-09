const instructorList = (props) => {
    const {courseInstructors, editInstructor,deleteCourseInstructors} = props;

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Course Instructor</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table mb-0 table-centered">
                            <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Name</th>
                                <th className="text-end">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {courseInstructors && courseInstructors.map((instructor, index) => {
                                return (<tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{instructor.name}</td>
                                        <td className="text-end">
                                            <button onClick={() => editInstructor(instructor.id)}
                                                    className="btn btn-de-dashed-info">
                                                <i className="fa fa-edit"></i>
                                            </button>

                                            <button onClick={()=>deleteCourseInstructors(instructor.id)} className="btn btn-de-dashed-danger">
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

export default instructorList;