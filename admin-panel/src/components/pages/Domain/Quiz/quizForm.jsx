const QuizForm = (props) => {
  const {quizForm} = props;
  return (
      <>
          <div className="card">
              <div className="card-header">
                  <h4 className="card-title">Quiz</h4>
              </div>
              <div className="card-body">
                  <form className="row g-3 needs-validation" noValidate onSubmit={quizForm.handleSubmit}>
                      <div className="col-md-12">
                          <label htmlFor="quiz_title" className="form-label">Title</label>
                          <input type="text"
                                 className="form-control"
                                 id="quiz_title"
                                 name="quiz_title"
                                 onChange={quizForm.handleChange}
                                 onBlur={quizForm.handleBlur}
                                 value={quizForm.values.quiz_title}
                          />
                          <div className="text-danger">
                              {
                                  quizForm.touched.quiz_title &&
                                  quizForm.errors.quiz_title &&
                                  (<div>{quizForm.errors.quiz_title}</div>)
                              }
                          </div>
                      </div>

                      <div className="col-md-12">
                          <label htmlFor="marks" className="form-label">Marks</label>
                          <input type="number"
                                 className="form-control"
                                 id="marks"
                                 name="marks"
                                 onChange={quizForm.handleChange}
                                 onBlur={quizForm.handleBlur}
                                 value={quizForm.values.marks}
                          />
                          <div className="text-danger">
                              {
                                  quizForm.touched.marks &&
                                  quizForm.errors.marks &&
                                  (<div>{quizForm.errors.marks}</div>)
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

export default QuizForm;