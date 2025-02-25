

import React from 'react'
import CartData from './CartData'
import Footer from '../Footer/page'
import Navbar from '@/components/ui/Navbar'


const page = () => {
  return (
    <div>
        <Navbar />
        <CartData/>
        <Footer/>
    </div>
  )
}

export default page