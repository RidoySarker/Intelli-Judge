const CourseContentCategoryForm = (props) => {
    const {courseContentCategoryForm,courses} = props;
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Course Chapter</h4>
                </div>
                <div className="card-body">
                    <form className="row g-3 needs-validation" noValidate onSubmit={courseContentCategoryForm.handleSubmit}>

                        <div className="col-md-12">
                            <label htmlFor="course_id" className="form-label">Course</label>
                            <select
                                className="form-control"
                                id="course_id"
                                name="course_id"
                                onChange={courseContentCategoryForm.handleChange}
                                onBlur={courseContentCategoryForm.handleBlur}
                                value={courseContentCategoryForm.values.course_id}
                            >
                                <option value="">Select</option>
                                {courses.map(({id,name}, index) => <option value={id} key={index}>{name}</option>)}
                            </select>
                            <div className="text-danger">
                                {
                                    courseContentCategoryForm.touched.status &&
                                    courseContentCategoryForm.errors.course_id &&
                                    (<div>{courseContentCategoryForm.errors.course_id}</div>)
                                }
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="content_category_title" className="form-label">Title</label>
                            <input type="text"
                                   className="form-control"
                                   id="content_category_title"
                                   name="content_category_title"
                                   onChange={courseContentCategoryForm.handleChange}
                                   onBlur={courseContentCategoryForm.handleBlur}
                                   value={courseContentCategoryForm.values.content_category_title}
                            />
                            <div className="text-danger">
                                {
                                    courseContentCategoryForm.touched.content_category_title &&
                                    courseContentCategoryForm.errors.content_category_title &&
                                    (<div>{courseContentCategoryForm.errors.content_category_title}</div>)
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="courseImage" className="form-label">Image</label>
                          <input type="file"
                                 className="form-control"
                                 id="courseImage"
                                 onChange={event => {
                                    courseContentCategoryForm.setFieldValue('Image', event.currentTarget.files[0]);
                                }}
                                 onBlur={courseContentCategoryForm.handleBlur}
                          />
                          
                          <div className="text-danger">
                              {
                                  courseContentCategoryForm.touched.Image &&
                                  courseContentCategoryForm.errors.Image &&
                                  (<div>{courseContentCategoryForm.errors.Image}</div>)
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

export default CourseContentCategoryForm;