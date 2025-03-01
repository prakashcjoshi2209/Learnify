


// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import Image from 'next/image';
// import ProfileSection from '../Cart/ProfileSection';

// interface ICourse {
//   _id: string;
//   name: string;
//   shortDescription: string;
//   image: string;
//   price: {
//     current: number;
//     original: number;
//   };
//   studentsEnrolled: number;
// }

// const initialWishlist: ICourse[] = [
//   {
//     _id: '1',
//     name: 'React for Beginners',
//     shortDescription: 'Learn the fundamentals of React.js',
//     image: '/LoginImage.png',
//     price: {
//       current: 2999,
//       original: 4999,
//     },
//     studentsEnrolled: 1200,
//   },
//   {
//     _id: '2',
//     name: 'Advanced Node.js',
//     shortDescription: 'Deep dive into backend development with Node.js',
//     image: '/LoginImage.png',
//     price: {
//       current: 3499,
//       original: 5999,
//     },
//     studentsEnrolled: 800,
//   },
// ];

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState<ICourse[]>(initialWishlist);
//   const router = useRouter();
//   const { data: session } = useSession(); // Fetch session data

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Profile Section */}
//       <div className="w-1/6 p-6 bg-white shadow-lg flex flex-col items-center">
//         <ProfileSection session={session} />
//       </div>
//       {/* Wishlist Section */}
//       <main className="flex-1 p-10">
//         <h1 className="text-3xl font-bold text-purple-800 mb-6">Wishlist</h1>

//         {/* Wishlist Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {wishlist.map((course) => (
//             <div key={course._id} className="bg-white rounded-lg shadow-md p-4">
//               <Image
//                 src={course.image}
//                 alt={course.name}
//                 width={300}
//                 height={180}
//                 className="rounded-lg"
//               />
//               <div className="mt-4">
//                 <p className="text-gray-600 text-sm">📅 1 - 28 July 2022</p>
//                 <h3 className="text-lg font-semibold text-indigo-700">{course.name}</h3>
//                 <p className="text-sm text-gray-500">{course.shortDescription}</p>

//                 {/* Student Count */}
//                 <div className="flex items-center mt-2">
//                   <Image src="/images/students-icon.png" alt="Students" width={20} height={20} />
//                   <span className="text-sm text-gray-600 ml-2">+ {course.studentsEnrolled} students</span>
//                 </div>

//                 {/* Pricing */}
//                 <div className="flex items-center mt-2">
//                   <p className="text-lg font-bold text-black">₹{course.price.current}</p>
//                   <p className="text-sm text-gray-400 line-through ml-2">₹{course.price.original}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Wishlist;


'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import ProfileSection from '../Cart/ProfileSection';

interface ICourse {
  _id: string;
  name: string;
  shortDescription: string;
  image: string;
  price: {
    current: number;
    original: number;
  };
  studentsEnrolled: number;
}

const initialWishlist: ICourse[] = [
  {
    _id: '1',
    name: 'React for Beginners',
    shortDescription: 'Learn the fundamentals of React.js',
    image: '/LoginImage.png',
    price: {
      current: 2999,
      original: 4999,
    },
    studentsEnrolled: 1200,
  },
  {
    _id: '2',
    name: 'Advanced Node.js',
    shortDescription: 'Deep dive into backend development with Node.js',
    image: '/LoginImage.png',
    price: {
      current: 3499,
      original: 5999,
    },
    studentsEnrolled: 800,
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<ICourse[]>(initialWishlist);
  const router = useRouter();
  const { data: session } = useSession(); // Fetch session data

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Profile Section */}
      <div className="md:w-1/4 w-full p-6 bg-white shadow-lg flex flex-col items-center md:sticky md:top-0">
        <ProfileSection session={session} />
      </div>

      {/* Wishlist Section */}
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-6 text-center md:text-left">
          Wishlist
        </h1>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-md p-4 transition transform hover:scale-105">
              <Image
                src={course.image}
                alt={course.name}
                width={300}
                height={180}
                className="rounded-lg w-full object-cover"
              />
              <div className="mt-4">
                <p className="text-gray-600 text-sm">📅 1 - 28 July 2022</p>
                <h3 className="text-lg font-semibold text-indigo-700">{course.name}</h3>
                <p className="text-sm text-gray-500">{course.shortDescription}</p>

                {/* Student Count */}
                <div className="flex items-center mt-2">
                  <Image src="/images/students-icon.png" alt="Students" width={20} height={20} />
                  <span className="text-sm text-gray-600 ml-2">+ {course.studentsEnrolled} students</span>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="text-lg font-bold text-black">₹{course.price.current}</p>
                    <p className="text-sm text-gray-400 line-through">₹{course.price.original}</p>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;
