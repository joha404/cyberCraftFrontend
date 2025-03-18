import React, { useState } from "react";
import "./Signup.css";
import signUpLogo from "../../assets/images/logo/c.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear any previous errors
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://cyber-craft-backend.vercel.app/api/signup",
        {
          name,
          email,
          password,
        }
      );

      // On successful sign-up, redirect to login

      navigate("/signin"); // Redirect to sign-in page
    } catch (err) {
      setError("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

            {/* Error message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Submit Button */}
            <div className="mt-5">
              <button
                onClick={handleSubmit}
                className="w-full h-[56px] bg-blue-600 text-white rounded-[10px] hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
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
