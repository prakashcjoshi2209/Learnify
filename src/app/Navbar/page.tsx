"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Loader from "@/components/ui/loader";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="text-2xl font-bold">
            <Link href="/">Learnify</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white text-gray-700 rounded-full px-3 py-2 mx-4 flex-grow max-w-[300px]">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for Anything..."
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/ExploreData" className="hover:underline">
              Explore
            </Link>
            <Link href="/DashBoard" className="hover:underline">
              Dashboard
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <div className="bg-white text-purple-600 p-2 rounded-full">
                <ShoppingCartIcon className="h-5 w-5" />
              </div>
            </Link>

            {/* Buttons */}
            {status === "loading" ?
            <div className="relative w-[100px] h-[40px] flex justify-center items-center">
              <Loader />
            </div> 
            : !session ? (
              <div className="hidden md:flex space-x-2">
                <Link
                  href="/signup"
                  className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <button
                  onClick={handleLogout}
                  className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Hamburger Icon */}
            <button
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 right-0 w-[250px] bg-white h-full shadow-lg z-50">
            {/* Close Button */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-xl font-bold text-purple-600">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-600 hover:text-red-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Sidebar Links */}
            <div className="flex flex-col p-4 space-y-4">
              <Link href="/" className="text-gray-800 hover:text-purple-600">
                Home
              </Link>
              <Link
                href="/ExploreData"
                className="text-gray-800 hover:text-purple-600"
              >
                Explore
              </Link>
              <Link
                href="/DashBoard"
                className="text-gray-800 hover:text-purple-600"
              >
                Dashboard
              </Link>
              <Link
                href="/signup"
                className="text-gray-800 hover:text-purple-600"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="text-gray-800 hover:text-purple-600"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
