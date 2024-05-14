import React from 'react'

export default function Counter() {
    return (
        <>
            <div className="section section-padding">
                <div className="container">
                    {/* <!-- Section Title Start --> */}
                    <div className="section-title text-center">
                        <h2 className="title"><span>Top Rated</span> Learning Tutorials</h2>
                    </div>
                    {/* <!-- Section Title End -->

                <!-- Courses Wrapper Start --> */}
                    <div className="courses-wrapper">

                        {/* <!-- Courses Tab Start --> */}
                        <div className="courses-tab">

                            <div className="tab-menu">
                                <ul className="nav justify-content-center">
                                    <li><button className="active" data-bs-toggle="tab" data-bs-target="#tab1">Javascript</button></li>
                                    <li><button data-bs-toggle="tab" data-bs-target="#tab2">Python</button></li>
                                    <li><button data-bs-toggle="tab" data-bs-target="#tab3">Web Development</button></li>
                                    <li><button data-bs-toggle="tab" data-bs-target="#tab4">Art & Design</button></li>
                                    <li><button data-bs-toggle="tab" data-bs-target="#tab5">Business</button></li>
                                </ul>
                            </div>

                            {/* <!-- Courses Tab Content Start --> */}
                            <div className="tab-content courses-tab-content">
                                <div className="tab-pane active" id="tab1">

                                    <div className="row">
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html">
                                                        <img src="assets/images/courses/courses-1.jpg" alt="Courses" />
                                                    </a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html">
                                                        <img src="assets/images/courses/courses-2.jpg" alt="Courses" />
                                                    </a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html">
                                                        <img src="assets/images/courses/courses-3.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html">
                                                        <img src="assets/images/courses/courses-4.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane" id="tab2">

                                    <div className="row">
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html">
                                                        <img src="assets/images/courses/courses-1.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html">
                                                        <img src="assets/images/courses/courses-2.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-3.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-4.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane" id="tab3">

                                    <div className="row">
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-1.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-2.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-3.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-4.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane" id="tab4">

                                    <div className="row">
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-1.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-2.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-3.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-4.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane" id="tab5">

                                    <div className="row">
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-1.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-2.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-3.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%;' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                        <div className="col-lg-3 col-sm-6">
                                            {/* <!-- Single Courses Start --> */}
                                            <div className="single-course">
                                                <div className="courses-image">
                                                    <a href="course-details.html"><img src="assets/images/courses/courses-4.jpg" alt="Courses" /></a>
                                                </div>
                                                <div className="courses-content">
                                                    <div className="top-meta">
                                                        <a className="tag" href=".">Beginner</a>
                                                        <span className="price">
                                                            <span className="sale-price">Free</span>
                                                        </span>
                                                    </div>
                                                    <h3 className="title"><a href="course-details.html">Design 101: Product & Web Design Course</a></h3>
                                                    <p className="author-name">Andrew paker</p>
                                                </div>
                                                <div className="courses-meta">
                                                    <p className="student"><i className="fa fa-user-o"></i> Student</p>
                                                    <div className="rating">
                                                        <div className="rating-star">
                                                            <div className="rating-active" style={{ width: '60%' }}></div>
                                                        </div>
                                                        <span>(4.5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- Single Courses End --> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* <!-- Courses Tab Content End --> */}

                        </div>
                        {/* <!-- Courses Tab End --> */}

                        <div className="courses-more text-center">

                            <img className="shape-1" src="assets/images/shape/shape-8.png" alt="Shape" />
                            <img className="shape-2" src="assets/images/shape/shape-9.png" alt="Shape" />

                            <p><strong>23,000+</strong> more skillful courses you can explore</p>
                            <a href="." className="btn btn-primary btn-hover-heading-color">Explore All Courses</a>
                        </div>

                    </div>
                    {/* <!-- Courses Wrapper End --> */}
                </div>
            </div>
        </>
    )
}
