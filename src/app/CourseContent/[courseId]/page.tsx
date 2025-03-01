"use client";

import { useEffect, useState } from "react";
import Footer from "../../Footer/page";
import ReviewsHome from "../../Reviews/page";
import { useParams, useRouter } from "next/navigation";
import CoursePage from "./About2";
import CourseContentData from "./CourseContentData";
import PublishHome from "./Publisher";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/Loader";
import { ICourse } from "@/app/models/Course";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: (response: { razorpay_payment_id: string }) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: number;
  };
  theme?: {
    color: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

const CourseContentPage: React.FC = () => {
  // courses part
  const { data: session } = useSession();
  const { courseId } = useParams();

  const [courseIncluded, setCourseIncluded] = useState(false);
  const [cartIncluded, setCartIncluded] = useState(false);
  const [course, setCourse] = useState<ICourse | null>(null); // State to store course data
  const [loading, setLoading] = useState(true); // State to indicate loading
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // const response = await fetch(`/api/course/${courseId}`);
        const response = await fetch("/api/course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }
        const data = await response.json();
        setCourse(data.course);
        setCourseIncluded(data.courseIncluded);
        setCartIncluded(data.cartIncluded);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const addToWishlist = async () => {
    setIsAdding(true);
    if (!session) {
      const currentPath = window.location.pathname;
      router.push(`/login?redirect=${currentPath}`);
      return;
    }
    try {
      const response = await fetch("/api/addCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setIsAdding(false);
      console.log("Success:", data.message);
      setCartIncluded(true);
      toast.success("Course added to wishlist!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        console.log("Adding Cart has developed some issue.");
      } else {
        console.error("Something went Wrong on client side.");
      }
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <div>
        {" "}
        <Loader />{" "}
      </div>
    ); // Display a loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error state
  }

  if (!course) {
    return <div>Course not found</div>; // Display if no course is found
  }

  // Payments part
  const amount = course.price.current; // constant amount in INR
  const courseName = course.name;
  const cId = courseId;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    if (!session) {
      const currentPath = window.location.pathname;
      router.push(`/login?redirect=${currentPath}`);
      return;
    }

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay script.");
      }

      // Create order
      const response = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amt: amount }),
      });

      const data = await response.json();

      if (!window.Razorpay) {
        throw new Error("Razorpay is not available.");
      }

      // Initialize Razorpay
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: amount * 100,
        currency: "INR",
        name: "Learnify",
        description: `Buying course ${courseName}`,
        order_id: data.orderId,
        handler: async function (response: { razorpay_payment_id: string }) {
          const paymentId = response.razorpay_payment_id;
          console.log("Payment successful!", response);

          // Save course to user account
          const resp = await fetch("/api/buyCourse", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cId, paymentId }),
          });

          const dta = await resp.json();
          if (resp.ok) {
            toast.success(`${dta.message}`, {
              autoClose: 5000,
            });
            // alert(`${dta.message}`);
            setCourseIncluded(true);
            router.push("/DashBoard");
          } else {
            // alert(`Error: ${dta.error}`);
            toast.error(`Error: ${dta.error}`);
          }
        },
        prefill: {
          name: session?.user?.name || "Guest User",
          email: session?.user?.email || "guest@example.com",
          contact: session?.user?.phone,
        },
        theme: {
          color: "#8A2BE2",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error: unknown) {
      console.error(
        "Payment Failed: ",
        error instanceof Error ? error.message : error
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      {/* {session && <Script src="https://checkout.razorpay.com/v1/checkout.js" />} */}
      <div className="bg-dark-blue text-white">
        <header className="text-center py-8 flex">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-300">
              Courses &gt; {course.category} &gt; {course.name}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              {course.name}
            </h1>
            <p className="text-lg text-gray-400 mt-3">
              {course.shortDescription}
            </p>
            <div className="flex justify-center items-center gap-3 mt-6">
              <span className="text-orange-400 text-2xl font-bold">
                ★ {course.ratings.average}
              </span>
              <span className="text-gray-300">
                ({course.ratings.totalRatings} Reviews)
              </span>
              <span className="text-gray-300">
                Published By{" "}
                <span className="text-purple-400">
                  {course.authors[0].name}
                </span>
              </span>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              {!courseIncluded ? (
                !cartIncluded ? (
                  <button
                    className="border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-800"
                    onClick={addToWishlist}
                  >
                    {isAdding ? "Adding..." : "Wishlist"}
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    disabled
                  >
                    Added to Wishlist
                  </button>
                )
              ) : null}
              {!courseIncluded ? (
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
                  onClick={handlePayment}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Buy Now (₹ ${course.price.current})`}
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  disabled
                >
                  Course Purchased
                </button>
              )}
            </div>
          </div>
        </header>

        <section className="bg-light-blue text-center py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div>
              <h3 className="text-4xl font-bold">{course.duration}</h3>
              <p className="text-gray-300">Hours of Course</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">{course.modules.length}</h3>
              <p className="text-gray-300">Total Modules</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">{course.studentsEnrolled}</h3>
              <p className="text-gray-300">Students Enrolled</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">
                {course.rewards.totalReward}
              </h3>
              <p className="text-gray-300">Total Rewards</p>
            </div>
          </div>
        </section>

        <footer className="bg-purple-500 text-center text-white py-4">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => handleScroll("about-course")}
              className="hover:underline"
            >
              About Course
            </button>
            <button
              onClick={() => handleScroll("course-content")}
              className="hover:underline"
            >
              Course Content
            </button>
            <button
              onClick={() => handleScroll("about-publisher")}
              className="hover:underline"
            >
              About Publisher
            </button>
            <button
              onClick={() => handleScroll("faq")}
              className="hover:underline"
            >
              FAQs
            </button>
          </div>
        </footer>
      </div>

      <section id="about-course">
        <CoursePage />
      </section>

      <section id="course-content">
        <CourseContentData />
      </section>

      <section id="about-publisher">
        <PublishHome />
      </section>

      <section id="faq">
        <ReviewsHome />
      </section>

      <Footer />
    </>
  );
};

export default CourseContentPage;
