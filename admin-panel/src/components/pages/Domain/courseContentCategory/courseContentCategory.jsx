import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from "../../../../interceptors/http";
import CourseContentCategoryForm from "./courseContentCategoryForm";
import CourseContentCategoryList from "./courseContentCategoryList";

const CourseContentCategory = () => {

    const courseContentCategoryForm = useFormik({

        initialValues : {
            course_id : '',
            content_category_title : '',
            Image: ''
        },
        validationSchema: Yup.object({
            course_id: Yup.string().required('Course Is Required'),
            content_category_title: Yup.string().required('Title Is Required'),
            Image: Yup.mixed().required('File Is Required')
        }),
        onSubmit: (values, {resetForm}) => {

            http.post(`/course-content-category`, values,{ 
                headers: {
                "Content-Type": "multipart/form-data"},
            }).then(() => {
                    toast.success("Course Content Category Added Successfully");
                    resetForm({values: ''});
                    window.location.reload();
                })
                .catch(({error}) => {
                    console.log(error)
                });
        },
    });

    const [courses, setCourses] = useState([]);
    const [courseContentCategories, setCourseContentCategories] = useState([]);

    const getCourseContentCategories = async () => {
        try {
            const {data:data} = await http.get(`/course-content-category`)
            setCourseContentCategories(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getCourses = async () => {
        try {
            const {data:data} = await http.get(`/fetch-courses`)
            setCourses(data);
        } catch (error) {
            console.log(error)
        }
    }

    const editCourseContent = async (id) => {
        try{

        } catch (error) {

        }
    }
    const deleteCourseCategory = async (id) => {
        try {
            await http.delete(`/course-content-category/${id}`);
            toast.success("Course Chapter Deleted Successfully");
            return getCourseContentCategories();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourses();
        getCourseContentCategories();
    },[])

    return (
        <>
            <div className="row mt-5">
                <ToastContainer/>
                <div className="col-lg-4">
                    <CourseContentCategoryForm courseContentCategoryForm={courseContentCategoryForm} courses={courses} />
                </div>
                <div className="col-lg-8">
                    <CourseContentCategoryList courseContentCategories={courseContentCategories} editCourseContent={editCourseContent} deleteCourseCategory={deleteCourseCategory} />
                </div>
            </div>
        </>
    );

}

export default CourseContentCategory;