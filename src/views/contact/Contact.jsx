import React from "react";
import "./Contact.css";
import contectLogo from "../../assets/images/logo/c.png";
import bannerImg from "../../assets/images/banner/ba.png";

export default function Contact() {
  return (
    <>
      <section>
        <div className="container h-[101vh] max-w-full ContactSection">
          <div className="flex justify-between pl-48 pt-20 pr-67">
            <div className="contactForm">
              <img src={contectLogo} alt="logo" className="contactLogo" />
              <p className="welcomeMessage font-inter text-[#353535] mt-4 font-normal w-[428px] text-[20px] leading-[100%] tracking-[0%]">
                Welcome back to CyberCraft Bangladesh, where your creativity
                thrives
              </p>

              <div className="contectForm">
                <div className="mt-12">
                  <label htmlFor="name">Full Name</label> <br />
                  <input
                    type="text"
                    name=""
                    placeholder="Your Full Name"
                    id="inputName"
                    className="bg-white w-[487px] h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px] gap-[10px] mt-1"
                  />{" "}
                </div>
                <br />
                <div className="mt-2">
                  <label htmlFor="email">Email</label> <br />
                  <input
                    type="email"
                    name=""
                    placeholder="example2gmail.com"
                    id=""
                    className="mt-1 bg-white w-[487px] h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px] gap-[10px]"
                  />{" "}
                </div>
                <br />
                <div className="mt-2">
                  <label htmlFor="message">Message</label> <br />
                  <textarea
                    name=""
                    placeholder="Write message"
                    id=""
                    className="mt-1 bg-white w-[487px] h-[139px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px] gap-[10px]"
                  ></textarea>
                </div>
                <br />
                <div className="mt-2">
                  <button className="submitBtn">Submit</button>
                </div>
              </div>
            </div>
            <div className="">
              <img src={bannerImg} alt="" className="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
