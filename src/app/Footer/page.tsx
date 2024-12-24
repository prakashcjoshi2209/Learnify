import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-500 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Tagline */}
        <div>
          <h1 className="text-2xl font-bold">Learnify</h1>
          <p className="mt-2">Consistency is the Key</p>
        </div>

        {/* About Us Section */}
        <div>
          <h2 className="text-lg font-semibold">About Us</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/courses" className="hover:underline">Courses
              </Link>
            </li>
            <li>
              <Link href="/rewards" className="hover:underline">Rewards
              </Link>
            </li>
            <li>
              <Link href="/mentors" className="hover:underline">Mentors
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-lg font-semibold">Support</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/documentation" className="hover:underline">Documentation
              </Link>
            </li>
            <li>
              <Link href="/guide" className="hover:underline">Guide
              </Link>
            </li>
            <li>
              <Link href="/tutorial" className="hover:underline">Tutorial
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center">
              <span>📧</span>
              <Link href="mailto:abc@mail.com" className="ml-2 hover:underline">
                abc@mail.com
              </Link>
            </li>
            <li className="flex items-center">
              <span>📞</span>
              <Link href="tel:+910000000000" className="ml-2 hover:underline">
                +91 0000000000
              </Link>
            </li>
            <li className="flex space-x-4 mt-4">
              <Link href="https://facebook.com" className="hover:underline" aria-label="Facebook">
                  🌐
            
              </Link>
              <Link href="https://twitter.com" className="hover:underline" aria-label="Twitter">
                  🌐
                
              </Link>
              <Link href="https://linkedin.com" className="hover:underline" aria-label="LinkedIn">
                  🌐
            
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center text-sm">
        <p>Design with love © TeamAtEST 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
