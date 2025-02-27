import React from 'react'
import Lecture from './Lecture'
import Footer from '../Footer/page'
import Navbar from '@/components/ui/Navbar'
import { auth } from '../../../auth'


const page = async () => {
  const session = await auth();
  return (
    <div>
        <Navbar session={session} />
        <Lecture/>
        <Footer/>
    </div>
  )
}

export default page