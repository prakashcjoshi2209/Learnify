// import Navbar from '@/components/ui/Navbar'
// import React from 'react'
// import { auth } from '../../../auth';
// import CartData from './CartData';
// import Footer from '../Footer/page';


// const page = async () => {
//     const session = await auth();
//     return (
//       <div>
//         <Navbar session = {session}/>
//         <CartData/>
//         <Footer/>
//       </div>
//     )
//   }

// export default page

import React from 'react'
import CartData from './CartData'
import Footer from '../Footer/page'


const page = () => {
  return (
    <div>
        
        <CartData/>
        <Footer/>
    </div>
  )
}

export default page