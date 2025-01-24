import React from "react";

const Consist = () => {
  return (
    <div>
      <main>
        <section className="relative bg-white flex flex-col justify-center items-start p-8 md:p-20 min-h-[85vh] overflow-hidden">
          <div className="z-10">
            <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-tight">
              Consistency <br /> is the Key
            </h1>
          </div>

          <div className="z-10 mt-6 p-3 w-96 bg-learnify text-white shadow-lg max-w-lg mx-auto absolute left-1/4 transform -translate-x-1/2 top-[55%] md:top-[65%]">
          <h2 className="text-3xl font-semibold text-center ">Learn with <span className="custom-font-style">Learnify</span> </h2>
        
        </div>

          <div className="absolute top-0 right-[-100px] transform rotate-12 md:top-10 md:right-[-50px]"></div>
        </section>
      </main>
    </div>
  );
};

export default Consist;
