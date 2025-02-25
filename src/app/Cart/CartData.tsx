


// "use client";

// import { useState } from "react";
// import { FaCartShopping } from "react-icons/fa6";
// import Card from "../ExploreData/Card"; 

// const initialCartItems = [
//   {
//     courseId: 1,
//     title: "React for Beginners",
//     image: "/consistiimage.png",
//     students: 1200,
//     price: 999,
//     originalPrice: 1999,
//     description: "Learn the basics of React.js with  projects.",
//     buttonLabel: "Enroll Now",
//     dateRange: "March 1 - April 15",
//   },
//   {
//     courseId: 2,
//     title: "Advanced TypeScript",
//     image: "/consistiimage.png",
//     students: 850,
//     price: 1299,
//     originalPrice: 2499,
//     description: "Master TypeScript with real-world applications.",
//     buttonLabel: "Enroll Now",
//     dateRange: "April 10 - May 25",
//   },
//   {
//     courseId: 3,
//     title: "Next.js Masterclass",
//     image: "/consistiimage.png",
//     students: 600,
//     price: 1499,
//     originalPrice: 2999,
//     description: "Deep dive into Next.js with real-world projects.",
//     buttonLabel: "Enroll Now",
//     dateRange: "May 5 - June 20",
//   },
// ];

// const CartData = () => {
//   const [cartItems, setCartItems] = useState(initialCartItems);

//   return (
//     <div className="container mx-auto p-6">
//       {/* Gradient Purple Heading */}
//       <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-600 to-indigo-500 text-transparent bg-clip-text">
//         Your Cart !!!
//       </h1>

//       {/* Cart Items Count */}
//       <h2 className="text-lg font-semibold text-gray-700 text-purple-700 text-4xl text-center mb-6">
//         {cartItems.length} {cartItems.length === 1 ? "Course" : "Courses"} in Cart
//       </h2>

//       {/* Empty Cart Section */}
//       {cartItems.length === 0 ? (
//         <div className="flex flex-col items-center justify-center text-gray-500">
//           <FaCartShopping size={100} className="text-purple-500 mb-4 animate-bounce" />
//           <p className="text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-500">No courses available</p>
//         </div>
//       ) : (
//         // Responsive Grid - 3 Cards Per Row on Large Screens
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cartItems.map((course) => (
//             <div 
//               key={course.courseId} 
//               className="transition-transform transform hover:scale-105  duration-300 min-h-[400px] flex flex-col"
//             >
//               <Card {...course} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartData;


'use client';

import { useState } from 'react';
import Image from 'next/image';

const cartData = {
  cart: {
    items: [
      {
        id: 1,
        name: "Godrej 1 Ton 3 Star, 5-In-1 Convertible Cooling, Inverter Split AC",
        description: "Copper, I-Sense Technology, 2023 Model, White",
        style: "1 Ton 3 star (2024)",
        price: 28990,
        quantity: 1,
        image: "/signuppageimage.png",
        stockStatus: "In stock",
        shipping: "Eligible for FREE Shipping"
      },
      {
        id: 2,
        name: "Godrej 1 Ton 3 Star, 5-In-1 Convertible Cooling, Inverter Split AC",
        description: "Copper, I-Sense Technology, 2023 Model, White",
        style: "1 Ton 3 star (2024)",
        price: 28990,
        quantity: 1,
        image: "/signuppageimage.png",
        stockStatus: "In stock",
        shipping: "Eligible for FREE Shipping"
      },
      {
        id: 3,
        name: "Godrej 1 Ton 3 Star, 5-In-1 Convertible Cooling, Inverter Split AC",
        description: "Copper, I-Sense Technology, 2023 Model, White",
        style: "1 Ton 3 star (2024)",
        price: 28990,
        quantity: 1,
        image: "/signuppageimage.png",
        stockStatus: "In stock",
        shipping: "Eligible for FREE Shipping"
      }
    ] ,
    
  }
};

const CartData = () => {
  const [cart, setCart] = useState(cartData.cart);

  const handleQuantityChange = (index: number, change: number) => {
    const updatedCart = { ...cart };
    updatedCart.items[index].quantity = Math.max(1, updatedCart.items[index].quantity + change);
    setCart(updatedCart);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        <hr className="mb-4" />

        {cart.items.map((item, index) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Image src={item.image} alt={item.name} width={150} height={100} className="rounded" />
            <div className="flex-1">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-green-600 font-medium">{item.stockStatus}</p>
              <p className="text-sm text-gray-500">{item.shipping}</p>
              <p className="text-sm font-bold">Style Name: <span className="font-normal">{item.style}</span></p>
              
              <div className="flex items-center gap-4 mt-2">
                {/* <button onClick={() => handleQuantityChange(index, -1)} className="p-2 border rounded-l bg-gray-200">-</button>
                <span className="px-4 py-2 border-t border-b">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(index, 1)} className="p-2 border rounded-r bg-gray-200">+</button> */}
                <button className="text-red-500 text-sm ml-4">Delete</button>
                <button className="text-blue-500 text-sm">Save for later</button>
              </div>
            </div>
            <p className="text-lg font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
          </div>
        ))}

        <hr className="mt-4" />
        <div className="flex justify-end mt-4 text-lg font-semibold">
          <p>
            Subtotal ({cart.items.reduce((total, item) => total + item.quantity, 0)} item): 
            <span className="text-black"> ₹{cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartData;
