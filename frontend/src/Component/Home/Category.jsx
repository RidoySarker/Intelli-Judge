import React, {useEffect, useState} from 'react'
import http from "../../interceptors/http";
import {HOST} from "../../constants/app";
import {Link} from "react-router-dom";

export default function Category() {
    const [categories, setCourseCategory] = useState([]);

    const getCourseCategories = async () => {
        try {
            const {data: data} = await http.get(`/frontend/fetch-course-category`);
            setCourseCategory(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourseCategories();
    }, []);
    
  return (
    <>
        {/* <!-- Top Category End --> */}
        <div className="section section-padding bg-color-1">
            <div className="container">

                {/* <!-- Section Title Start --> */}
                <div className="section-title text-center">
                    <h2 className="title"><span>Top categories</span> you can enroll now</h2>
                </div>
                {/* <!-- Section Title End --> */}

                {/* <!-- Category Wrapper Start --> */}
                <div className="category-wrapper">
                    <div className="row">
                        {categories && categories.map(function (category){
                           return (
                               <div className="col-lg-4 col-sm-6">
                                   {/* <!-- Single Category Start --> */}
                                   <div className="single-category">
                                       <div className="category-image">
                                           <Link to="/"><img style={{height:'180px'}} src={`${HOST}${category.courseImage}`} alt="Category"/></Link>
                                       </div>
                                       <div className="category-content">
                                           <div className="category-title">
                                               <h4 className="title"><Link to="/">{category.name}</Link></h4>
                                               <p>{category.Course.length}</p>
                                           </div>
                                           <Link to="/" className="category-link">
                                               <i className="fa fa-long-arrow-right"></i>
                                           </Link>
                                       </div>
                                   </div>
                                   {/* <!-- Single Category End --> */}
                               </div>
                           );
                        })}
                    </div>
                </div>
                {/* <!-- Category Wrapper End --> */}

            </div>
        </div>
        {/* <!-- Top Category End --> */}
    </>
  )
}
