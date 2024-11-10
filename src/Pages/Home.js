import React, { useEffect, useState } from "react";
import "../Css/home.css";
import LandingPage from "./LandingPage";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
function Home() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { lang } = useParams();
  const aosAnimation = lang === "ar" ? "fade-left" : "fade-right";
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState([]);
  const [homeServices, setHomeServices] = useState([]);
  const [whychooseusHome, setWhychooseusHome] = useState([]);
  const [cardHome, setCardHome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // AOS.init({ duration: 1200 });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [translationsRes, homeServicesRes, whychooseusRes, cardHomeRes] =
          await Promise.all([
            axios.get(`${API_URL}/home/${lang}`),
            axios.get(`${API_URL}/homeservices/${lang}`),
            axios.get(`${API_URL}/homewhychooseus/${lang}`),
            axios.get(`${API_URL}/cardhome/${lang}`),
          ]);

        setHomeData(translationsRes.data);
        setHomeServices(homeServicesRes.data);
        setWhychooseusHome(whychooseusRes.data);
        setCardHome(cardHomeRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [lang]);

  return (
    <>
      <div className="container-fluid  background_home">
        <div className="row">
          {homeData.map((mainhome) => (
            <div className="col-lg-6 col-md-6 col-sm-12" key={mainhome.id}>
              <img
                src={require("../assets/home3-shape1.webp")}
                alt="shape1"
                className="home3-shape1 img-fluid"
              />
              <img
                src={require("../assets/home3-shape2.webp")}
                alt="img"
                className="home3-shape2 img-fluid"
              />
              <img
                src={require("../assets/home3-shape3.webp")}
                alt="img"
                className="home3-shape3 img-fluid"
              />

              <p className="title_home" data-aos={aosAnimation}>
                {" "}
                {mainhome.subtitle}
              </p>
              <h1 className="big_title_home" data-aos={aosAnimation}>
                {mainhome.title}
              </h1>
              <p className="descr_home" data-aos={aosAnimation}>
                {mainhome.description}
              </p>

              <button
                type="button"
                className="learn_more_btn_home "
                data-aos={aosAnimation}
                onClick={() => {
                  navigate(`/${lang}/about`);
                }}
              >
                {mainhome.button}
              </button>
            </div>
          ))}

          {homeData.map((mainhome) => (
            <div className="col-lg-6 col-md-6 col-sm-12 " key={mainhome.id}>
              <div className="d-flex justify-content-around">
                <img
                  src={require("../assets/home3-round-shape1.webp")}
                  alt="cross"
                  className="circle_img_home img-fluid"
                />
                <img
                  src={require("../assets/new-cross.webp")}
                  alt="cross"
                  className="cross_img_home img-fluid"
                />
              </div>

              <img
                src={`${API_URL}/${mainhome.img}`}
                alt="banner"
                className="main_img_home img-fluid"
              />
              <div className="d-flex justify-content-center">
                <img
                  src={require("../assets/wave.webp")}
                  alt="wave"
                  className="wave_img_home img-fluid"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container text-center mt-5" data-aos="fade-up">
        <div className="row">
          {homeServices.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
              <div className="card card_icon_home">
                <div className="card_content_scroll">
                  <img
                    src={`${API_URL}/${item.img}`}
                    // src={require('../assets/terms-and-conditions-graphic.png')}

                    className="img-fluid icon_home"
                    alt="icon"
                    width="300"
                    height="200"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text descr_serv_home">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="margin_section background_whychooseus_home">
        {whychooseusHome.map((why) => (
          <div className="container" key={why.id}>
            <p className="WHY_CHOOSE_US_home" data-aos={aosAnimation}>
              {why.subtitle}
            </p>
            <h3 className="we_help_you_home" data-aos={aosAnimation}>
              {why.title}
            </h3>
            <p className="why_choose_descr" data-aos={aosAnimation}>
              {why.description}
            </p>
            <button
              type="button"
              className="view_more_btn_home "
              data-aos={aosAnimation}
            >
              {why.button}{" "}
            </button>
          </div>
        ))}
        <div className="container ">
          <div className="row mt-5">
            {cardHome.map((cardhome) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={cardhome.id}>
                <div className="card card_services_home">
                  <div className="card_content_scroll">
                    <div className="background_icon_home">
                      <img
                        src={`${API_URL}/${cardhome.icon}`}
                        className="img-fluid help_you_img_home"
                        alt="icon"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title services_home">
                        {cardhome.title}
                      </h5>
                      <p className="card-text">{cardhome.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LandingPage lang={lang} />
    </>
  );
}

export default Home;
