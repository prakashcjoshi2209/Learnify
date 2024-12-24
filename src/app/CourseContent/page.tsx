import Footer from "../Footer/page";
import ReviewsHome from "../Reviews/page";
import RewardsPage from "../Rewards/page";
import CoursePage from "./About2";
import CourseContentData from "./CourseContentData";
import PublishHome from "./Publisher";
import RewardsData from "./Rewards";


const HomePage = () => {
    return (
     <>
      <div className="bg-dark-blue text-white">
        <header className="text-center py-8 flex">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-300">Courses &gt; Design Courses &gt; Web Design</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              UX & Web Design Master Course: <br /> Strategy, Design, Development
            </h1>
            <p className="text-lg text-gray-400 mt-3">
              Learn how to apply User Experience (UX) principles to your website designs, code a variety of sites, and increase sales!
            </p>
            <div className="flex justify-center items-center gap-3 mt-6">
              <span className="text-orange-400 text-2xl font-bold">★ 4.5</span>
              <span className="text-gray-300">(2,540 Reviews)</span>
              <span className="text-gray-300">Published By <span className="text-purple-400">Joe Natoli</span></span>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button className="border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-800">Wishlist</button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md">Buy Now (₹ 1000)</button>
            </div>
          </div>
          <div>
            <h2>hello my friends</h2>
          </div>
        </header>
  
        <section className="bg-light-blue text-center py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div>
              <h3 className="text-4xl font-bold">24+</h3>
              <p className="text-gray-300">Hours of Course</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">18+</h3>
              <p className="text-gray-300">Total Assignments</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">20+</h3>
              <p className="text-gray-300">Video Lessons</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">4,312+</h3>
              <p className="text-gray-300">Students Enrolled</p>
            </div>
          </div>
        </section>
  
       
  
        <footer className="bg-purple-500 text-center text-white py-4">
          <div className="flex justify-center space-x-8">
            <a href="#about" className="hover:underline">About Course</a>
            <a href="#content" className="hover:underline">Course Content</a>
            <a href="#publisher" className="hover:underline">About Publisher</a>
            <a href="#faq" className="hover:underline">FAQs</a>
          </div>
        </footer>
      </div>



      <CoursePage/>
      <CourseContentData/>
      <RewardsData/>
      <PublishHome/>
      <ReviewsHome/>
      <Footer/>

     </>
    );
  };
  
  export default HomePage;