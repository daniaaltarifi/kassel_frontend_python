import React, { useEffect, useState } from "react";
import "../Css/login.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import DeviceDetector from 'device-detector-js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFlag, setEmailFlag] = useState(true);
  const [passwordFlag, setPasswordFlag] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  const [correctPassword, setCorrectPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const getDeviceInfo = () => {
    const deviceDetector = new DeviceDetector();
    const userAgent = navigator.userAgent;
    const device = deviceDetector.parse(userAgent);
  
    return {
      deviceType: device.device.type || 'unknown',
      os: device.os.name || 'unknown',
      osVersion: device.os.version || 'unknown',
      browser: device.client.name || 'unknown',
      browserVersion: device.client.version || 'unknown',
    };
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validatePassword = (password) => {
    return password.trim() !== "";
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    validateUser();
  };

  const validateUser = async () => {
    const passwordIsValid = validatePassword(password);
    setCorrectPassword(true); // Reset the password validation flag

    if (passwordIsValid) {
      setEmailFlag(true);
      setPasswordFlag(true);
      await submitUser();
    } else {
      setEmailFlag(true);
      setPasswordFlag(false);
    }
  };

  // const submitUser = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${API_URL}/auth/login/post`,
  //       { email, password },
  //       { withCredentials: true }
  //     );
  //     if (response.data.Status === "Login Succses") {
  //       setUser(response.data); // set user data in context
  //       navigate(`/${lang}/validatecode`);
  //     } else {
  //       if (response.data.Error === "Incorect Password") {
  //         setCorrectPassword(false);
  //       } else if (response.data.Error === "No email exists") {
  //         setEmailFlag(false);
  //       }
  //     }
  //   } catch (error) {
  //     setErrorMessage("Login error. Please try again.");

  //     console.error("Login error:", error);
  //   }
  // };
 
  
  
  const submitUser = async () => {
    const deviceInfo = getDeviceInfo(); // Get device info
    try {
      const response = await axios.post(
        `${API_URL}/auth/login/post`,
        {
          email,
          password,
          device_type: deviceInfo, // Only send device type as a string
        },
        { withCredentials: true }
      );
  
      if (response.data.Status === "Login Success") {
        localStorage.setItem("isAuthenticated", response.data.id); // Correctly store user ID
          const user_id = response.data.id; // Directly use response data for the user ID
  
        const codesResponse = await axios.get(`${API_URL}/codes/verifyuserhascode/${user_id}`);
  
        if (codesResponse.data.codes && codesResponse.data.codes.length > 0) {
          const now = new Date();
          const hasValidCode = codesResponse.data.codes.some(code => new Date(code.exp_date) > now);

          if (hasValidCode) {
              navigate(`/${lang}/formdata`); // Navigate if there's a valid code
          }         }
           else {
          navigate(`/${lang}/validatecode`); // Navigate to validate code if no code
        }
        window.location.reload();

      } else {
        // Handle different error messages from the server
        switch (response.data.Error) {
          case "Incorrect Password":
            setCorrectPassword(false);
            break;
          case "No email exists":
            setEmailFlag(false);
            break;
          case "Login not allowed from this device":
            setErrorMessage("Login not allowed from this device.");
            break;
          default:
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    } catch (error) {
      setErrorMessage("Login error. Please try again.");
      console.error("Login error:", error);
    }
  };
  
  
  
  
  return (
    <div className="container">
      <div id="login-form">
        <h1>{lang === "ar" ? "تسجيل دخول" : "Login"}</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">
            {lang === "ar" ? "البريد الالكتروني:" : "Email:"}
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">
            {lang === "ar" ? "كلمة السر:" : "Password:"}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            // value={password}
            onChange={handlePasswordChange}
          />
          <Link
            to={`/${lang}/forgetpassword`}
            style={{ textDecoration: "none" }}
          >
            <p className="dont_have_acc_login ">
              {lang === "ar" ? "نسيت كلمة السر ؟" : "Forget Password ?"}
            </p>
          </Link>
          {!correctPassword && (
            <p style={{ color: "red", fontSize: "14px" }}>Incorrect Password</p>
          )}
          {!emailFlag && (
            <p style={{ color: "red", fontSize: "14px" }}>Email not found.</p>
          )}
          {errorMessage && (
            <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>
          )}
          <input
            type="submit"
            value={lang === "ar" ? "تسجيل دخول" : "Submit"}
          />
          <Link to={`/${lang}/signup`} style={{ textDecoration: "none" }}>
            <p className="dont_have_acc_login ">
              {lang === "ar" ? (
                "ليس لديك حساب ؟ تسجيل حساب"
              ) : (
                <span>
                  Don't have an account? <u>Signup</u>
                </span>
              )}
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
