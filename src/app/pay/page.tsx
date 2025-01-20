"use client";

import React, { useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const PaymentPage = () => {
    const { data: session } = useSession();
    const amount = 100; // constant amount in INR
    const courseName = "Cybersecurity Basics";
    const cId = 6;
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            // Create order
            const response = await fetch("/api/createOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amt: amount }),
            });

            const data = await response.json();

            // Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: amount * 100, // amount in paise
                currency: "INR",
                name: "Learnify",
                description: `Buying course ${courseName}`,
                order_id: data.orderId,
                handler: async function (response: any) {
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
                        alert(`${dta.message}`);
                    } else {
                        alert(`Error: ${dta.error}`);
                    }
                },
                prefill: {
                    name: session?.user?.name || "Guest User",
                    email: session?.user?.email || "guest@example.com",
                    contact: "9911337654",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error: any) {
            console.error("Payment Failed: ", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
                <p className="mb-4">Amount to pay: {amount} INR</p>
                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                    aria-label="Pay now button"
                >
                    {isProcessing ? "Processing..." : "Pay Now"}
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
