const QuizQuestionForm = (props) => {
    const {quizQuestionForm,quizs,courseQuestions} = props

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title"> Quiz Question</h4>
                </div>
                <div className="card-body">
                    <form className="row g-3 needs-validation" noValidate onSubmit={quizQuestionForm.handleSubmit}>
                        <div className="col-md-12">
                            <label htmlFor="quiz_id" className="form-label">Quiz</label>
                            <select
                                className="form-control"
                                id="quiz_id"
                                name="quiz_id"
                                onChange={quizQuestionForm.handleChange}
                                onBlur={quizQuestionForm.handleBlur}
                                value={quizQuestionForm.values.quiz_id}
                            >
                                <option value="">Select</option>
                                {quizs.map(({ id, QuizTitle }, index) => <option value={id} key={index}>{QuizTitle}</option>)}
                            </select>
                            <div className="text-danger">
                                {
                                    quizQuestionForm.touched.quiz_id &&
                                    quizQuestionForm.errors.quiz_id &&
                                    (<div>{quizQuestionForm.errors.quiz_id}</div>)
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="question_id" className="form-label">Course Question</label>
                            <select
                                className="form-control"
                                id="question_id"
                                name="question_id"
                                onChange={quizQuestionForm.handleChange}
                                onBlur={quizQuestionForm.handleBlur}
                                value={quizQuestionForm.values.question_id}
                            >
                                <option value="">Select</option>
                                {courseQuestions.map(({ id, question }, index) => <option value={id} key={index}>{question}</option>)}
                            </select>
                            <div className="text-danger">
                                {
                                    quizQuestionForm.touched.question_id &&
                                    quizQuestionForm.errors.question_id &&
                                    (<div>{quizQuestionForm.errors.question_id}</div>)
                                }
                            </div>
                        </div>

                        <div className="col-12">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default QuizQuestionForm;