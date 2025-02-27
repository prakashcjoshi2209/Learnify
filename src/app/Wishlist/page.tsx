
import React from 'react'
import WishlistData from './WishlistData'
import Footer from '../Footer/page'
import Navbar from '@/components/ui/Navbar'
import { auth } from '../../../auth'


const page = async () => {
  const session = await auth();
  return (
    <div>
        <Navbar session={session} />
        <WishlistData/>
        <Footer/>
    </div>
  )
}

export default page