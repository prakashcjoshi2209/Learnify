


"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

interface Offer {
  id: number;
  title: string;
  description: string;
  author: string;
  discount: string;
  image: string;
}

const offers: Offer[] = [
  { id: 1, title: "Mastering Next.js", description: "Learn Next.js from beginner to advanced with real-world projects.", author: "John Doe", discount: "40% OFF", image: "signuppageimage.png" },
  { id: 2, title: "Advanced TypeScript", description: "Master TypeScript with deep-dive concepts and best practices.", author: "Jane Smith", discount: "50% OFF", image: "signuppageimage.png" },
  { id: 3, title: "Full-Stack MERN Bootcamp", description: "Become a full-stack developer with hands-on projects.", author: "David Johnson", discount: "30% OFF", image: "signuppageimage.png" },
  { id: 4, title: "React Native from Scratch", description: "Build mobile apps using React Native.", author: "Sarah Lee", discount: "60% OFF", image: "signuppageimage.png" },
  { id: 5, title: "Mastering Next.js", description: "Learn Next.js from beginner to advanced with real-world projects.", author: "John Doe", discount: "80% OFF", image: "signuppageimage.png" },
  { id: 6, title: "Advanced TypeScript", description: "Master TypeScript with deep-dive concepts and best practices.", author: "Jane Smith", discount: "90% OFF", image: "signuppageimage.png" },
];

const OffersSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + itemsPerSlide) % offers.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - itemsPerSlide + offers.length) % offers.length);
  };

  return (
    <div className="mt-8 px-4 py-6 bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-lg w-full max-w-6xl mx-auto flex flex-col items-center justify-center overflow-hidden">
      <p
        className="text-center text-lg sm:text-xl font-medium text-purple-600 mb-4"
        style={{
          fontFamily: "'Irish Grover', cursive",
          fontWeight: 400,
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
      >
        Something Special Just for you! 🎉
      </p>

      <div className="relative w-full max-w-5xl flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition"
        >
          ◀
        </button>

        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {offers.slice(startIndex, startIndex + itemsPerSlide).map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <Card className="relative flex flex-col p-3 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-lg overflow-hidden">
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    {offer.discount}
                  </span>

                  <img src={offer.image} alt={offer.title} className="w-full h-28 mt-3 object-cover rounded-t-lg" />

                  <CardHeader className="flex-grow px-2 py-2 flex flex-col">
                    <CardTitle className="text-sm sm:text-base font-semibold">{offer.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm mt-1 text-gray-600 flex-grow">{offer.description}</CardDescription>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs font-medium text-gray-500">By {offer.author}</p>
                      <button className="py-1 px-3 bg-purple-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-purple-700 transition">
                        Get Offer
                      </button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default OffersSection;
