const instructorForm = (props) => {
    const {instructorForm} = props
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Course Category</h4>
                </div>
                <div className="card-body">
                    <form className="row g-3 needs-validation" noValidate onSubmit={instructorForm.handleSubmit}>
                        <div className="col-md-12">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text"
                                   className="form-control"
                                   id="name"
                                   name="name"
                                   onChange={instructorForm.handleChange}
                                   onBlur={instructorForm.handleBlur}
                                   value={instructorForm.values.name}
                            />
                            <div className="text-danger">
                                {
                                    instructorForm.touched.name &&
                                    instructorForm.errors.name &&
                                    (<div>{instructorForm.errors.name}</div>)
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input type="file"
                                   className="form-control"
                                   id="image"
                                   onChange={event => {
                                       instructorForm.setFieldValue('image', event.currentTarget.files[0]);
                                   }}
                                   onBlur={instructorForm.handleBlur}
                            />

                            <div className="text-danger">
                                {
                                    instructorForm.touched.image &&
                                    instructorForm.errors.image &&
                                    (<div>{instructorForm.errors.image}</div>)
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

export default instructorForm;