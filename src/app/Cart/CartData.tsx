"use client";

// import { useState } from 'react';
// import Image from 'next/image';

// const cartData = {
//   cart: {
//     items: [
//       {
//         id: 1,
//         name: "Mastering Python Programming",
//         description: "Learn Python from scratch with hands-on projects.",
//         style: "500+ students enrolled",
//         price: 199,
//         quantity: 1,
//         image: "/signuppageimage.png",
//         stockStatus: "Limited seats available",
//         shipping: "Instant Access"
//       },
//       {
//         id: 2,
//         name: "Full Stack Web Development",
//         description: "Build responsive websites with HTML, CSS, JS, React, and Node.js.",
//         style: "900+ students enrolled",
//         price: 299,
//         quantity: 1,
//         image: "/signuppageimage.png",
//         stockStatus: "Limited seats available",
//         shipping: "Instant Access"
//       },
//       {
//         id: 3,
//         name: "Data Science and AI",
//         description: "Master data science, machine learning, and AI.",
//         style: "1.2K+ students enrolled",
//         price: 499,
//         quantity: 1,
//         image: "/signuppageimage.png",
//         stockStatus: "Limited seats available",
//         shipping: "Instant Access"
//       }
//     ]
//   }
// };

// const CartData = () => {
//   const [cart, setCart] = useState(cartData.cart);

//   return (
//     <div className="bg-gray-100 ">
//       <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto border border-gray-300">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">Course Enrollment</h2>
//         <hr className="mb-6 border-gray-300" />

//         {cart.items.map((item) => (
//           <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6 p-4 border-b border-gray-200">
//             <Image src={item.image} alt={item.name} width={150} height={100} className="rounded-lg shadow-sm" />
//             <div className="flex-1">
//               <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
//               <p className="text-sm text-gray-600 mb-2">{item.description}</p>
//               <p className="text-green-600 font-semibold mb-1">{item.stockStatus}</p>
//               <p className="text-sm text-gray-500 mb-2">{item.shipping}</p>
//               <p className="text-sm font-bold text-gray-700">Enrolled: <span className="font-normal">{item.style}</span></p>
//             </div>
//             <div className="text-right">
//               <p className="text-lg font-semibold text-gray-900">₹{item.price}</p>
//               <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700">Pay Now</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CartData;

'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CartItem {
  id: number;
  name: string;
  description: string;
  style: string;
  price: number;
  quantity: number;
  image: string;
  stockStatus: string;
  shipping: string;
}

interface Cart {
  items: CartItem[];
}

const initialCartData: Cart = {
  items: [
    {
      id: 1,
      name: "Mastering Python Programming",
      description: "Learn Python from scratch with hands-on projects.",
      style: "500+ students enrolled",
      price: 199,
      quantity: 1,
      image: "/signuppageimage.png",
      stockStatus: "Limited seats available",
      shipping: "Instant Access"
    },
    {
      id: 2,
      name: "Full Stack Web Development",
      description: "Build responsive websites with HTML, CSS, JS, React, and Node.js.",
      style: "900+ students enrolled",
      price: 299,
      quantity: 1,
      image: "/signuppageimage.png",
      stockStatus: "Limited seats available",
      shipping: "Instant Access"
    },
    {
      id: 3,
      name: "Data Science and AI",
      description: "Master data science, machine learning, and AI.",
      style: "1.2K+ students enrolled",
      price: 499,
      quantity: 1,
      image: "/signuppageimage.png",
      stockStatus: "Limited seats available",
      shipping: "Instant Access"
    }
  ]
};

const CartData: React.FC = () => {
  const [cart, setCart] = useState<Cart>(initialCartData);

  const removeFromCart = (id: number) => {
    setCart((prevCart) => ({
      items: prevCart.items.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
        <hr className="mb-6 border-gray-300" />

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 text-lg font-semibold">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6 p-4 border-b border-gray-200"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={100}
                className="rounded-lg shadow-sm"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.shortDescription}</p>
                <p className="text-sm font-bold text-gray-700">
                  Enrolled: <span className="font-normal">{item.studentsEnrolled}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">₹{item.price}</p>
                <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700">
                  Pay Now
                </button>
                <button
                  className="mt-2 ml-3 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartData;
