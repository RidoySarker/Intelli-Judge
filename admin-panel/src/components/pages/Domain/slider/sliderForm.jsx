const sliderForm = (props) => {
    const {sliderForm} = props
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Course Category</h4>
                </div>
                <div className="card-body">
                    <form className="row g-3 needs-validation" noValidate onSubmit={sliderForm.handleSubmit}>
                        <div className="col-md-12">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input type="file"
                                   className="form-control"
                                   id="image"
                                   onChange={event => {
                                       sliderForm.setFieldValue('image', event.currentTarget.files[0]);
                                   }}
                                   onBlur={sliderForm.handleBlur}
                            />

                            <div className="text-danger">
                                {
                                    sliderForm.touched.image &&
                                    sliderForm.errors.image &&
                                    (<div>{sliderForm.errors.image}</div>)
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

export default sliderForm;