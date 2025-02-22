import React from 'react';
import ReviewCard from './RewardCard';


const ReviewsHome: React.FC = () => {
  const reviews = [
    {
      name: 'Ajay Shekhar',
      imageUrl: '/signuppageimage.png', 
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
      rating: 4,
    },
    {
      name: 'Ajay Shekhar',
      imageUrl: '/signuppageimage.png',
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
      rating: 4,
    },
    {
      name: 'Ajay Shekhar',
      imageUrl: '/signuppageimage.png',
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
      rating: 4,
    },
    {
        name: 'Ajay Shekhar',
        imageUrl: '/signuppageimage.png', 
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
        rating: 4,
      },
      {
        name: 'Ajay Shekhar',
        imageUrl: '/signuppageimage.png', 
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
        rating: 4,
      },
      {
        name: 'Ajay Shekhar',
        imageUrl: '/signuppageimage.png', 
        review:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
        rating: 4,
      }
  ];

  return (
    // <div className="p-8 bg-gray-100 min-h-screen">
    <div className="p-8 bg-gray-100">
        <div className='flex items-center mb-6 '>
        <hr className='border-2 border-t-4 w-20 border-purple-600 '/>
        <h2 className="text-2xl font-bold text-purple-700 ms-5 mb-3">Reviews</h2>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            imageUrl={review.imageUrl}
            review={review.review}
            rating={review.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsHome;


