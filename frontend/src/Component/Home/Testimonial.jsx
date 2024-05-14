import React from 'react'

export default function Testimonial() {
    return (
        <>
            <div className="section">
                <div className="container">
                    {/* <!-- Testimonial Wrapper Start --> */}
                    <div className="testimonial-wrapper">

                        {/* <!-- Testimonial Author Start --> */}
                        <div className="testimonial-author">
                            {/* <!-- Testimonial Author Wrapper Start --> */}
                            <div className="testimonial-author-wrapper">
                                <div className="testimonial-quote">
                                    <i className="flaticon-left-quotes-sign"></i>
                                </div>
                                <div className="author-images-wrapper author-images-active">
                                    <div className="swiper-container">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide author-image">
                                                <img src="assets/images/author-1.jpg" alt="Author" />
                                            </div>
                                            <div className="swiper-slide author-image">
                                                <img src="assets/images/author-2.jpg" alt="Author" />
                                            </div>
                                            <div className="swiper-slide author-image">
                                                <img src="assets/images/author-3.jpg" alt="Author" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Testimonial Author Wrapper End --> */}
                        </div>
                        {/* <!-- Testimonial Author End --> */}

                        {/* <!-- Testimonial Content Start --> */}
                        <div className="testimonial-content testimonial-content-active">
                            <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide single-testimonial-content">
                                        <p>World-className training and development programs developed by top teachers Connect Fellow to the tools you love to make your meeting, management, and productivity workflows even better.</p>
                                        <h5 className="name">Martney Holder</h5>
                                        <span className="designation">IT Specailist</span>
                                    </div>
                                    <div className="swiper-slide single-testimonial-content">
                                        <p>World-className training and development programs developed by top teachers Connect Fellow to the tools you love to make your meeting, management, and productivity workflows even better.</p>
                                        <h5 className="name">Andrew paker</h5>
                                        <span className="designation">IT Specailist</span>
                                    </div>
                                    <div className="swiper-slide single-testimonial-content">
                                        <p>World-className training and development programs developed by top teachers Connect Fellow to the tools you love to make your meeting, management, and productivity workflows even better.</p>
                                        <h5 className="name">Martney paker</h5>
                                        <span className="designation">IT Specailist</span>
                                    </div>
                                </div>

                                <div className="swiper-pagination"></div>
                            </div>
                        </div>
                        {/* <!-- Testimonial Content End --> */}

                    </div>
                    {/* <!-- Testimonial Wrapper End --> */}
                </div>
            </div>
        </>
    )
}
