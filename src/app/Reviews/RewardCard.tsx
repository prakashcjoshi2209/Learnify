import React from 'react';

interface ReviewCardProps {
  name: string;
  imageUrl: string;
  review: string;
  rating: number; // between 0 and 5
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, imageUrl, review, rating }) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-3xl ${
          index < rating ? 'text-yellow-300' : 'text-gray-800'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="flex items-center border border-purple-800 rounded-lg p-4 shadow-sm bg-white">
      <img
        src={imageUrl}
        alt={`${name}'s profile`}
        className="w-12 h-12 rounded-full object-cover mr-4 "
      />
      <div>
       <div className='flex items-center space-x-4 '>
       <h4 className="font-semibold text-xl text-purple-600">{name}</h4>
       <div className="flex items-center space-x-1">{renderStars()}</div>
       </div>
        <hr className='border-2 border-purple-600'/>
        <p className="text-gray-600 text-sm mt-2 text-primaryBlue font-bold">{review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
