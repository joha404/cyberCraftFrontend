import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import signUpLogo from "../../assets/images/logo/c.png";
import axios from "axios";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://cyber-craft-backend.vercel.app/api/signin",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Store token in localStorage or cookie
        const { token } = response.data;
        localStorage.setItem("authToken", token); // Storing the token in localStorage

        // Redirect to the dashboard or home page after successful login
        navigate("/dashboard"); // Change to the route you want to redirect to
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pl-[450px] pt-26">
        <div className="signUp h-[521px] w-[1024px] pl-26 pr-26 flex justify-between">
          <div className="signupLogo flex justify-center items-center">
            <div className="leftSection">
              <img src={signUpLogo} alt="" />
              <p className="w-[428px] text-[20px] mt-7 text-center text-[#353535]">
                Welcome back to CyberCraft Bangladesh, where your creativity
                thrives
              </p>
            </div>
          </div>
          <div className="signupForm">
            <div className="contectForm">
              {/* Email Field */}
              <div className="mt-12">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  id="email"
                  className="bg-white w-[353px] h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px] gap-[10px] mt-1"
                />
              </div>

              {/* Password Field */}
              <div className="mt-4 relative">
                <label htmlFor="password">Password</label>
                <div className="relative w-[353px] h-[56px]">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="Enter Password"
                    className="mt-1 bg-white w-[353px] h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px] pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-4 mt-2 flex items-center text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fa-solid ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex mt-3 justify-between w-[353px]">
                <div className="flex">
                  <input type="checkbox" name="" className="circle-checkbox" />
                  <label htmlFor="checkbox" className="mx-3 checkboxLabel">
                    Remember Me
                  </label>
                </div>
                <p>
                  <a href="#" className="forgot">
                    Forgot password?
                  </a>
                </p>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 mt-2">{error}</p>}

              {/* Submit Button */}
              <div className="mt-5 w-[353px] h-[56px]">
                <button
                  onClick={submitForm}
                  className="submitBtnl w-[353px]"
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Log In"}
                </button>
              </div>

              {/* Bottom Links */}
              <div className="text-center mt-5">
                <p className="signUpBottom">Or</p>
                <p className="login mt-7">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
