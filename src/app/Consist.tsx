<<<<<<< HEAD
import Image from "next/image";
=======

// import React from "react";

// const Consist = () => {
//   return (
//     <div>
//       <main>
//         <section className="relative bg-white flex flex-col md:flex-row justify-between items-center p-8 md:p-20 min-h-[85vh] overflow-hidden">
//           {/* Left Section: Heading */}
//           <div className="z-10 md:w-1/2 relative">
//             <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-tight">
//               Consistency <br /> is the Key
//             </h1>
//           </div>

        
//           <div className="relative md:w-1/2 h-[80vh] md:h-[85vh] flex items-center justify-center">
//             <img
//               src="https://images.vexels.com/media/users/3/198606/raw/41e7e06173e01fde29b0063b247061fc-study-online-web-slider-design.jpg"
//               alt="Motivational"
//               className="w-full h-full object-cover rounded-lg shadow-lg"
//             />
//           </div>

//           {/* Floating Box for "Learnify" */}
//           <div className="z-10 mt-6 p-4 w-80 bg-learnify text-white shadow-2xl rounded-lg max-w-lg mx-auto absolute left-1/4 transform -translate-x-1/2 top-[55%] md:top-[65%]">
//             <h2 className="text-3xl font-semibold text-center">
//               Learn with <span className="custom-font-style">Learnify</span>
//             </h2>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Consist;

>>>>>>> 62f60466ab5eea2e19a828f6269e3a5b627c4f97
import React from "react";

const Consist = () => {
  return (
    <div>
      <main>
<<<<<<< HEAD
        <section className="relative bg-white flex flex-col justify-center items-start p-8 md:p-20 min-h-[85vh] overflow-hidden">
          <div className="z-10">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
=======
        <section className="relative bg-white flex flex-col md:flex-row justify-between items-center p-8 md:p-20 min-h-[85vh] overflow-hidden">
          {/* Left Section: Heading */}
          <div className="z-10 md:w-1/2">
            <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-tight">
>>>>>>> 62f60466ab5eea2e19a828f6269e3a5b627c4f97
              Consistency <br /> is the Key
            </h1>
          </div>

<<<<<<< HEAD
          <div className="z-10 mt-6 p-3 w-96 bg-learnify text-white shadow-lg max-w-lg mx-auto absolute left-1/4 transform -translate-x-1/2 top-[55%] md:top-[65%]">
            <h2 className="text-3xl font-semibold text-center ">
              Learn with <span className="custom-font-style">Learnify</span>{" "}
            </h2>
          </div>

          <div className="absolute top-0 right-[-100px] transform rotate-12 md:top-10 md:right-[-50px]">
            <Image
              src="/consistiimage.png"
              alt="Description of image"
              width={1200}
              height={300}
            />
=======
          {/* Right Section: Compressed Image */}
          <div className="md:w-1/2 h-[75vh] flex items-center justify-center p-4">
            <img
              src="https://images.vexels.com/media/users/3/198606/raw/41e7e06173e01fde29b0063b247061fc-study-online-web-slider-design.jpg"
              alt="Motivational"
              className="w-full h-full object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Floating Box for "Learnify" */}
          <div className="z-10 mt-6 p-4 w-80 bg-learnify text-white shadow-2xl rounded-lg max-w-lg mx-auto absolute left-1/4 transform -translate-x-1/2 top-[55%] md:top-[65%]">
            <h2 className="text-3xl font-semibold text-center">
              Learn with <span className="custom-font-style">Learnify</span>
            </h2>
>>>>>>> 62f60466ab5eea2e19a828f6269e3a5b627c4f97
          </div>
        </section>
      </main>
    </div>
  );
};

export default Consist;
