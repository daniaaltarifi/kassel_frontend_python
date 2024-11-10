import React, { useRef, useEffect, useState } from "react";
import "../Css/navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
function Navbar() {
  const navbarRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const lang = location.pathname.split("/")[1] || "en"; // Get the language from the path, default to 'en'
  const API_URL = process.env.REACT_APP_API_URL;
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(lang); // Default to English
  const [user,setUser ]= useState("") // access user
  const handleSelection = (event) => {
    const newLang = event.target.value;
    setSelectedOption(newLang);
    setDropdownVisible(false);
    // Update the URL using React Router
    navigate(`/${newLang}`);
  };

  const getIconClass = () => {
    switch (selectedOption) {
      case "en":
        return "bi bi-globe2"; // Icon for English
      case "ar":
        return "bi bi-globe"; // Icon for French
      default:
        return "bi bi-globe2";
    }
  };

  const handleLinkClick = () => {
    if (navbarRef.current.classList.contains("show")) {
      navbarRef.current.classList.remove("show");
    }
    const navbarToggle = document.querySelector(".navbar-toggler");
    if (navbarToggle) {
      navbarToggle.click();
    }
  };

  // Add shadow on scroll
  useEffect(() => {
    const userId = localStorage.getItem('isAuthenticated');
setUser(userId)
    const handleScroll = () => {
      if (window.scrollY > 0) {
        navbarRef.current.classList.add("navbar-shadow");
      } else {
        navbarRef.current.classList.remove("navbar-shadow");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("isAuthenticated");
      setUser(null)
      navigate(`${lang}/login`);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

 

  // const handleUsersCodes = async () => {
  //   if (user) {
  //     try {
  //       const response = await axios.get(`${API_URL}/codes/verifyuserhascode/${user}`);
  //       if (response.data.codes && response.data.codes.length > 0) {
  //         navigate(`/${lang}/formdata`); // Navigate directly if user has a code
  //       } else {
  //         navigate(`/${lang}/validatecode`); // Navigate to validate code if no code
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user codes:", error);
  //     }
  //   }
  // };
  const handleUsersCodes = async () => {
    if (user) {
        try {
            const response = await axios.get(`${API_URL}/codes/verifyuserhascode/${user}`);
            const codes = response.data.codes;

            if (codes && codes.length > 0) {
                // Check if there are valid codes
                const now = new Date();
                const hasValidCode = codes.some(code => new Date(code.exp_date) > now);

                if (hasValidCode) {
                    navigate(`/${lang}/formdata`); // Navigate if there's a valid code
                } 
            } else {                
                navigate(`/${lang}/validatecode`); // Navigate to validate code if no codes
            }
        } catch (error) {
            console.error("Error fetching user codes:", error);
        }
    }
};


  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top navbar-ltr"
      ref={navbarRef}
    >
      <div className="container-fluid ms-5 mt-4">
        {/* Logo on the left */}
        <div className="toggle_sm ">
          <Link to={`/${lang}`} className="navbar-brand">
            <img
              src={require("../assets/kassel_logo3.webp")}
              alt="logo ba9ma"
              className="logo_size img_icon_navbar"
            />
          </Link>

          {/* Toggle button for small screens */}
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Navigation items */}
        <div
          className={`collapse navbar-collapse justify-content-center ${
            lang === "ar" ? "rtl" : "ltr"
          }`}
          id="navbarSupportedContent"
          ref={navbarRef}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to={`/${lang}`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`${lang}/about`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "حول" : "About"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/${lang}/services`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "الخدمات" : "Services"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`${lang}/blogs`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "المدونة" : "Blog"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`${lang}/careers`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "الوظائف" : "Career"}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to={`${lang}/contact`}
                className="nav-link text_navbar"
                onClick={handleLinkClick}
              >
                {lang === "ar" ? "اتصل بنا" : "Contact"}
              </Link>
            </li>
          
            <li className="nav-item">
  <Link
    className="nav-link text_navbar"
    onClick={(e) => {
      e.preventDefault(); 
      if (user) {
        handleUsersCodes(); // Check if user has a code
      } else {
        navigate(`/${lang}/login`); // Navigate to login if not authenticated
      }
    }}
  >
    {lang === "ar" ? "ارسال واتساب" : "WhatsApp"}
  </Link>
</li>
  {user && (
    <Link
      className="nav-link text_navbar"
      onClick={handleLogout}
    >
      {lang === "ar" ? "تسجيل خروج" : "Logout"}
    </Link>
  )}

          </ul>

          <i className={getIconClass()} onClick={toggleDropdown}></i>
          <div
            className="dropdown-container border-none"
            onClick={toggleDropdown}
          >
            <div className="dropdown-wrapper">
              <select
                className="form-select small-select"
                value={selectedOption}
                onChange={handleSelection}
              >
                <option value="en">en</option>
                <option value="ar">ar</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
