import React from 'react'

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
        
        <div className="z-10 mt-6 p-6 bg-white text-purple-600 rounded-xl shadow-lg max-w-md mx-auto absolute left-1/4 transform -translate-x-1/2 top-[55%] md:top-[65%]">
          <h2 className="text-3xl font-semibold text-center">Learn with Learnify</h2>
          {/* <p className="mt-4 text-center text-lg">
            Unlock your potential and start your learning journey today.
          </p> */}
        </div>

        <div className="absolute top-0 right-[-100px] transform rotate-12 md:top-10 md:right-[-50px]">
        
        </div>
      </section>
       </main>
    </div>
  )
}

export default Consist