const QuizQuestionList = (props) => {
    const {quizQuestions,editQuizQuestion, deleteQuizQuestions} = props;
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Quiz Course List</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table mb-0 table-centered">
                            <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Quiz</th>
                                <th>Course Question</th>
                                <th className="text-end">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {quizQuestions && quizQuestions.map((question,index) =>{
                                return (<tr key={index}>
                                        <td>{ index + 1 }</td>
                                        <td>{ question.quiz.QuizTitle }</td>
                                        <td>{ question.courseQuestion.question }</td>
                                        <td className="text-end">
                                            <button onClick={() => editQuizQuestion(question.id)} className="btn btn-de-dashed-info">
                                                <i className="fa fa-edit"></i>
                                            </button>

                                            <button onClick={()=> deleteQuizQuestions(question.id)} className="btn btn-de-dashed-danger">
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

export default QuizQuestionList;