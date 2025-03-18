import React from "react";
import signUpLogo from "../../assets/images/logo/c.png";
import "./Logout.css";
import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <>
      <div className="max-w-full mt-[72px] h-[92vh] bg-[#f3f4f6] flex justify-center items-center">
        <div className="logoutContent pt-5 w-[732px] h-[460px] text-center">
          <div className="logoImg mt-10 flex w-full justify-center">
            <img src={signUpLogo} alt="Company Logo" />
          </div>
          <div className="logoutBottom w-full flex justify-center">
            <p className="w-[570px] mt-7 text-center text-[#605D5D]">
              Thank you so much for your nice contribution today.
            </p>
          </div>
          <div className="logoutBtn w-full mt-7 flex justify-center ">
            <button>
              {" "}
              <Link to="/signin"> Go Back to Login </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
