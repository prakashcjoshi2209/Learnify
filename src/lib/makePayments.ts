// "use client";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
//   }
// }

// interface RazorpayOptions {
//   key: string;
//   amount: number;
//   currency: string;
//   name: string;
//   description: string;
//   order_id?: string;
//   handler: (response: { razorpay_payment_id: string }) => void;
//   prefill?: {
//     name?: string;
//     email?: string;
//     contact?: number;
//   };
//   theme?: {
//     color: string;
//   };
// }

// interface RazorpayInstance {
//   open: () => void;
// }

// const makePayments = async (
//     amount: number,
//     courseName: string,
//     cId: number,
//     session: any,
//     router: any
//   ) => {
//     const loadRazorpayScript = () => {
//       return new Promise((resolve) => {
//         if (window.Razorpay) {
//           resolve(true);
//           return;
//         }

//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//       });
//     };

//     const handlePayment = async () => {
//       if (!session) {
//         const currentPath = window.location.pathname;
//         router.push(`/login?redirect=${currentPath}`);
//         return;
//       }

//       try {
//         const scriptLoaded = await loadRazorpayScript();
//         if (!scriptLoaded) {
//           throw new Error("Failed to load Razorpay script.");
//         }

//         // Create order
//         const response = await fetch("/api/createOrder", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ amt: amount }),
//         });

//         const data = await response.json();

//         if (!window.Razorpay) {
//           throw new Error("Razorpay is not available.");
//         }

//         // Initialize Razorpay
//         const options: RazorpayOptions = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
//           amount: amount * 100,
//           currency: "INR",
//           name: "Learnify",
//           description: `Buying course ${courseName}`,
//           order_id: data.orderId,
//           handler: async function (response: { razorpay_payment_id: string }) {
//             const paymentId = response.razorpay_payment_id;
//             console.log("Payment successful!", response);

//             // Save course to user account
//             const resp = await fetch("/api/buyCourse", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ cId, paymentId }),
//             });

//             const dta = await resp.json();
//             if (resp.ok) {
//               toast.success(`${dta.message}`, {
//                 autoClose: 5000,
//               });
//               // router.push("/DashBoard");
//             } else {
//               toast.error(`Error: ${dta.error}`);
//             }
//           },
//           prefill: {
//             name: session?.user?.name || "Guest User",
//             email: session?.user?.email || "guest@example.com",
//             contact: session?.user?.phone,
//           },
//           theme: {
//             color: "#8A2BE2",
//           },
//         };

//         const rzp1 = new window.Razorpay(options);
//         rzp1.open();
//       } catch (error: unknown) {
//         console.error(
//           "Payment Failed: ",
//           error instanceof Error ? error.message : error
//         );
//       }
//     };

//     await handlePayment();
//   };

//   export default makePayments;

"use client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";  // ✅ Import useRouter here

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

const makePayments = async (
  amount: number,
  courseName: string,
  cId: number,
  session: any,
  router: any
) => {
  // const router = useRouter();  // ✅ Use useRouter inside makePayments

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

  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!session) {
        const currentPath = window.location.pathname;
        router.push(`/login?redirect=${currentPath}`);
        return reject("User not logged in");
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay script.");
      }

      // Create order
      const response = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          const resp = await fetch("/api/buyCourse", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cId, paymentId }),
          });
          const dta = await resp.json();
          if (resp.ok) {
            console.log("Payment successful!", response);
            // toast.success(`${dta.message}`, {
            //   autoClose: 5000,
            // });
            // router.push("/DashBoard");
          } else {
            console.log("Payment Problem!", response);
          }

          // ✅ Remove course from user DB after successful payment
          const removeResponse = await fetch("/api/removeCourse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId: cId }),
          });

          const removeData = await removeResponse.json();
          if (!removeResponse.ok) {
            toast.error(`Error removing course: ${removeData.error}`);
            return reject("Error removing course from DB");
          }

          toast.success("Payment Successful!", { autoClose: 5000 });

          // ✅ Fix Router Issue: Use setTimeout to avoid conflicts
          // setTimeout(() => {
          // router.push("/DashBoard");
          // }, 1000);

          resolve(); // ✅ Resolve after successful payment and removal
        },
        prefill: {
          name: session?.user?.name || "Guest User",
          email: session?.user?.email || "guest@example.com",
          contact: session?.user?.phone,
        },
        theme: { color: "#8A2BE2" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Failed: ", error);
      reject(error);
    }
  });
};

export default makePayments;
