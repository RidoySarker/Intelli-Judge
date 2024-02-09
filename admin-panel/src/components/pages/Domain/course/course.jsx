import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from "../../../../interceptors/http";
import CourseForm from "./courseForm";
import CourseList from "./courseList";

const Course = () => {

    const [courseCategories, setCourseCategories] = useState([]);
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const {data:data} = await http.get(`/courses`)
            setCourses(data.data);
        } catch (error) {
            console.log(error)
        }
    }
    
    const editCourse = async (id) => {
        try {
            
        } catch (exception) {
            
        }
    }
    const deleteCourse = async (id) => {
        try {
            await http.delete(`/courses/${id}`);
            toast.success("Course Deleted Successfully");
            return getCourses();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourses();
    }, []);

  return (
      <>
          <div className="row mt-5">
              <ToastContainer/>
              <div className="col-lg-12">
                    <CourseList courses={courses} editCourse={editCourse} deleteCourse={deleteCourse}/>
              </div>
          </div>
      </>
  );
}
export default Course;