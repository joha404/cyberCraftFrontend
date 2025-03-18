import React, { useState } from "react";
import femaleUser from "../../assets/images/users/female.png";
import "../Navbar.css";
import { useNavigate } from "react-router-dom"; // To redirect to login page after logout

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // Perform logout actions, e.g., remove token from localStorage
    localStorage.removeItem("authToken"); // Example: removing the auth token
    navigate("/logout"); // Redirect to the login page
  };

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className=" mx-auto px-0.5 sm:px-1 lg:px-14">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 flex-grow justify-end">
            <form className="relative SearchForm">
              <input
                type="text"
                id="searchInput"
                className=" "
                placeholder="Search"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
              </button>
            </form>
            <a className="text-gray-700 hover:text-gray-500" href="#">
              <i className="fa-solid fa-bell text-lg" id="bellIcon"></i>
              <sup className="text-xs bg-red-500 text-white px-1 rounded-full">
                2
              </sup>
            </a>
            <div className="hidden md:flex items-center relative">
              <div className="NavText mx-2">
                <p>Hello World</p>
                <span>Admin</span>
              </div>
              <a
                href="#"
                className="flex items-center mx-1"
                onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown
              >
                <img
                  src={femaleUser}
                  alt="User"
                  className="h-10 w-10 rounded-full"
                />
              </a>
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute top-14 right-0 bg-white shadow-lg rounded-md w-[150px] py-2 mt-2">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={handleLogout} // Logout handler
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg w-full px-4 pb-4">
          <form className="relative w-full max-w-sm mx-auto mb-4">
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
              placeholder="Search"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            </button>
          </form>
          <a
            className="block text-gray-700 hover:text-gray-500 py-2 text-center"
            href="#"
          >
            <i className="fa-solid fa-bell text-lg"></i>
            <sup className="text-xs bg-red-500 text-white px-1 rounded-full">
              2
            </sup>
          </a>
          <div className="flex flex-col items-center mt-3">
            <p className="text-gray-700 text-sm">Hello, Admin</p>
            <a href="#">
              <img
                src={femaleUser}
                alt="User"
                className="h-12 w-12 rounded-full mt-2"
              />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
