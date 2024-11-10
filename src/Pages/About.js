import "../Css/about.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Mainbackground from "../components/Mainbackground";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
function About() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [aboutTeme, setAboutTeme] = useState([]);
  const [aboutServices, setAboutServices] = useState([]);
  const [titlesHome, setTitlesHome] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useParams();
  const navigate=useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [aboutTemeRes, aboutServicesRes, titlesHomeRes, aboutData] =
          await Promise.all([
            axios.get(`${API_URL}/abuteteam/aboutteme/${lang}`),
            axios.get(
              `${API_URL}/aboutServices/getaboutServicesByLang/${lang}`
            ),
            axios.get(`${API_URL}/titleshome/${lang}`),
            axios.get(`${API_URL}/api/about/${lang}`),
          ]);

        setAboutTeme(aboutTemeRes.data);
        setAboutServices(aboutServicesRes.data);
        setTitlesHome(titlesHomeRes.data);
        setAboutData(aboutData.data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [lang]);
  const title1 = titlesHome[5] || {};
  const title2 = titlesHome[6] || {};
  const title3 = titlesHome[7] || {};

  const path = "about";
  return (
    <>
      <Mainbackground path={path} />

      {/* About Start */}
      <section className="about m-5" id="about">
        <div className="container ">
          <div className="main-txt main-txt-titel">
            <h3>{title3.title || "Loading..."}</h3>
          </div>
          <div className="row">
            <div className="col-md-6 py-3 py-md-0">
              <div className="card2 ">
                <h2>{title3.subtitle || "Loading..."}</h2>
                <p className="prag mt-4">
                  {title3.description || "Loading..."}
                </p>
                {/* Add null check for aboutData */}
                {aboutData ? (
                  <>
                    <p>
                      <span className="icon-check">
                        <i className="bi bi-check"></i>
                      </span>{" "}
                      {aboutData.point1}
                    </p>
                    <p>
                      <span className="icon-check">
                        <i className="bi bi-check"></i>
                      </span>{" "}
                      {aboutData.point2}
                    </p>
                    <p>
                      <span className="icon-check">
                        <i className="bi bi-check"></i>
                      </span>{" "}
                      {aboutData.point3}
                    </p>
                  </>
                ) : (
                  <p>Loading content...</p>
                )}

                <button id="about-btn" onClick={()=>{navigate(`/${lang}/services`)}}
                > {lang === 'ar' ?" شاهد المزيد" : "View More"}</button>
              </div>
            </div>
            <div className="col-md-6 py-3 py-md-0">
            {aboutData ? (

              <div className="card images-container">
              
                <img
                  src={`${API_URL}/${aboutData.image1}`}
                  alt="img1"
                  className="img1 img-fluid"
                />
                <img
                  src={require("../assets/start2.jpg")}
                  alt="img2"
                  className="img2 img-fluid"
                />
                <img
                  src={`${API_URL}/${aboutData.image2}`}
                  alt="img3"
                  className="img3 img-fluid"
                />
                <img
                  src={require("../assets/rocket.png")}
                  alt="img4"
                  className="img4 img-fluid"
                />
              </div>
            ): (
              <p>Loading image...</p>
            )}
            </div>
          </div>
        </div>
      </section>
      <section className="services team" id="team">
        <div className="container">
          <div className="main-txt main-txt-titel">
            <h3>{title1.title || "Loading..."}</h3>{" "}
            {/* Adjust according to your data */}
            <h1>{title1.subtitle || "Loading..."}</h1>{" "}
            {/* Adjust according to your data */}
            <p className="prag mt-4">{title1.description || "Loading..."}</p>
          </div>

          <div className="row" style={{ marginTop: 30 }}>
            {aboutTeme.map((aboutteam) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={aboutteam.id}>
                <div className="card">
                  <h1 >{aboutteam.name}</h1>
                  <div className="card-body">
                    <h3>{aboutteam.major}</h3>
                    <h2>{aboutteam.projects}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About End */}
      <section className="services" id="service">
        <div className="container">
          <div className="main-txt ">
            <h3>{title2.title || "Loading..."}</h3>{" "}
            {/* Adjust according to your data */}
            <h1>{title2.subtitle || "Loading..."}</h1>{" "}
            {/* Adjust according to your data */}
            <p className="prag mt-4">{title2.description || "Loading..."}</p>
          </div>
          <div className="row" style={{ marginTop: 30 }}>
            {aboutServices.map((service) => (
              <div key={service.id} className="col-md-3 py-3 py-md-0">
                <div className="card m-3">
                  <i className={`${service.icon}`}></i>
                  <div className="card-body">
                    <h3>{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Section Services End */}
    </>
  );
}

export default About;
