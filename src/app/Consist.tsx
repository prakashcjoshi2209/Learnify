import Image from "next/image";
import React from "react";

const Consist = () => {
  return (
    <div>
      <main>
        <section className="relative bg-white flex flex-col justify-center items-start p-8 md:p-20 min-h-[85vh] overflow-hidden">
          <div className="z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Consistency <br /> is the Key
            </h1>
          </div>

          <div className="z-10 mt-6 p-4 w-full max-w-md sm:max-w-lg bg-learnify text-white shadow-lg rounded-lg absolute left-[45%] md:left-[50%] transform -translate-x-[45%] md:-translate-x-1/2 top-[55%] md:top-[65%]">
            <h2 className="text-3xl font-semibold text-center ">
              Learn with <span className="custom-font-style">Learnify</span>{" "}
            </h2>
          </div>

          <div className="absolute top-0 right-[-100px] transform rotate-12 md:top-10 md:right-[-50px] w-[80%] md:w-auto max-w-full">
            <Image
              src="/consistiimage.png"
              alt="Description of image"
              width={1200}
              height={300}
              
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Consist;
