import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const ForgetPassword = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const [email, setEmail] = useState("");
  const [Message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/changepassword/forgotpassword`, { email });
      setMessage("Reset link sent to your email");
    } catch (error) {
      setMessage(error.response.data.Error);
    }
  };

  return (
    <div className="container">
      <div id="login-form">
        <h1> {lang === "ar" ? "نسيت كلمة السر" : "Forget Password"}</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            {" "}
            {lang === "ar" ? "البريد الالكتروني" : "Email"}
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <button type="submit">Send Reset Link</button> */}
          <input type="submit" value={lang === "ar" ? "ارسال" : "Submit"} />
          {Message && (
            <p style={{ color: "green", fontSize: "14px", marginTop: "13px" }}>
              {Message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
export default ForgetPassword;
