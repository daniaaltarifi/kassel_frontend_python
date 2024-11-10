import React, { useState, useEffect } from "react";
import Mainbackground from "../components/Mainbackground";
import "../Css/termsandcondition.css";
import axios from "axios";
import { useParams } from "react-router-dom";
function PrivacyPolicy() {
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const [staticData, setStaticData] = useState([]);
  const [blackData, setBlackData] = useState([]);
  const [blueData, setBlueData] = useState([]);
  const [contactTerms, setContactTerms] = useState([]);
  // to add big description paragraph and make break when he was /n /n

  const formatText = (text) => {
    if (typeof text === "string") {
      // Replace multiple newlines with paragraph breaks and single newlines with line breaks
      return text.replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>");
    }
    console.warn("Expected text to be a string, but got:", typeof text);
    return text; // or return an empty string, or some default value
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const [staticdataRes, blackDataRes, blueDataRes, contatcTermsRes] =
          await Promise.all([
            axios.get(`${API_URL}/termsandconditions/${lang}/privacypolicy`),
            axios.get(`${API_URL}/termsandconditions/black/${lang}/privacypolicy`),
            axios.get(`${API_URL}/termsandconditions/blue/${lang}/privacypolicy`),
            axios.get(`${API_URL}/termsandconditions/contact/${lang}`),
          ]);

        setStaticData(staticdataRes.data);
        setBlackData(blackDataRes.data);

        // Format each description
        const formattedBlueData = blueDataRes.data.map((item) => ({
          ...item, // Copy the existing item properties
          description: formatText(item.description || ""), // Format the description
        }));

        setBlueData(formattedBlueData);
        setContactTerms(contatcTermsRes.data);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [lang]);
  const path = "privacypolicy";
  return (
    <>
      <Mainbackground path={path} />
      <div className="container" >

      {staticData.map((data) => (
        <div key={data.id}>

          <p className="WHY_CHOOSE_US_home">{data.main_subtitle}</p>
          <h3 className="we_help_you_home">{data.main_title}</h3>
          <p className="descr_home">{data.main_description}</p>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col_interprition_terms">
              <p className="title_terms">{data.tiltle_Interpretation}</p>
              <p className="descr_terms">{data.description_Interpretation}</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col_interprition_terms">
                {data.img_Interpretation &&
                (
                    <img
                      src={`${API_URL}/${data.img_Interpretation}`}
                      alt="terms and conditions"
                      className="terms_img"
                    />

                )}
            </div>
           
           
        
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col_interprition_terms">
                <p className="title_terms">{data.Severability_title}</p>
                <p className="descr_terms">{data.Severability_description}</p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col_interprition_terms">
                {data.Severability_img && (
                  <img
                    src={`${API_URL}/${data.Severability_img}`}
                    alt="terms and conditions"
                    className="terms_img"
                  />
                )}
              </div>
            </div>
            {contactTerms.map((contact) => (
              <div key={contact.id}>
                <p className="title_terms"> {contact.title}</p>
                <p className="descr_terms">{contact.description}</p>
                <p className="descr_terms">
                  {lang === "ar"
                    ? `عبر البريد الالكتروني: ${contact.email}` // RTL text
                    : `By email: ${contact.email}`}{" "}
                </p>
                <p className="descr_terms">
                  {lang === "ar"
                    ? `من خلال زيارة هذه الصفحة على موقعنا الإلكتروني ${contact.web_link}`
                    : `  By visiting this page on our website:${contact.web_link}`}
                </p>
                <p className="descr_terms">
                  {" "}
                  {lang === "ar" ? `عبر رقم الهاتف: ` : `  By phone number:`}+
                  {contact.phone}
                </p>
              </div>
            ))}
          </div>
        </div>

      ))}
       {blackData.map((black) => (
              <div key={black.id}>
                <p className="affiliate_terms">{black.title}</p>
                <p className="affiliate_descr">{black.description}</p>
              </div>
            ))}
             {blueData.map((blue) => (
              <div key={blue.id}>
                <p className="title_terms">{blue.title}</p>
                <p
                  className="descr_terms"
                  dangerouslySetInnerHTML={{ __html: blue.description }}
                />
              </div>
            ))}

        </div>

    </>
  );
}

export default PrivacyPolicy;
