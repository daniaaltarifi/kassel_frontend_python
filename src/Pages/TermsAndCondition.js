import React, { useState, useEffect } from "react";
import Mainbackground from "../components/Mainbackground";
import "../Css/termsandcondition.css";
import axios from "axios";
import { useParams } from "react-router-dom";
function TermsAndCondition() {
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
            axios.get(
              `${API_URL}/termsandconditions/${lang}/termsandcondition`
            ),
            // axios.get(`${API_URL}/imgsliderhome/`),
            axios.get(
              `${API_URL}/termsandconditions/black/${lang}/termsandcondition`
            ),
            axios.get(
              `${API_URL}/termsandconditions/blue/${lang}/termsandcondition`
            ),
            axios.get(`${API_URL}/contactfooter/${lang}`),
          ]);
   
        setStaticData(staticdataRes.data);
        setBlackData(blackDataRes.data);
        setContactTerms(contatcTermsRes.data);
   
        const formattedBlueData = blueDataRes.data.map((item) => ({
          ...item, // Copy the existing item properties
          description: formatText(item.description || ""), // Format the description
        }));

        setBlueData(formattedBlueData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [lang]);
  const path = "termsandcondition";

  return (
    <>
      <Mainbackground path={path} />
      <div className="container">
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
                <img
                  src={`${API_URL}/${data.img_Interpretation}`}
                  alt="terms and conditions"
                  className="terms_img"
                />
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col_interprition_terms">
                  <p className="title_terms">{data.Severability_title}</p>
                  <p className="descr_terms">{data.Severability_description}</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col_interprition_terms">
                  <img
                    src={`${API_URL}/${data.Severability_img}`}
                    alt="terms and conditions"
                    className="terms_img"
                  />
                </div>
              </div>
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
        <div>
          <p className="title_terms">
            {lang === "ar" ? " تواصل معنا" : "Contact Us"}
          </p>
          <p className="descr_terms">
            {lang === "ar"
              ? "إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يمكنك الاتصال بنا"
              : "If you have any questions about these Terms and Conditions, You can contact us:"}
          </p>
          <p className="descr_terms">
            {contactTerms
              .filter((item) => /^[\d\s]+$/.test(item.subtitle)) // Find all phone numbers with only digits and spaces
              .map((phone, index) => (
                <span key={index}>
                  {lang === "ar" ? `عبر رقم الهاتف: ` : `  By phone number:`}+{" "}
                  {phone.subtitle}
                  <br />
                </span>
              ))}
          </p>
          <p className="descr_terms">
            {contactTerms
              .filter((item) => item.subtitle.includes("@")) // Find all emails containing '@'
              .map((email, index) => (
                <span key={index}>
                  {lang === "ar" ? `عبر الايميل: ` : `  By email:`}{" "}
                  {email.subtitle}
                  <br />
                </span>
              ))}
          </p>
          <p className="descr_terms">
            {contactTerms
              .filter(
                (item) =>
                  item.subtitle.includes("http") ||
                  item.subtitle.includes("www")
              ) // Find websites
              .map((website, index) => (
                <span key={index}>
                  {lang === "ar"
                    ? `من خلال زيارة هذه الصفحة على موقعنا الإلكتروني `
                    : `  By visiting this page on our website:`}{" "}
                  {website.subtitle}
                  <br />
                </span>
              ))}
          </p>
        </div>
      </div>
    </>
  );
}

export default TermsAndCondition;
