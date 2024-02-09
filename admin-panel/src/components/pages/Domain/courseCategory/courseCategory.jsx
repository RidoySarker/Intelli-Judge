import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from "../../../../interceptors/http";
import CourseCategoryList from "./courseCategoryList";
import CourseCategoryForm from "./courseCategoryForm";

const CourseCategory = () => {

    const courseCategoryForm = useFormik({

        initialValues : {
            name : '',
            status : '',
            courseImage: ''
            
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name Is Required'),
            status: Yup.string().required('Status Is Required'),
            courseImage: Yup.mixed().required('File Is Required'),
        }),
        onSubmit: (values, {resetForm}) => {    
            values['status'] = values['status'] === "1";
            http.post(`/course-categories`, values,{ 
                headers: {
                "Content-Type": "multipart/form-data"},
            })
            .then(() => {
                    toast.success("Course Category Added Successfully");
                    resetForm({values: ''});
                    window.location.reload()
                })
                .catch(({error}) => {

                });
        },
    });

    const [courseCategories, setCourseCategories] = useState([]);

    const getCourseCategories = async () => {
        try {
            const {data:data} = await http.get(`/course-categories`)
            setCourseCategories(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const editCategory = async (id) => {
        try {
            const {data:data} = await http.get(`/course-categories/${id}`)
            this.courseCategoryForm.name = data.data.name;
            this.courseCategoryForm.status = data.data.status;
        } catch (error) {
            console.log(error)
        }
    }
    const deleteCategory = async (id) => {
        try {
            await http.delete(`/course-categories/${id}`);
            toast.success("Category Deleted Successfully");
            return getCourseCategories();
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getCourseCategories();
    }, []);

    return (
        <>
            <div className="row mt-5">
                <ToastContainer/>
                <div className="col-lg-4">
                <CourseCategoryForm courseCategoryForm={courseCategoryForm} />
                </div>
                <div className="col-lg-8">
                    <CourseCategoryList courseCategories={courseCategories} editCategory={editCategory}   deleteCategory={deleteCategory}/>
                </div>
            </div>
        </>
    );
}

export default CourseCategory;