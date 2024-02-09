const QuizList = (props) => {
  const {quizs,editQuiz, deleteQuizs} = props

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Course Quiz List</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table mb-0 table-centered">
                            <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Title</th>
                                <th>Marks</th>
                                <th className="text-end">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {quizs && quizs.map((quiz,index) =>{
                                return (<tr key={index}>
                                        <td>{ index + 1 }</td>
                                        <td>{ quiz.QuizTitle }</td>
                                        <td>{ quiz.marks }</td>
                                        <td className="text-end">
                                            <button onClick={() => editQuiz(quiz.id)} className="btn btn-de-dashed-info">
                                                <i className="fa fa-edit"></i>
                                            </button>

                                            <button onClick={()=> deleteQuizs(quiz.id)} className="btn btn-de-dashed-danger">
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

export default QuizList;