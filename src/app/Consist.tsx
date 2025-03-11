

// import Image from "next/image";
// import React from "react";

// const Consist = () => {
//   return (
//     <div>
//       <main>
//         <section className="relative bg-white flex flex-col justify-center items-start p-8 md:p-20 min-h-[85vh] overflow-hidden">
//           <div className="z-10">
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
//               Consistency <br /> is the Key
//             </h1>
//           </div>

//           <div className="z-10 mt-6 p-4 w-full max-w-md sm:max-w-lg bg-learnify text-white shadow-lg rounded-lg absolute left-1/2 md:left-[17%] transform -translate-x-1/2 md:-translate-x-1/2 top-[55%] md:top-[65%]">
//             <h2 className="text-3xl font-semibold text-center">
//               Learn with <span className="custom-font-style">Learnify</span>
//             </h2>
//           </div>

//           <div className="absolute top-0 right-[-100px] transform rotate-12 md:top-10 md:right-[-50px] w-[100%] sm:w-[80%] md:w-auto max-w-full">
//             <Image
//               src="/consistiimage.png"
//               alt="Description of image"
//               width={1200}
//               height={300}
//             />
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Consist;





// 'use client';

// import Image from 'next/image';
// import React from 'react';

// const Consist: React.FC = () => {
//   return (
//     <section className="flex flex-col md:flex-row items-center justify-between p-12 bg-white rounded-lg shadow-lg border border-blue-300">
//       {/* Left Content */}
//       <div className="md:w-1/2 text-center md:text-left">
//         <h1 className="text-5xl font-bold text-gray-900 leading-tight">
//           Learn with <span className="text-blue-600">Experts</span> <br /> anytime, anywhere
//         </h1>
//         <p className="mt-4 text-gray-600 text-lg">
//           Our Mission is to help students to find the best course online and learn with experts anytime, anywhere.
//         </p>
//         <button className="mt-6 px-8 py-4 text-xl font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-md">
//           Learn with <span className="font-bold">Learnify</span>
//         </button>
//       </div>

//       {/* Right Image Section */}
//       <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
//         <Image src="/main.jpg" alt="Education" width={450} height={450} className="rounded-lg" />
//       </div>
//     </section>
//   );
// };

// export default Consist;



"use client";

import Image from "next/image";
import React from "react";

const Consist: React.FC = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-10 md:py-16 bg-white rounded-lg shadow-lg border border-blue-300">
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl ml-2 md:ml-4 font-bold text-gray-900 leading-snug">
          Learn with <span className="text-blue-600">Experts</span> <br /> anytime, anywhere
        </h1>
        <p className="mt-3 md:mt-4 ml-2 md:ml-4 text-gray-600 text-base md:text-lg">
          Our Mission is to help students to find the best course online and learn with experts anytime, anywhere.
        </p>

        {/* CTA Heading - Positioned Correctly */}
        <div className="z-10 ml-2 md:ml-4 mt-4 md:mt-6 p-3 w-full max-w-xs sm:max-w-md bg-learnify text-white shadow-lg rounded-lg absolute left-1/2 md:left-[15%] transform -translate-x-1/2 md:-translate-x-1/2 top-[58%] md:top-[75%]">
          <h2 className="text-xl md:text-2xl font-semibold text-center">
            Learn with <span className="custom-font-style">Learnify</span>
          </h2>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="md:w-1/2 flex justify-center mt-4 md:mt-0 relative">
        <div className="custom-image-container">
          <Image
            src="/main.jpg"
            alt="Education"
            width={450}
            height={400}
            className="object-cover custom-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Consist;
