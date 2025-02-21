


import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card"; 

interface Offer {
  id: number;
  title: string;
  description: string;
  author: string;
  discount: string;
}

const offers: Offer[] = [
  { id: 1, title: "Mastering Next.js", description: "Learn Next.js from beginner to advanced with real-world projects.", author: "John Doe", discount: "40% OFF" },
  { id: 2, title: "Advanced TypeScript", description: "Master TypeScript with deep-dive concepts and best practices.", author: "Jane Smith", discount: "50% OFF" },
  { id: 3, title: "Full-Stack MERN Bootcamp", description: "Become a full-stack developer with hands-on projects.", author: "David Johnson", discount: "30% OFF" },
  { id: 4, title: "React Native from Scratch", description: "Build mobile apps using React Native.", author: "Sarah Lee", discount: "60% OFF" },
  { id: 5, title: "Mastering Next.js", description: "Learn Next.js from beginner to advanced with real-world projects.", author: "John Doe", discount: "40% OFF" },
  { id: 6, title: "Advanced TypeScript", description: "Master TypeScript with deep-dive concepts and best practices.", author: "Jane Smith", discount: "50% OFF" },
  

];

const OffersSection: React.FC = () => {
  return (
    <div className="mt-8 px-4 py-6 bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-lg">
      {/* Special Tagline */}
      <p className="text-center text-xl font-medium text-purple-600 mb-4"
         style={{
          fontFamily: "'Irish Grover', cursive",
          fontSize: "22px",
          fontWeight: 400,
          lineHeight: "19px",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}>
        Something Special Just for You! 🎉
      </p>

      {/* Offers Grid - Responsive Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {offers.map((offer) => (
          <Card 
            key={offer.id} 
            className="flex flex-col h-full p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-lg"
          >
            {/* Card Header */}
            <CardHeader className="flex-grow">
              <CardTitle className="text-lg font-semibold">{offer.title}</CardTitle>
              <CardDescription className="text-sm mt-2">{offer.description}</CardDescription>
              <p className="text-sm font-medium text-gray-600 mt-2">By {offer.author}</p>
            </CardHeader>

            {/* Discount Display */}
            <CardContent className="flex justify-between items-center">
              <span className="text-lg font-bold text-red-500 bg-red-100 px-3 py-1 rounded-full">
                {offer.discount}
              </span>
            </CardContent>

            {/* Get Offer Button - Mobile Friendly */}
            <CardFooter className="mt-auto">
              <button className="w-full py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition text-center">
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
