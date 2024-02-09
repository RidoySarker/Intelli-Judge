import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from "../../../../interceptors/http";
import CourseContentForm from "./courseContentForm";
import CourseContentList from "./courseContentList";

const CourseContent = () => {

    const [courseContents, setCourseContents] = useState([]);

    const getCourseContents = async () => {
        try {
            const {data:data} = await http.get(`/course-content`)
            setCourseContents(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const editCourseContent = async () => {
      try {

      } catch (exception) {

      }
    }
    const deleteCourseContent = async (id) => {
        try {
            await http.delete(`/course-content/${id}`);
            toast.success("Course Content Deleted Successfully");
            return getCourseContents();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourseContents();
    }, []);

  return (
      <>
          <div className="row mt-5">
              <ToastContainer/>
              {/*<div className="col-lg-4">*/}
              {/*    <CourseContentForm courseContentForm={courseContentForm} courseContentCategories={courseContentCategories} courses={courses} />*/}
              {/*</div>*/}
              <div className="col-lg-12">
                  <CourseContentList courseContents={courseContents} editCourseContent={editCourseContent}  deleteCourseContent={deleteCourseContent} />
              </div>
          </div>
      </>
  );
}

export default CourseContent;