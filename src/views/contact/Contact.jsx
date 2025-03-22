import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import contectLogo from "../../assets/images/logo/c.png";
import bannerImg from "../../assets/images/banner/ba.png";
import "./Contact.css";
import Swal from "sweetalert2";
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 📄 Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Contact Form Submission", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${name || "N/A"}`, 20, 40); // Ensure name is not empty
    doc.text(`Email: ${email || "N/A"}`, 20, 50); // Ensure email is not empty

    doc.text("Message:", 20, 60);

    if (message.trim() === "") {
      doc.text("No message provided.", 20, 70);
    } else {
      const splitMessage = doc.splitTextToSize(message, 170);
      doc.text(splitMessage, 20, 70);
    }

    // Generate Blob
    const pdfBlob = doc.output("blob");

    return pdfBlob;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const pdfBlob = generatePDF();

      // Convert Blob to File
      const pdfFile = new File([pdfBlob], "contact_form.pdf", {
        type: "application/pdf",
      });

      const formData = new FormData();
      formData.append("pdf", pdfFile); // Append as a File
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);

      const response = await axios.post(
        "http://localhost:3000/message/send-email",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Message Sent Successfully!",
          icon: "success",
          draggable: true,
        });
        navigate("/signup");
      }
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
              thrives.
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
                    className="mt-1 bg-white w-full h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px]"
                  />
                </div>

                <div className="mt-2">
                  <label htmlFor="email">Email</label> <br />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="mt-1 bg-white w-full h-[56px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px]"
                  />
                </div>

                <div className="mt-2">
                  <label htmlFor="message">Message</label> <br />
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message"
                    className="mt-1 bg-white w-full h-[136px] outline outline-1 outline-[#d8dadc] border-none rounded-[10px] px-4 py-[18px]"
                  ></textarea>
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}

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

          <div>
            <img src={bannerImg} alt="Banner" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
