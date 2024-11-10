import React, { useEffect, useState } from "react";
import "../Css/services.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Mainbackground from "../components/Mainbackground";
function Services() {
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const aosAnimation = lang === 'ar' ? 'fade-left' : 'fade-right';

  const [services, setServices] = useState([]);
  const [titlesHome, setTitlesHome] = useState([]);
  const [howWeWork, setHowWeWork] = useState([]);
  const [industryImg, setIndustryImg] = useState([]);

  useEffect(() => {
    // AOS.init({ duration: 1200 });
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    const fetchData = async () => {
      try {
        const [servicesRes, titlesResponse, howweworkRes, industryimgRes] =
          await Promise.all([
            axios.get(`${API_URL}/services/${lang}`),
            axios.get(`${API_URL}/titleshome/${lang}`),
            axios.get(`${API_URL}/howwework/${lang}`),
            axios.get(`${API_URL}/industryimg`),
          ]);
        setServices(servicesRes.data);
        setTitlesHome(titlesResponse.data);
        setHowWeWork(howweworkRes.data);
        setIndustryImg(industryimgRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [lang]);
  const title4 = titlesHome[3] || {};
  const title5 = titlesHome[4] || {};
const path="services"
  return (
    <>
    <Mainbackground path={path}/>
      <section className="marign_section" style={{ marginTop: "15vh" }}>
        <div className="container">
          <div className="row">
            {services.map((service) => (
              <div className="col-lg-6 col-md-12 col-sm-12" data-aos="fade-up"key={service.id}>
                <div class="card card_services">
                {/* <div className="card_content_scroll card_scroll_slider"> */}

                  <div className="cont_img_services_card">
                    <img
                      src={`${API_URL}/${service.img}`}
                      alt="img services"
                      className="card-img-top img-fluid img_services_card"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title title_slider_exp ">
                      {service.title}{" "}
                    </h5>
                    <p className="card-text text_services_card">
                      {service.description}
                    </p>
                  </div>
                  </div>
                </div>
              // </div>
            ))}
          </div>
        </div>
      </section>
      <section className="marign_section">
        <div className="container">
          <div className="text-center">
            <p className="WHY_CHOOSE_US_home"  data-aos={aosAnimation}>
              {title4.subtitle || "Loading..."}
            </p>
            <h3 className="we_help_you_home"  data-aos={aosAnimation}>
              {title4.title || "Loading..."}{" "}
            </h3>
            <p className="descr_home"  data-aos={aosAnimation}>
              {title4.description || "Loading..."}
            </p>
          </div>

          <div className="row">
            {howWeWork.map((how) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={how.id}>
                <div class="card card_how_work">
                <div className="card_scroll_services">

                  <div className="cont_img_services_card">
                    <img
                      src={`${API_URL}/${how.img}`}
                      alt="img services"
                      className="card-img-top img-fluid img_card_how_work "
                      data-aos="zoom-in"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title title_slider_exp ">
                      {how.title}{" "}
                    </h5>
                    <p className="card-text text_how_work_card ">
                      {how.description}
                    </p>
                  </div>
                </div>
                </div>
               </div>
            ))}
          </div>
        </div>
      </section>
      <section className="marign_section">
        <div className="container">
          <div className="text-center">
            <p className="WHY_CHOOSE_US_home" data-aos={aosAnimation}>
              {title5.subtitle || "Loading..."}
            </p>
            <h3 className="we_help_you_home"  data-aos={aosAnimation}>
              {title5.title || "Loading..."}
            </h3>
            <p className="descr_home"  data-aos={aosAnimation}>
              {title5.description || "Loading..."}
            </p>
          </div>
          <div className="row mt-5">
            {industryImg.map((industry, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col_industry_services"
                key={industry.id}
              >
                <div
                  className="cont_industry_services"
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay="0"
                  // data-aos-delay={index * 500}
                >
                  <img
                    src={`${API_URL}/${industry.img}`}
                    alt="img services"
                    className="card-img-top img-fluid img_industry_services"
                  />
                </div>
              </div>
            ))}

          </div>

      
        </div>
      </section>
    </>
  );
}

export default Services;
