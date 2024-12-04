import React, { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import emailjs from "emailjs-com"; // Import EmailJS

function Contacts() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const contact = portfolioData.contacts && portfolioData.contacts[0];

  // Safely extract values
  const fullName1 = contact?.fullName || "";
  const email1 = contact?.email || "";
  const message1 = contact?.message || "";

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const { fullName, email, message } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: fullName,
      from_email: email,
      message: message,
    };

    // Send email using EmailJS
    emailjs
      .send(
        "abdou1692003", // Replace with your EmailJS Service ID
        "template_gf8hkr9", // Replace with your EmailJS Template ID
        templateParams,
        "FFSbpaiX3JiQWcCCh" // Replace with your EmailJS User ID
      )
      .then(
        (response) => {
          console.log("Message sent successfully", response);
          alert("Message sent successfully!");
          setFormData({ fullName: "", email: "", message: "" });
        },
        (error) => {
          console.error("Failed to send message", error);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div
      id="contact"
      className="bg-primary min-h-screen flex items-center justify-center px-8 py-10 text-center"
    >
      <div className="w-full max-w-screen-xl">
        <SectionTitle title="Contact Me" />

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-md space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="text-gray-300 text-lg font-semibold"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-gray-700 text-white rounded-lg"
                placeholder="Your Full Name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-gray-300 text-lg font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-gray-700 text-white rounded-lg"
                placeholder="Your Email Address"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="text-gray-300 text-lg font-semibold"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={message}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 bg-gray-700 text-white rounded-lg"
              placeholder="Write your message here"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-400 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Social Media Icons */}
        <div className="mt-10">
          <h3 className="text-xl text-gray-200 font-semibold mb-4">
            Connect with me
          </h3>
          <div className="flex justify-center gap-6">
            <a
              href={fullName1}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-gray-200 hover:text-yellow-500 transition duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href={email1}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-gray-200 hover:text-yellow-500 transition duration-300"
            >
              <FaGithub />
            </a>
            <a
              href={message1}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-gray-200 hover:text-yellow-500 transition duration-300"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
