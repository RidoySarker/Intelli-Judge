import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from "../../../../interceptors/http";
import SliderForm from "./sliderForm";
import SliderList from "./sliderList";

const Slider = () => {
    const sliderForm = useFormik({
        initialValues: {
            image: ''

        },
        validationSchema: Yup.object({
            image: Yup.mixed().required('File Is Required'),
        }),
        onSubmit: (values, {resetForm}) => {
            http.post(`/slider`, values, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }).then(() => {
                toast.success("Slider Added Successfully");
                resetForm({values: ''});
                window.location.reload()
            }).catch(({error}) => {
                console.log(error)
            });
        },
    });

    const [sliders, setSliders] = useState([]);

    const getSliders = async () => {
        try {
            const {data:data} = await http.get(`/slider`)
            setSliders(data.data);
        } catch (error) {
            console.log(error)
        }
    }
    const deleteSliders = async (id) => {
        try {
            await http.delete(`/slider/${id}`);
            toast.success("Slider Deleted Successfully");
            return getSliders();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSliders();
    }, []);

    return (
        <>
            <div className="row mt-5">
                <ToastContainer/>
                <div className="col-lg-4">
                    <SliderForm sliderForm={sliderForm} />
                </div>
                <div className="col-lg-8">
                    <SliderList sliders={sliders}  deleteSliders={deleteSliders} />
                </div>
            </div>
        </>
    );
}

export default Slider;