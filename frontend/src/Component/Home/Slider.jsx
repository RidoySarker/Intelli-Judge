import React, {useEffect, useState} from 'react'
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Link} from "react-router-dom";
import http from "../../interceptors/http";
import {HOST} from "../../constants/app";

export default function Slider() {
    const [sliders, setSlider] = useState([]);
    const [startSlide, setStartSlide] = useState(false);

    const getSliders = async () => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-sliders`);
            setSlider(data.data);
            setStartSlide(true);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (startSlide) {
            setStartSlide(false);
        }
    }, [startSlide]);

    useEffect(() => {
        getSliders();
    }, []);


    return (
        <>
            <div class="slider-section section">

                <div className="slider-section section bg-color-2">
                    <div className="container">
                        <div className="row justify-content-center align-items-center mt-2">
                            <div className="col-md-6">
                                <div className="slider-content">
                                    <h2 className="title">Experience a problem solving platform that take you next level</h2>
                                    <p>Most interviewed problems and career paths developed by top programmers</p>
                                    <Link to="/solve-problem" className="btn btn-primary btn-hover-heading-color">Explore All
                                        Problems</Link>
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-8">
                                <div className="slider-images-02">
                                    {!startSlide && (
                                        <Carousel
                                            showThumbs={false}
                                            autoPlay={true}
                                            infiniteLoop={true}
                                            interval={3000}
                                            showArrows={false}
                                        >
                                            {sliders && sliders.map(function (slider) {
                                                return (
                                                    <div>
                                                        <img height={400} style={{width: 'fit-content'}} alt=""
                                                             src={`${HOST}${slider.image}`}/>
                                                    </div>
                                                );
                                            })}
                                        </Carousel>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
