import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Css/footer.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

function Footer() {
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const [staticFooter, setStaticFooter] = useState([]);
  const [contactFooter, setcontactFooter] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [erroremail, seterroremail] = useState("");
const [email,setemail]=useState("")
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    
    
    const fetchAllData = async () => {
      try {
        const [staticFooterRes, contactFooterRes] = await Promise.all([
          axios.get(`${API_URL}/footer/${lang}`),
          axios.get(`${API_URL}/contactfooter/${lang}`),
        ]);

        setStaticFooter(staticFooterRes.data);
        setcontactFooter(contactFooterRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);
  const scrolltoTop = () => [window.scrollTo(0, 0)];
  const [showButtons, setShowButtons] = useState(false);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };
  const buttons = [
    {
      link: "https://wa.me/962790039555?src=qr",
      icon: "bi bi-whatsapp icon_footer_fixed"
    },
    {
      link: "https://www.instagram.com/_kassel_/?igsh=MWRjcHk5MGJtYWVmcw%3D%3D",
      icon: "bi bi-instagram icon_footer_fixed"
    },
    {
      link: "https://www.facebook.com/people/kasselsoft/61555183182719/?mibextid=PlNXYD",
      icon: "bi bi-facebook icon_footer_fixed"
    },
    {
      link: "https://www.linkedin.com/company/kasselsoft/",
      icon: "bi bi-linkedin icon_footer_fixed"
    }
  ];
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubscribe = async () => {
      if (!isValidEmail(email)) {
          seterroremail("Invalid email address")
          return;
      }
      try {
          const response = await axios.post(`${API_URL}/subscribe/add`, { email: email });
          setemail(" ");
          seterroremail(" ")
      } catch (error) {
        if (error.response && error.response.status === 409) {
          seterroremail("Email already subscribed")
      } else {
          console.log(`Error fetching post data: ${error.response?.data?.message || error.message}`);
      }      }
  };
  
  return (
    <>
      {/* Remove the container if you want to extend the Footer to full width. */}
      <div className=" my-0 footer mt-5">
        {/* Footer */}
        <footer>
          {/* Grid container */}
          <div className="container p-4 pb-0">
            {/* Section: Links */}
            <section className="">
              {/*Grid row*/}
              <div className="row">
                {/* Grid column */}
                {staticFooter.map((mainfooter) => (
                  <div
                    className="col-md-6 col-lg-3 col-xl-3 mx-auto mt-3"
                    key={mainfooter.id}
                  >
                    <h1
                      className="text-uppercase mb-4 font-weight-bold"
                      style={{ fontSize: "35px" }}
                    >
                      {mainfooter.logo}
                    </h1>
                    <p>{mainfooter.description}</p>

                    <form id="emailForm">
                      <div className="input-group mb-3">
                        <button
                          className="btn "
                          type="button"
                          id="emailSubmit"
                          onClick={handleSubscribe}
                          style={{
                            background: "rgb(60 102 171)",
                            color: "white",
                          }}
                        >
                          Submit
                        </button>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          aria-label="Email"
                          required
                          value={email}
                          style={{ boxShadow: "none" }}
                          onChange={(e)=>{setemail(e.target.value)}}
                        />
                      
                      </div>
                      <p style={{color:"red",fontSize:"13px"}}>

{erroremail !==null ? erroremail:" "}
                      </p>
                    </form>
                  </div>
                ))}
                {/* Grid column */}
                <hr className="w-100 clearfix d-md-none" />
                {/* Grid column */}
                {staticFooter.map((mainfooter) => (
                  <div
                    className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3"
                    key={mainfooter.id}
                  >
                    <h6 className="text-uppercase mb-4 font-weight-bold">
                      {mainfooter.support}
                    </h6>
                    <Link to={`${lang}/${mainfooter.terms_link}`}>
                      <p>{mainfooter.terms}</p>
                    </Link>
                    <Link to={`${lang}${mainfooter.privacy_link}`}>
                      <p>{mainfooter.privacy}</p>
                    </Link>
                    <Link to={`${lang}${mainfooter.contact_link}`}>
                      <p>{mainfooter.contact}</p>
                    </Link>
                  </div>
                ))}

                {/* Grid column */}
                <hr className="w-100 clearfix d-md-none" />
                {/* Grid column */}
                {staticFooter.map((mainfooter) => (
                  <div
                    className="col-md-6 col-lg-2 col-xl-2 mx-auto mt-3"
                    key={mainfooter.id}
                  >
                    <h6 className="text-uppercase mb-4 font-weight-bold">
                      {mainfooter.company}
                    </h6>
                    <Link to={`${lang}${mainfooter.home_link}`}>
                      <p>{mainfooter.home}</p>
                    </Link>
                    <Link to={`${lang}${mainfooter.services_link}`}>
                      <p>{mainfooter.services}</p>
                    </Link>
                    <Link to={`${lang}${mainfooter.about_link}`}>
                      <p>{mainfooter.about}</p>
                    </Link>
                    <Link to={`${lang}${mainfooter.career_link}`}>
                      <p>{mainfooter.career}</p>
                    </Link>
                  </div>
                ))}

                {/* Grid column */}
                <hr className="w-100 clearfix d-md-none" />
                {/* Grid column */}

                <div
                  className="col-md-6 col-lg-3 col-xl-3 mx-auto mt-3"
                  key={contactFooter.id}
                >
                  {contactFooter.map((contact) => (
                    <div key={contact.id}>
                      <h6 className="text-uppercase mb-4 font-weight-bold">
                        {contact.title}
                      </h6>
                      <p>
                        {contact.link ? (
                          <Link
                            to={contact.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {contact.subtitle}
                          </Link>
                        ) : (
                          contact.subtitle // Display subtitle as plain text if no link
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Grid column */}
              </div>
              {/*Grid row*/}
            </section>
            {/* Section: Links */}
            <hr className="my-3" />

            {/* Section: Copyright */}
            <section className="">
              <div className="row ">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <button
                    type="button"
                    className="btn arrow_btn"
                    onClick={scrolltoTop}
                  >
                    <i className="fa-solid fa-arrow-up fa-lg icon_footer_fixed"></i>
                  </button>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 text-center">
                  {/* Facebook */}
                  <Link
                    to="https://www.facebook.com/people/kasselsoft/61555183182719/?mibextid=PlNXYD"
                    className="btn btn-floating m-1"
                    target="_blank"
                    role="button"
                    style={{ color: "rgb(60 102 171)", fontSize: "25px" }}
                  >
                    <i className="bi bi-facebook"></i>
                  </Link>
                  {/* Twitter */}
                  <Link
                    to="https://www.linkedin.com/company/kasselsoft/"
                    className="btn btn-floating m-1"
                    target="_blank"
                    style={{ color: "rgb(60 102 171)", fontSize: "25px" }}
                  >
                    <i className="bi bi-linkedin"></i>
                  </Link>
                  {/* Instagram */}
                  <Link
                    to="https://www.instagram.com/_kassel_/?igsh=MWRjcHk5MGJtYWVmcw%3D%3D"
                    className="btn btn-floating m-1"
                    target="_blank"
                    style={{ color: "rgb(60 102 171)", fontSize: "25px" }}
                  >
                    <i className="bi bi-instagram"></i>
                  </Link>
                  <Link
                    to="https://wa.me/962790039555?src=qr"
                    className="btn btn-floating m-1"
                    target="_blank"
                    style={{ color: "rgb(60 102 171)", fontSize: "25px" }}
                  >
                    <i className="bi bi-whatsapp"></i>
                  </Link>
                </div>

                {/* New column for Floating Action Button */}
                <div className="col-lg-4 col-md-4 col-sm-12 text-center">
                  <div style={{ position: "relative" }}>
                    {showButtons && (
                   <div className="floating-buttons">
                   {buttons.map((button, index) => (
                     <button
                       key={index}
                       className="btn btn-circle"
                       data-aos="fade-right"
                       data-aos-duration="800"
                       data-aos-delay={index * 300} // Adjust this delay for each button
                       style={{ opacity: showButtons ? 1 : 0 }} // Control visibility with opacity
                     >
                       <Link
                         to={button.link}
                         className="btn btn-floating m-1"
                         target="_blank"
                       >
                         <i className={button.icon}></i>
                       </Link>
                     </button>
                   ))}
                 </div>
                  
                    )}
                    <button
                      type="button"
                      onClick={toggleButtons}
                      className="btn btn-circle"
                      style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "10px",
                      }} // Remove width, height, border-radius since it's in CSS
                    >
                      <i className="fa-solid fa-headset fa-lg icon_footer_fixed"></i>{" "}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Copyright */}
          </div>
          {/* Grid container */}
        </footer>
        {/* Footer */}
      </div>
      {/*
       */}
    </>
  );
}

export default Footer;
