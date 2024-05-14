import React from 'react'
import Header from '../Shared/Header'
import Offcanvas from '../Shared/Offcanvas'
import PageBannerStart from '../Component/Course/PageBannerStart'
import CourseList from '../Component/Course/CourseList'
import Footer from '../Shared/Footer'

export default function Course() {
  return (
    <>
      <Header />
      <Offcanvas />
      <PageBannerStart name="Courses" />
      <CourseList />
      <Footer />
    </>
  )
}