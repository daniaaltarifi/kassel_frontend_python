import React, { useEffect, useState } from "react";
import Mainbackground from "../components/Mainbackground";
import "../Css/jobdescription.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
function JobDescription() {
  const path = "jobdescription";
  const API_URL = process.env.REACT_APP_API_URL;
  const { lang, id } = useParams();
  const [jobDescription, setJobDescription] = useState([]);
  const [responsabilitiesList, setResponsabilitiesList] = useState([]);
  const [reqList, setReqList] = useState([]);
  const [benefitList, setBenefitList] = useState([]);
  const [appearForm, setAppearForm] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [exp, setexp] = useState("");
  const [skills, setSkills] = useState("");
  const [phone, setPhone] = useState("");
  const [cv, setCv] = useState(null);
  const [application,setApplication] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/careers/${lang}/getbyid/${id}`
        );
        const result = response.data[0];
        const itemsResponsabilites = result.responsabilites || ""; // Default to an empty string
        const itemsArray =
          typeof itemsResponsabilites === "string"
            ? itemsResponsabilites.split(",").map((item) => item.trim())
            : [];
        const itemsReq = result.requirment || ""; // Default to an empty string
        const itemsArrayReq =
          typeof itemsReq === "string"
            ? itemsReq.split(",").map((item) => item.trim())
            : [];
        const itemsBenefit = result.benefit || ""; // Default to an empty string
        const itemsArrayBenefit =
          typeof itemsBenefit === "string"
            ? itemsBenefit.split(",").map((item) => item.trim())
            : [];

        setJobDescription(result);
        setResponsabilitiesList(itemsArray);
        setReqList(itemsArrayReq);
        setBenefitList(itemsArrayBenefit);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, [id, lang]);
  const handleCv = (e) => {
    const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024; // 1 GB in bytes

    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      Toastify({
        text: "File size exceeds the 1 GB limit",
        duration: 3000,
        gravity: "top",
        position: "right",
        background: "red",
      }).showToast();
      return;
    }
    setCv(file);
  };
  const handleAddSkill = () => {
    if (skills.trim() !== "") {
      setSkillsList([...skillsList, skills]);
      setSkills(""); // Clear the input after adding
    }
  };
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle blur event to validate email
  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError(lang === "ar" ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address');
    } else {
      setEmailError('');
    }
  };
  const handlePost = async () => {
    if (
      !first_name ||
      !last_name ||
      !email ||
      !exp ||
      !skillsList ||
      !phone ||
      !cv
    ) {
      Toastify({
        text: "Please Fill All Field",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("email", email);
      formData.append("exp", exp);
      formData.append("skills", skillsList);
      formData.append("phone", phone);
      formData.append("cv", cv);

      const response = await axios.post(`${API_URL}/jobdescription/add/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setApplication(response.data);
      Toastify({
        text: "Job Application Submitted",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#365486",
      }).showToast();
      setFirst_name("");
      setLast_name("");
      setEmail("");
      setexp("");
      setSkills("");
      setSkillsList([])
      setPhone("");
      setCv(null);
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };
  return (
    <>
      <Mainbackground path={path} />
      {jobDescription && (
        <div className="container">
          <p className="title_jobdescr">{jobDescription.position_name} </p>
          <div className="row">
            <div className=" col-lg-12 col-md-12 col-sm-12">
              <h5>
                {lang === "ar"
                  ? `الوصف الوظيفي ` // RTL text
                  : `Job Description: `}
              </h5>
              <p>{jobDescription.description}</p>
              <h5>
                {" "}
                {lang === "ar"
                  ? `المسؤوليات ` // RTL text
                  : `Responsibilities: `}
              </h5>
              <ul>
                {responsabilitiesList.length > 0 ? (
                  responsabilitiesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>
                    {lang === "ar"
                      ? `لا يوجد مسؤوليات ` // RTL text
                      : `No responsibilities listed. `}
                  </li>
                )}
              </ul>
              <h5>
                {lang === "ar"
                  ? `المتطلبات ` // RTL text
                  : `Requirements: `}
              </h5>
              <ul>
                {reqList.length > 0 ? (
                  reqList.map((item, index) => <li key={index}>{item}</li>)
                ) : (
                  <li>
                    {lang === "ar"
                      ? `لا يوجد متطلبات ` // RTL text
                      : `No Requirements listed. `}
                  </li>
                )}
              </ul>
              <h5>
                {lang === "ar"
                  ? `الفوائد ` // RTL text
                  : `Benefits `}
              </h5>
              <ul>
                {benefitList.length > 0 ? (
                  benefitList.map((item, index) => <li key={index}>{item}</li>)
                ) : (
                  <li>
                    {lang === "ar"
                      ? `لا يوجد فوائد ` // RTL text
                      : `No benefits listed. `}
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <button
                type="button"
                className="learn_more_btn_home "
                // data-aos={aosAnimation}
                onClick={() => {
                  setAppearForm(!appearForm);
                }}
              >
                {lang === "ar"
                  ? `قدم الان ` // RTL text
                  : ` Apply`}
              </button>
            </div>
          </div>
          {appearForm && (
            <div className="container">
              <div className="apply-box">
                <h1 className="apply_now_carrers">
                  {lang === "ar"
                    ? `قدم الان  ` // RTL text
                    : `Apply Now `}
                </h1>

                <form action="">
                  <div className="form-container">
                    <div className="form-control">
                      <label for="first_name">
                        {lang === "ar"
                          ? `الاسم الاول ` // RTL text
                          : `First Name `}
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder={
                          lang === "ar"
                            ? `ادخل الاسم الاول ` // RTL text
                            : `Enter First Name `
                        }
                        autoComplete="off"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                      />
                    </div>
                    <div className="form-control">
                      <label for="last_name">
                        {lang === "ar" ? `الاسم الاخير ` : `Last Name`}
                      </label>
                      <input
                        id="last_name"
                        name="last_name"
                        placeholder={
                          lang === "ar"
                            ? `ادحل الاسم الاخير `
                            : `Enter Last Name`
                        }
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                      />
                    </div>
                    <div className="form-control">
                      <label for="email">
                        {lang === "ar" ? `البريد الالكتروني ` : `Email `}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder={
                          lang === "ar"
                            ? `ادخل البريد الالكتروني `
                            : `Enter your Email `
                        }
                        value={email}
                        onChange={handleEmailChange}
        onBlur={handleEmailBlur} // Validate on blur
                       
                      />
                       {emailError && (
                          <span style={{ color: 'red',fontSize:"13px" }}>{emailError}</span>
                        )}
                    </div>

                    <div className="form-control">
                      <label for="exp">
                        {lang === "ar" ? `سنوات الخبرة` : `Experience years `}
                      </label>
                      <input
                        type="text"
                        id="exp"
                        name="exp"
                        placeholder={
                          lang === "ar"
                            ? `ادخل سنوات الخبرة`
                            : `Enter your Experience years `
                        }
                        value={exp}
                        onChange={(e) => setexp(e.target.value)}
                      />
                    </div>

                  
              <div className="form-control">
                <label htmlFor="exp">
                  {lang === "ar" ? `المهارات` : `Skills`}
                </label>
                <input
                  name="exp"
                  id="exp"
                  cols="50"
                  rows="4"
                  placeholder={
                    lang === "ar" ? `ادخل المهارات` : `Enter your Skills`
                  }
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
                <button type="button" onClick={handleAddSkill} className="add_skill_btn_career" >
                 <p>
                 {lang === "ar" ? `أضف المهارة` : `Add Skill`}
                  </p> 
                </button>
                {skillsList.length > 0 && (
            <div className="skills-display">
              <ul>
                {skillsList.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
               
  <div className="form-control">
                <label for="phone">
                  {lang === "ar" ? `رقم الهاتف` : `Phone  `}
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder={
                    lang === "ar" ? `ادخل رقم الهاتف` : `Enter your phone  `
                  }
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
                    <div className="form-control">
                      <label for="upload">
                        {lang === "ar" ? `السيرة الذاتية` : `Upload your CV  `}
                      </label>
                      <input
                        type="file"
                        id="upload"
                        name="upload"
                        onChange={handleCv}
                      />
                    </div>
                  </div>
                  <div className="button-container cont_btn_apply_career ">
                    <button
                      type="button"
                      className="learn_more_btn_home  btn_apply_career"
                      onClick={handlePost}
                    >
                      {lang === "ar"
                        ? `قدم الان`
                        : `  APPLY NOW
`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default JobDescription;
