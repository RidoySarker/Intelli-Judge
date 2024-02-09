import {Link} from "react-router-dom";
import Modal from 'react-modal';
import {useState} from "react";
import http from "../../../../interceptors/http";
import parse from 'html-react-parser';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '55%',
        height: '80%'
    },
};

Modal.setAppElement('#root');


const CourseContentCategoryList = (props) => {
    const {courseContentCategories, editCourseContent, deleteCourseCategory} = props;

    const [modalIsOpen, setIsOpen] = useState(false);
    const [contentDetails, setContentDetails] = useState([]);

    function openModal(category) {
        console.log(category,'category')
        fetchContentDetails(category);
        setIsOpen(true);
    }

    const fetchContentDetails = async (category) => {
        try {
            const {data:data} = await http.get(`/fetch-content-details/${category.id}`);
            console.log(data.data,'data')
            setContentDetails(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Course Chapter List</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table mb-0 table-centered">
                            <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Course</th>
                                <th>Chapter Title</th>
                                <th className="text-end">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {courseContentCategories && courseContentCategories.map((category, index) => {
                                return (<tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{category.course.name}</td>
                                        <td>{category.contentCategoryTitle}</td>
                                        <td className="text-end">
                                            <Link to='/new-course-content'>
                                                <button title='New Content Details'
                                                        className="btn btn-de-dashed-primary">
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </Link>
                                            <button onClick={() => editCourseContent(category.id)}
                                                    className="btn btn-de-dashed-info">
                                                <i className="fa fa-edit"></i>
                                            </button>

                                            <button onClick={()=> deleteCourseCategory(category.id)} className="btn btn-de-dashed-danger">
                                                <i className="fa fa-times"></i>
                                            </button>

                                            <button onClick={() => openModal(category)} className="btn btn-de-dashed-info">
                                                <i className="fa fa-eye"></i>
                                            </button>

                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Content Details"
                >
                    <button className='btn btn-sm btn-warning' style={{ float:'right' }} onClick={closeModal}>close</button>


                    {contentDetails && contentDetails.map((detail) => {
                        return (
                            <div className="card" style={{ marginTop:'4%' }}>
                                <div className="card-header">
                                    <h3>{detail.contentTitle}</h3>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{ parse(detail.content) }</p>
                                </div>
                            </div>
                        );
                    })}
                </Modal>
            </div>


        </>
    );
}

export default CourseContentCategoryList;