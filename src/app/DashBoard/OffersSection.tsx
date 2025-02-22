import React from "react";
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
  {
    id: 1,
    title: "Mastering Next.js",
    description: "Learn Next.js from beginner to advanced with real-world projects.",
    author: "John Doe",
    discount: "40% OFF",
    image: "signuppageimage.png",
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    description: "Master TypeScript with deep-dive concepts and best practices.",
    author: "Jane Smith",
    discount: "50% OFF",
    image: "signuppageimage.png",
  },
  {
    id: 3,
    title: "Full-Stack MERN Bootcamp",
    description: "Become a full-stack developer with hands-on projects.",
    author: "David Johnson",
    discount: "30% OFF",
    image: "signuppageimage.png",
  },
  {
    id: 4,
    title: "React Native from Scratch",
    description: "Build mobile apps using React Native.",
    author: "Sarah Lee",
    discount: "60% OFF",
    image: "signuppageimage.png",
  },
  {
    id: 5,
    title: "Mastering Next.js",
    description: "Learn Next.js from beginner to advanced with real-world projects.",
    author: "John Doe",
    discount: "40% OFF",
    image: "signuppageimage.png",
  },
  {
    id: 6,
    title: "Advanced TypeScript",
    description: "Master TypeScript with deep-dive concepts and best practices.",
    author: "Jane Smith",
    discount: "50% OFF",
    image: "signuppageimage.png",
  },
];

const OffersSection: React.FC = () => {
  return (
    <div className="mt-8 px-4 py-6 bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-lg">
      <p
        className="text-center text-xl font-medium text-purple-600 mb-4"
        style={{
          fontFamily: "'Irish Grover', cursive",
          fontSize: "22px",
          fontWeight: 400,
          lineHeight: "19px",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
      >
        Something Special Just for You! 🎉
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card
            key={offer.id}
            className="relative h-[340px] flex flex-col p-3 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-lg overflow-hidden"
          >
            {/* Discount Badge - Top Right Corner */}
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              {offer.discount}
            </span>

            {/* Course Image */}
            <img src={offer.image} alt={offer.title} className="w-full h-28 mt-3 object-cover rounded-t-lg" />

            {/* Card Content - Ensures uniform text expansion */}
            <CardHeader className="flex-grow px-2 py-2 flex flex-col">
              <CardTitle className="text-base font-semibold">{offer.title}</CardTitle>
              <CardDescription className="text-xs mt-1 text-gray-600 flex-grow">{offer.description}</CardDescription>
              <p className="text-xs font-medium text-gray-500 mt-1">By {offer.author}</p>
            </CardHeader>

            {/* Call to Action - Button Always at Bottom */}
            <CardFooter className="mt-auto">
              <button className="w-full py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition text-center">
                Get Offer
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OffersSection;
