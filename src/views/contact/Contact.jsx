import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import contectLogo from "../../assets/images/logo/c.png";
import bannerImg from "../../assets/images/banner/ba.png";
import "./Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before submitting
    if (!name || !email || !message) {
      setError("All fields are required.");
      return;
    }

    // Clear previous errors and start loading
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://cyber-craft-backend.vercel.app/message/create",
        {
          name,
          email,
          message,
        }
      );

      // On successful submission, redirect to the signup page
      navigate("/signup");
    } catch (err) {
      setError("Error submitting message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
              <form onSubmit={handleSubmit}>
                <div className="mt-12">
                  <label htmlFor="name">Full Name</label> <br />
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name"
                    id="inputName"
                    className="bg-white w-[487px] h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px] gap-[10px] mt-1"
                  />
                </div>

                <div className="mt-2">
                  <label htmlFor="email">Email</label> <br />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example2@gmail.com"
                    className="mt-1 bg-white w-[487px] h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px] gap-[10px]"
                  />
                </div>

                <div className="mt-2">
                  <label htmlFor="message">Message</label> <br />
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message"
                    className="mt-1 bg-white w-[487px] h-[139px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px] gap-[10px]"
                  ></textarea>
                </div>

                {error && (
                  <p className="text-red-500 mt-2">{error}</p> // Display error if any
                )}

                <div className="mt-2">
                  <button
                    type="submit"
                    className="submitBtn"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="">
            <img src={bannerImg} alt="Banner" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
