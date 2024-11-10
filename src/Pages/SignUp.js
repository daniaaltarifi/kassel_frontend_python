import React, { useState, useEffect } from "react";
import "../Css/login.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const lang = location.pathname.split("/")[1] || "en";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    submitUser();
  };

  const submitUser = async () => {
    if (password !== confirmpassword) {
      return setErrorMessage("Passwords do not match.");
    }

    try {
      const response = await axios.post(
        `${API_URL}/auth/signup/post`,
        { name, email, password },
        { withCredentials: true }
      );

      if (response.data.Status === "SignUp Success") {
        localStorage.setItem("isAuthenticated", "true");
        navigate(`/${lang}/login`);
      } else {
        setErrorMessage(response.data.Error || "An unknown error occurred.");
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data
          : "An error occurred. Please try again.";
      setErrorMessage(errorMessage);
      console.error("Signup error:", error);
    }
  };
  return (
    <div className="container">
      <div id="login-form">
        <h1> {lang === "ar" ? " تسجيل حساب" : "Sign Up"}</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">
            {" "}
            {lang === "ar" ? "الاسم:" : "Name:"}
          </label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">
            {" "}
            {lang === "ar" ? "البريد الالكتروني:" : "Email:"}
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">
            {" "}
            {lang === "ar" ? "كلمة السر:" : "Password:"}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmpassword">
            {" "}
            {lang === "ar" ? "تأكيد كلمة السر:" : "Confirm Password:"}
          </label>
          <input
            type="password"
            id="confirmpassword"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            required
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <input
            type="submit"
            value={lang === "ar" ? "تسجيل حساب" : "Submit"}
          />
          <Link to={`/${lang}/login`} style={{ textDecoration: "none" }}>
            {" "}
            <p className="dont_have_acc_login ">
              {lang === "ar" ? (
                " لديك حساب ؟ تسجيل دخول"
              ) : (
                <span>
                  Already have an account <u>Login</u>
                </span>
              )}
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
