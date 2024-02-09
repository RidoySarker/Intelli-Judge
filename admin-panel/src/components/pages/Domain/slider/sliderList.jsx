const sliderList = (props) => {
    const {sliders, editSlider, deleteSliders} = props;

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Slider</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table mb-0 table-centered">
                            <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Image</th>
                                <th className="text-end">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sliders && sliders.map((slider, index) => {
                                return (<tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{slider.image}</td>
                                        <td className="text-end">
                                            <button onClick={() => editSlider(slider.id)}
                                                    className="btn btn-de-dashed-info">
                                                <i className="fa fa-edit"></i>
                                            </button>

                                            <button onClick={()=> deleteSliders(slider.id)} className="btn btn-de-dashed-danger">
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

export default sliderList;