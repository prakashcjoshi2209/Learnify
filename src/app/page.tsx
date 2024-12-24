import React from 'react'
import Navbar from './Navbar/page'
import Footer from './Footer/page'
import BenefitsSection from './BenifitsSection'
import PopularCourses from './PopularCourses'
import Consist from './Consist'

const page = () => {
  return (
    <div>
      <Navbar/>
      <Consist/>
      <PopularCourses/>
      <BenefitsSection/>
      <Footer/>
    </div>
  )
}

export default page