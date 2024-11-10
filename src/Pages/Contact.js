import React, { useState, useEffect } from "react";
import "../Css/contact.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Mainbackground from "../components/Mainbackground";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
function Contect() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // State to store success or error messages
  const [responseMessage, setResponseMessage] = useState("");
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const [contactFooter, setContactFooter] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAllData = async () => {
      try {
        const contactFooterRes = await axios.get(
          `${API_URL}/contactfooter/${lang}`
        );
        setContactFooter(contactFooterRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/contactForm/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // On success, clear form and display success message
        setFormData({ name: "", email: "", phone: "", message: "" });
        setResponseMessage(
          lang === "ar"
            ? "تم إرسال رسالتك بنجاح!"
            : "Your message has been sent successfully!"
        );

        // Hide alert after 5 seconds
        setTimeout(() => {
          setResponseMessage("");
        }, 5000); // 5000 ms = 5 seconds
      } else {
        // Handle errors from backend
        setResponseMessage(data.error || "Something went wrong!");

        // Hide alert after 5 seconds
        setTimeout(() => {
          setResponseMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage(
        lang === "ar"
          ? "خطأ في إرسال النموذج. يرجى المحاولة مرة أخرى."
          : "Error sending the form. Please try again."
      );

      // Hide alert after 5 seconds
      setTimeout(() => {
        setResponseMessage("");
      }, 5000);
    }
  };

  const path = "contact";
  return (
    <>
      <Mainbackground path={path} />

      <div className="container mt-5 container-contact">
        <div className="row">
          <div className="col-md-6 bg-primary p-5 order-sm-first order-last">
            <p className="p-contactUs">
              {lang === "ar" ? "ابقى على اتصال" : "Stay Connected"}
            </p>
            <h1>{lang === "ar" ? "اتصل بنا" : "Contact Us"}</h1>

            <>
              {contactFooter.length > 0 && (
                <>
                  {/* Display all matching locations */}
                  {/* Display all matching locations */}
                  <div className="contact-item mt-5 d-flex align-items-center">
                    <div className="icon-circle d-flex align-items-center justify-content-center">
                      <img
                        src={require("../assets/placeholder-icon.webp")}
                        alt="Location Icon"
                        className="icon-image"
                      />
                    </div>
                    <div className="ms-3">
                      <h3 className="mb-3">
                        {lang === "ar" ? "الموقع" : "Location:"}
                      </h3>
                      <p className="mb-0">
                        {contactFooter
                          .filter(
                            (item) =>
                              item.link &&
                              item.link.includes(
                                "maps.app.goo.gl"
                              )
                          ) // Check for Google Maps embed link
                          .map((location, index) => (
                            <span key={index}>
                              {location.subtitle}
                              <br />
                            </span>
                          ))}
                      </p>
                    </div>
                  </div>

                  {/* Display all matching phone numbers */}
                  <div className="contact-item mt-5 d-flex align-items-center">
                    <div className="icon-circle d-flex align-items-center justify-content-center ">
                      <img
                        src={require("../assets/call-icon.png")}
                        alt="Phone Icon "
                        className="icon-image "
                      />
                    </div>
                    <div className="ms-3">
                      <h3 className="mb-4">
                        {lang === "ar" ? "الرقم" : "Phone:"}
                      </h3>
                      <p className="mb-0">
                        {contactFooter
                          .filter((item) => /^[\d\s]+$/.test(item.subtitle)) // Find all phone numbers with only digits and spaces
                          .map((phone, index) => (
                            <span key={index}>
                              {phone.subtitle}
                              <br />
                            </span>
                          ))}
                        {/* Default phone number if none found */}
                        {!contactFooter.some((item) =>
                          /^[\d\s]+$/.test(item.subtitle)
                        ) && "+962 790025554"}
                      </p>
                    </div>
                  </div>
                
                  {/* Display all matching emails */}
                  <div className="contact-item mt-5 d-flex align-items-center">
                    <div className="icon-circle d-flex align-items-center justify-content-center">
                      <img
                        src={require("../assets/letter-icon.webp")}
                        alt="Email Icon"
                        className="icon-image"
                      />
                    </div>
                    <div className="ms-3">
                      <h3 className="mb-3">
                        {lang === "ar" ? "الايميل" : "Email:"}
                      </h3>
                      <p className="mb-0">
                        {contactFooter
                          .filter((item) => item.subtitle.includes("@")) // Find all emails containing '@'
                          .map((email, index) => (
                            <span key={index}>
                              {email.subtitle}
                              <br />
                            </span>
                          ))}
                        {/* Default email if none found */}
                        {!contactFooter.some((item) =>
                          item.subtitle.includes("@")
                        ) && "kasselsoft@kasselsoft.com"}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>

            <div className="col-md-6 col-lg-4 ml-lg-0 mt-5 text-center text-md-end d-flex order-sm-first order-last">
              {/* Facebook */}
              <a className="btn btn-floating m-2 social-icon" role="button">
                <i className="bi bi-facebook" />
              </a>

              {/* Twitter */}
              <a className="btn btn-floating m-2 social-icon" role="button">
                <i className="bi bi-twitter" />
              </a>

              {/* Google */}
              <a className="btn btn-floating m-2 social-icon" role="button">
                <i className="bi bi-google" />
              </a>

              {/* Instagram */}
              <a className="btn btn-floating m-2 social-icon" role="button">
                <i className="bi bi-instagram" />
              </a>
            </div>
          </div>
          <div className="col-md-6 mt-5 ">
            <form onSubmit={handleSubmit} className="px-4 pt-3 animated-form">
              <h1>{lang === "ar" ? "اترك لنا رسالة" : "Drop us a line"}</h1>
              <p className="p-contact">
                {lang === "ar"
                  ? "املأ معلوماتك وسنتصل بك قريبًا"
                  : "Fill in your information and we will contact you soon"}
              </p>
              <div
                className="col-md-12 animated-input"
                style={{ animationDelay: "0.2s" }}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={lang === "ar" ? "اسمك" : "Your Name"}
                  className="form-control  mb-3 styled-input"
                  required
                />
              </div>
              <div
                className="col-md-12 animated-input"
                style={{ animationDelay: "0.4s" }}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={
                    lang === "ar" ? "بريدك الإلكتروني" : "Your Email"
                  }
                  className="form-control  mb-3 styled-input"
                  required
                />
              </div>
              <div
                className="col-md-12 animated-input"
                style={{ animationDelay: "0.6s" }}
              >
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={lang === "ar" ? "رقم هاتفك" : "Your Phone"}
                  className="form-control  mb-3 styled-input"
                  required
                />
              </div>
              <div
                className="col-md-12 animated-input"
                style={{ animationDelay: "0.8s" }}
              >
                <textarea
                  name="message"
                  rows={8}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={lang === "ar" ? "رسالتك" : "Your Message"}
                  className="form-control  mb-3 styled-input"
                  required
                />
              </div>
              <div
                className="col-md-12 animated-input"
                style={{ animationDelay: "1s" }}
              >
                <button type="submit" className="btn btn-primary   mb-3 mt-3">
                  {lang === "ar" ? "إرسال" : "SUBMIT"}
                </button>
              </div>
              {responseMessage && (
                <div className="alert alert-success mt-3">
                  {responseMessage}
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="map mt-5">
          {contactFooter
            .filter(
              (item) =>
                item.link &&
                item.link.includes("https://www.google.com/maps/embed")
            ) // Check for Google Maps embed link
            .map((location, index) => (
              <iframe
                key={index}
                src={location.link} // Use the fetched link
                width="100%"
                height="400px"
                frameBorder={0}
                style={{ border: 0 }}
                allowFullScreen=""
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Contect;
