import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="border-t-8 border-teal-500 shadow-md mt-10">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6">
        {/* Top section: Logo + Links */}
        <div className="flex flex-col sm:flex-row sm:justify-between flex-wrap gap-6">
          {/* Logo */}
          <div className="mb-4 sm:mb-0">
            <Link
              to="/"
              className="text-lg sm:text-xl font-semibold whitespace-nowrap dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Vibha's
              </span>{' '}
              Blog
            </Link>
          </div>

          {/* Link Groups */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* About Section */}
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-white">About</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <Link to="/about" className="hover:underline">
                    Vibha's Blog
                  </Link>
                </li>
                <li className="mb-2">
                  <a href="mailto:musicwoaria@gmail.com" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us Section */}
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow Us</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <a
                    href="https://www.linkedin.com/in/vibha-joshi-873a78208/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://github.com/vibhajoshi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{' '}
          <Link to="/" className="hover:underline">
            Vibha's Blog
          </Link>. All Rights Reserved.
        </div>

        {/* Social Icons Row */}
        <div className="flex justify-center gap-6 mt-6 flex-wrap">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-2xl hover:text-blue-800"
            aria-label="Facebook"
          >
            <BsFacebook />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 text-2xl hover:text-pink-800"
            aria-label="Instagram"
          >
            <BsInstagram />
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 text-2xl hover:text-sky-700"
            aria-label="Twitter"
          >
            <BsTwitter />
          </a>
          <a
            href="https://www.github.com/vibhajoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 text-2xl hover:text-black dark:hover:text-white"
            aria-label="Github"
          >
            <BsGithub />
          </a>
          <a
            href="https://www.dribbble.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 text-2xl hover:text-pink-700"
            aria-label="Dribbble"
          >
            <BsDribbble />
          </a>
        </div>
      </div>
    </Footer>
  );
}
