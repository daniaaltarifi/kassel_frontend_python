import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Css/landingpage.css";
import CountUp from "react-countup";
import axios from "axios";

function LandingPage({ lang }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const [titlesHome, setTitlesHome] = useState([]);
  const [imgSliderHome, setImgSliderHome] = useState([]);
  const [CareersHome, setCareersHome] = useState([]);
  const [ExperienceHome, setExperienceHome] = useState([]);
  const settings = {
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [titlesResponse, imgSliderResponse, careersResponse, experienceResponse] = await Promise.all([
          axios.get(`${API_URL}/titleshome/${lang}`),
          axios.get(`${API_URL}/imgsliderhome/`),
          axios.get(`${API_URL}/careershome/${lang}`),
          axios.get(`${API_URL}/experiencehome/${lang}`)
        ]);

        setTitlesHome(titlesResponse.data);
        setImgSliderHome(imgSliderResponse.data);
        setCareersHome(careersResponse.data);
        setExperienceHome(experienceResponse.data);
        
     

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [lang]);
  const title1 = titlesHome[0] || {};
  const title2 = titlesHome[1] || {};
  const title3 = titlesHome[2] || {};

  return (
    <>
      <section className="margin_section" data-aos="fade-up">
        <div className="container text-center">
          <p className="WHY_CHOOSE_US_home">
            {title1.subtitle || "Loading..."}
          </p>
          <h3 className="we_help_you_home">{title1.title || "Loading..."}</h3>
          <p className="descr_home">{title1.description || "Loading..."}</p>

        {/* First Slider */}
        <div className="row mt-5">
            <Slider {...settings} style={{ overflow: "hidden" }} className="slide">
              {imgSliderHome.map((img, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={img.id}>
                  <img
                    src={`${API_URL}/${img.img}`}
                    alt={`slider-img-${index}`}
                    className="slider_img_home"
                    //  loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <section className="margin_section" data-aos="fade-up">
        <div className="container text-center">
          <p className="WHY_CHOOSE_US_home">
            {title2.subtitle || "loading.."}{" "}
          </p>
          <h3 className="we_help_you_home">{title2.title || "loading.."}</h3>
          <p className="descr_home">{title2.description || "loading.."} </p>

          <div className="row mt-5">
            {CareersHome.map((career) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mt-5 " key={career.id}>
                <div className="box_home_counter">
                  <img
                    src={`${API_URL}/${career.icon}`}
                    alt="rocket"
                    className="img_carrers_home"
                    //  loading="lazy"
                  />
                  <p className="number_careers_home">
                    <CountUp end={career.count} />+
                  </p>
                  <p className="title_careers_home">{career.title} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="margin_section" data-aos="fade-up">
        <div className="container text-center">
          <p className="WHY_CHOOSE_US_home">{title3.subtitle || "loading.."}</p>
          <h3 className="we_help_you_home">{title3.title || "loading.."}</h3>
          <p className="descr_home">{title3.description || "loading.."}</p>
          <div className="row mt-5">
            <Slider {...settings} style={{ overflow: "hidden" }}>
              {ExperienceHome.map((exp) => (
                <div className="col-lg-4 col-md-6 col-sm-12"key={exp.id}>
                  <div class="card card_slider_exp">
                  <div className="card_content_scroll card_scroll_slider">

                    <img
                      src={`${API_URL}/${exp.img}`}
                      className="card-img-top img-fluid img_slider_experience"
                      alt="experience"
                      //  loading="lazy"
                    />
                    <div className="card-body">
                      <h5 className="card-title title_slider_exp">
                        {exp.title}{" "}
                      </h5>
                      <p className="card-text text_slider_exp">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
                </div>
              ))}
            
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
