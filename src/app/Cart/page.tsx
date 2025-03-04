

import React from 'react'
import CartData from './CartData'
import Footer from '../Footer/page'
import Navbar from '@/components/ui/Navbar'
import { auth } from '../../../auth'


const page = async () => {
  const session = await auth();
  return (
    <div>
        <Navbar session={session} />
        <CartData session={session}/>
        <Footer/>
    </div>
  )
}

export default page