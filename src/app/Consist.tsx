
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

import React from "react";

const Consist = () => {
  return (
    <div>
      <main>
        <section className="relative bg-white flex flex-col md:flex-row justify-between items-center p-8 md:p-20 min-h-[85vh] overflow-hidden">
          {/* Left Section: Heading */}
          <div className="z-10 md:w-1/2">
            <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-tight">
              Consistency <br /> is the Key
            </h1>
          </div>

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
          </div>
        </section>
      </main>
    </div>
  );
};

export default Consist;
