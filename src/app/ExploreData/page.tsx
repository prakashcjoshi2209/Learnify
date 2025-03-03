import React from 'react'
import Courses from "@/app/ExploreData/Courses";
import dotenv from "dotenv";
import Navbar from '../../components/ui/Navbar';
import { auth } from '../../../auth';
dotenv.config();

const page = async () => {
  const session = await auth();
  return (
    <div>
      <Navbar session = {session}/>
      <Courses session={session} />
    </div>
  )
}

export default page