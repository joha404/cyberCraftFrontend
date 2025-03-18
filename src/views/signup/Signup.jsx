import React, { useState } from "react";
import "./Signup.css";
import signUpLogo from "../../assets/images/logo/c.png";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="signUp h-[654px] w-[1024px] p-8 flex justify-between bg-white shadow-lg rounded-lg">
        {/* Left Section */}
        <div className="signupLogo flex flex-col justify-center items-center">
          <img src={signUpLogo} alt="Sign Up Logo" className="w-32 h-auto" />
          <p className="w-[428px] text-[20px] mt-7 text-center text-[#353535]">
            Welcome back to CyberCraft Bangladesh, where your creativity thrives
          </p>
        </div>

        {/* Right Section - Signup Form */}
        <div className="signupForm w-1/2">
          <div className="contactForm">
            {/* Full Name */}
            <div className="mt-6">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your Full Name"
                className="mt-1 bg-white w-full h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px]"
              />
            </div>

            {/* Email */}
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 bg-white w-full h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px]"
              />
            </div>

            {/* Create Password */}
            <div className="mt-4 relative">
              <label htmlFor="createPassword">Create Password</label>
              <div className="relative">
                <input
                  type={showCreatePassword ? "text" : "password"}
                  id="createPassword"
                  placeholder="Must be 8 characters"
                  className="mt-1 bg-white w-full h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px] pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                  onClick={() => setShowCreatePassword(!showCreatePassword)}
                >
                  <i
                    className={`fa-solid ${
                      showCreatePassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mt-4 relative">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Repeat Password"
                  className="mt-1 bg-white w-full h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px] pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i
                    className={`fa-solid ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-5">
              <button className="w-full h-[56px] bg-blue-600 text-white rounded-[10px] hover:bg-blue-700 transition">
                Create Account
              </button>
            </div>

            {/* Bottom Links */}
            <div className="text-center mt-5">
              <p className="text-gray-500">Or</p>
              <p className="mt-4">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
