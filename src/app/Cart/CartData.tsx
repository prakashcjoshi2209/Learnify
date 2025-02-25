


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
