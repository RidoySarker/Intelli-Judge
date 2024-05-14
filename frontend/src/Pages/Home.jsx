import React from 'react'
import Header from '../Shared/Header'
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Preloader from '../Shared/Preloader'
import Offcanvas from '../Shared/Offcanvas'
import Slider from '../Component/Home/Slider'
import Counter from '../Component/Home/Counter'
import Course from '../Component/Home/Course'
import Category from '../Component/Home/Category'
import Testimonial from '../Component/Home/Testimonial'
import Brand from '../Component/Home/Brand'
import Blog from '../Component/Home/Blog'
import Action from '../Component/Home/Action'
import Footer from '../Shared/Footer'

export default function Home() {
    return (
        <>
            {/* <Preloader /> */}
            <Header />
            <Offcanvas />
            <Slider />
            {/*<Counter />*/}
            <Course />
            <Category />
            {/*<Testimonial />*/}
            {/*<Brand />*/}
            <Blog />
            {/*<Action />*/}
            <Footer />
        </>
    )
}
