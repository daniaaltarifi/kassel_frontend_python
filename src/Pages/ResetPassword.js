import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token");
  const [Message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newConfirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${API_URL}/changepassword/resetpassword/${token}`, {
        token,
        newPassword,
      });
      setMessage("Password reset successfully");
      setTimeout(() => {
        navigate(`/${lang}/login`);
      }, 2000);
    } catch (error) {
      setMessage(error.response.data.Error);
    }
  };

  return (
    <div className="container">
      <div id="login-form">
        <h1>
          {" "}
          {lang === "ar" ? "اعادة تعيين كلمة السر" : "Reset Paswword   "}
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            {" "}
            {lang === "ar" ? "كلمة السر:" : "Password:"}
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="password">
            {" "}
            {lang === "ar" ? "تأكيد كلمة السر:" : "Confirm Password: "}
          </label>
          <input
            type="password"
            id="newConfirmPassword"
            name="newConfirmPassword"
            onChange={(e) => setNewConfirmPassword(e.target.value)}
          />
          <input
            type="submit"
            value={lang === "ar" ? "اعادة تعيين كلمة السر" : "Reset Password"}
          />
          {Message && (
            <p style={{ color: "green", fontSize: "14px", marginTop: "3px" }}>
              {Message}
            </p>
          )}

          {/* <button type="submit">Reset Password</button> */}
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
