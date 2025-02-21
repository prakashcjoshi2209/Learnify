"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Loader from "@/components/ui/Loader";
import { Session } from "next-auth";
import SearchBar from "./SearchBar";

const Navbar: React.FC<{ session?: Session | null }> = ({ session }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [loading, setLoading] = useState(false); // Loader state
  // const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Get the current path dynamically

  /**
   * Handle navigation with Loader
   * @param {string} targetPath - The path to navigate to
   */
  const handleNavigation = (targetPath: string) => {
    // Only show loader and navigate if going to a different page
    if (pathname !== targetPath) {
      setLoading(true); // Show loader
      router.push(targetPath); // Navigate to the target path
      setTimeout(() => setLoading(false), 500); // Hide loader after navigation (simulate delay)
    }
  };

  /**
   * Handle user logout
   */
  const handleLogout = async () => {
    setLoading(true); // Show loader on logout
    await signOut({ redirect: true, callbackUrl: "/login" });
    setLoading(false); // Hide loader after logout
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-custom-gradient text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}

          {/* <div className="text-2xl font-bold">
            <Link href="/">Learnify</Link>
          </div> */}

          <div
            className="text-2xl font-bold"
            style={{
              fontFamily: "'Irish Grover', cursive",
              fontSize: "19px",
              fontWeight: 400,
              lineHeight: "19px",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            <Link href="/">Learnify</Link>
          </div>

          {/* Loader (centered in navbar during loading) */}
          {loading && <Loader />}

          {/* Search Bar */}
          {/* <div className="hidden md:flex items-center bg-white text-gray-700 rounded-full px-3 py-2 mx-4 flex-grow max-w-[500px]">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for Anything..."
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </div> */}
          <SearchBar />

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavigation("/")}
              className={`${
                pathname === "/"
                  ? "underline decoration-2 decoration-pink-300"
                  : ""
              } hover:underline decoration-2 decoration-white text-white`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/ExploreData")}
              className={`${
                pathname === "/ExploreData"
                  ? "underline decoration-2 decoration-white-300"
                  : ""
              } hover:underline decoration-2 decoration-white text-white`}
            >
              Explore
            </button>
            {session ? (
              <button
                onClick={() => handleNavigation("/DashBoard")}
                className={`hover:underline ${
                  pathname === "/DashBoard" ? "text-yellow-300" : ""
                }`}
              >
                Dashboard
              </button>
            ) : (
              ""
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={() => handleNavigation("/cart")}
              className="relative bg-white text-black font-semibold p-2 rounded-full"
            >
              <ShoppingCartIcon className="h-5 w-5" />
            </button>

            {/* Buttons */}
            {!session ? (
              <div className="hidden md:flex space-x-2">
                <button
                  onClick={() => handleNavigation("/EmailVerify")}
                  className="bg-white  text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => handleNavigation("/login")}
                  className="bg-white  text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  Login
                </button>
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
              <button
                onClick={() => handleNavigation("/")}
                className={`text-gray-800 hover:text-purple-600 ${
                  pathname === "/" ? "font-bold" : ""
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("/ExploreData")}
                className={`text-gray-800 hover:text-purple-600 ${
                  pathname === "/ExploreData" ? "font-bold" : ""
                }`}
              >
                Explore
              </button>
              {session ? (
                <button
                  onClick={() => handleNavigation("/DashBoard")}
                  className={`text-gray-800 hover:text-purple-600 ${
                    pathname === "/DashBoard" ? "font-bold" : ""
                  }`}
                >
                  Dashboard
                </button>
              ) : (
                ""
              )}
              {!session ? (
                <div className = "flex flex-col space-y-4">
                  <button
                    onClick={() => handleNavigation("/signup")}
                    className="text-gray-800 hover:text-purple-600"
                  >
                    Sign Up
                  </button>

                  <button
                    onClick={() => handleNavigation("/login")}
                    className="text-gray-800 hover:text-purple-600"
                  >
                    Login
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-gray-800 hover:text-purple-600"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
