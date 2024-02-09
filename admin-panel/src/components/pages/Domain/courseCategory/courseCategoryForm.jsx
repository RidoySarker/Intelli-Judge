const courseCategoryForm = (props) => {
    const {courseCategoryForm} = props;

  return (
      <>
          <div className="card">
              <div className="card-header">
                  <h4 className="card-title">Course Category</h4>
              </div>
              <div className="card-body">
                  <form className="row g-3 needs-validation" noValidate onSubmit={courseCategoryForm.handleSubmit}>
                      <div className="col-md-12">
                          <label htmlFor="name" className="form-label">Name</label>
                          <input type="text"
                                 className="form-control"
                                 id="name"
                                 name="name"
                                 onChange={courseCategoryForm.handleChange}
                                 onBlur={courseCategoryForm.handleBlur}
                                 value={courseCategoryForm.values.name}
                          />
                          <div className="text-danger">
                              {
                                  courseCategoryForm.touched.name &&
                                  courseCategoryForm.errors.name &&
                                  (<div>{courseCategoryForm.errors.name}</div>)
                              }
                          </div>
                      </div>
                      <div className="col-md-12">
                          <label htmlFor="status" className="form-label">Status</label>
                          <select
                              className="form-control"
                              id="status"
                              name="status"
                              onChange={courseCategoryForm.handleChange}
                              onBlur={courseCategoryForm.handleBlur}
                              value={courseCategoryForm.values.status}
                              >
                             <option value="">Select</option>
                             <option value={1}>Active</option>
                             <option value={0}>In Active</option>
                          </select>
                          <div className="text-danger">
                              {
                                  courseCategoryForm.touched.status &&
                                  courseCategoryForm.errors.status &&
                                  (<div>{courseCategoryForm.errors.status}</div>)
                              }
                          </div>
                      </div>
                      <div className="col-md-12">
                          <label htmlFor="courseImage" className="form-label">Image</label>
                          <input type="file"
                                 className="form-control"
                                 id="courseImage"
                                 onChange={event => {
                                    courseCategoryForm.setFieldValue('courseImage', event.currentTarget.files[0]);
                                }}
                                 onBlur={courseCategoryForm.handleBlur}
                          />
                          
                          <div className="text-danger">
                              {
                                  courseCategoryForm.touched.courseImage &&
                                  courseCategoryForm.errors.courseImage &&
                                  (<div>{courseCategoryForm.errors.courseImage}</div>)
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

export default courseCategoryForm;