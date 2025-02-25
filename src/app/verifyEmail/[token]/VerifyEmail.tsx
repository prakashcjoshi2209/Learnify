"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const VerifyEmail: React.FC = () => {
  const { token } = useParams();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(4); 

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch("/api/emailVerification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (res.status === 400) {
          setError("Invalid token or it has expired");
        } else if (res.status === 200) {
          setVerified(true);
        }
      } catch (err) {
        console.error("Error verifying:", err);
        setError("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  useEffect(() => {
    if (verified) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("/login");
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [verified, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {isLoading ? (
        <p className="text-lg">Verifying your email...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="text-center">
          <p className="text-green-500 text-lg">Email verified successfully!</p>
          <p className="mt-2 text-gray-600">
            Redirecting you to login in <span className="font-bold">{countdown}</span> seconds...
          </p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
