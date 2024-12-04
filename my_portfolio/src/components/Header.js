import React, { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUrl = window.location.origin;
  return (
    <header className="bg-primary text-white py-4 px-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-wide text-red-700">
          Abderrahmen.Z
        </h1>

        {/* Hamburger Menu Button */}
        <button
          className="sm:hidden block text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`sm:flex sm:space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          } sm:block`}
        >
          <ul
            className={`flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0`}
          >
            <li>
              <a
                href="#about"
                className="text-secondary hover:text-white transition duration-300 cursor-pointer"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="text-secondary hover:text-white transition duration-300 cursor-pointer"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="text-secondary hover:text-white transition duration-300 cursor-pointer"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-secondary hover:text-white transition duration-300 cursor-pointer"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href={`${currentUrl}/admin-login`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white transition duration-300 cursor-pointer"
              >
                Dashboard
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
