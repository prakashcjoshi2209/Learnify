import React from 'react'
import Navbar from './Navbar/page'
import Footer from './Footer/page'
import BenefitsSection from './BenifitsSection'
import PopularCourses from './PopularCourses'
import Consist from './Consist'
import dotenv from "dotenv";
import { auth } from '../../auth';
dotenv.config();

const page = async () => {
  const session = await auth();
  return (
    <div>
      <Navbar session = {session}/>
      <Consist/>
      <PopularCourses/>
      <BenefitsSection/>
      <Footer/>
    </div>
  )
}

export default page