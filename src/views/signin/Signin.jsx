import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signin.css";
import signUpLogo from "../../assets/images/logo/c.png";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="pl-[450px]  pt-26">
        <div className="signUp h-[521px] w-[1024px] pl-26  pr-26 flex justify-between ">
          <div className="signupLogo flex justify-center items-center">
            <div className="leftSection ">
              <img src={signUpLogo} alt="" />
              <p className="w-[428px]  text-[20px]  mt-7 text-center text-[#353535]">
                Welcome back to CyberCraft Bangladesh, where your creativity
                thrives
              </p>
            </div>
          </div>
          <div className="signupForm">
            <div className="contectForm">
              <div className="mt-12">
                <label htmlFor="name">Email address</label> <br />
                <input
                  type="email"
                  name=""
                  placeholder="Your Email"
                  id="name"
                  className="bg-white w-[353px] h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px] gap-[10px] mt-1"
                />{" "}
              </div>

              <div className="mt-4 relative">
                <label htmlFor="confirmPassword">Password</label>
                <div className="relative  w-[353px] h-[56px]">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Repeat Password"
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
              <div className="flex mt-3 justify-between w-[353px]">
                <div className="flex">
                  <input type="checkbox" name="" className="circle-checkbox" />{" "}
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

              <div className="mt-5  w-[353px] h-[56px]">
                <button className="submitBtn w-[353px]">Log In</button>
              </div>
              <div className="text-center mt-5 ">
                <p className="signUpBottom">Or</p>
                <p className="login mt-7">
                  Don't have an account? <Link to="/signup"> Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
