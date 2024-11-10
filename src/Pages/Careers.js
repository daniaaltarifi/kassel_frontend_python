import React, { useState, useEffect } from "react";
import Mainbackground from "../components/Mainbackground";
import "../Css/careers.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";
function Careers() {
  const path = "careers";
  const API_URL = process.env.REACT_APP_API_URL;
  const { lang } = useParams();

  const [careerForm, setCareerForm] = useState([]);
  const [positionRole, setPositionRole] = useState([]);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [position_id, setPosition_id] = useState("");
  const [exp, setexp] = useState("");
  const [skills, setSkills] = useState("");
  const [phone, setPhone] = useState("");
  const [cv, setCv] = useState(null);
  const [careers, setCareers] = useState([]);
  const [titlesHome, setTitlesHome] = useState([]);
  const [skillsList, setSkillsList] = useState([]);

  const handleAddSkill = () => {
    if (skills.trim() !== "") {
      setSkillsList([...skillsList, skills]);
      setSkills(""); // Clear the input after adding
    }
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    window.scrollTo(0, 0);

    const fetchPositions = async () => {
      try {
        const response = await axios.get(`${API_URL}/position`);
        setPositionRole(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchPositions();
    const fetchData = async () => {
      try {
        const [titlesResponse, careersResponse] = await Promise.all([
          axios.get(`${API_URL}/titleshome/${lang}`),
          axios.get(`${API_URL}/careers/${lang}`),
        ]);

        setTitlesHome(titlesResponse.data);
        setCareers(careersResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [lang]);

  const handlePost = async () => {
    if (
      !first_name ||
      !last_name ||
      !email ||
      !position_id ||
      !exp ||
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
      formData.append("position_id", position_id);
      formData.append("exp", exp);
      formData.append("skills", skillsList);
      formData.append("phone", phone);
      formData.append("cv", cv);

      const response = await axios.post(`${API_URL}/careerform/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCareerForm(response.data);
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
      setPosition_id("");
      setexp("");
      setSkills("");
      setSkillsList([])
      setPhone("");
      setCv(null);
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };
  const handlePosition = (e) => {
    const selectedPositionId = e.target.value;
    setPosition_id(selectedPositionId);
  };
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
  const title = titlesHome[5] || {};
  const aosAnimation = lang === "ar" ? "fade-left" : "fade-right";

  return (
    <>
      <Mainbackground path={path} />
      <div className="container">
        <div>
          <p className="WHY_CHOOSE_US_home" data-aos={aosAnimation}>
            {title.subtitle || "Loading..."}
          </p>
          <h3 className="we_help_you_home" data-aos={aosAnimation}>
            {title.title || "Loading..."}
          </h3>
          <p className="why_choose_email" data-aos={aosAnimation}>
            {title.description || "Loading..."}
          </p>
        </div>

        <div className="row ">
          {careers.map((career) => (
            <div className="col-lg-6 col-md-12 col-sm-12 mt-4" key={career.id}>
              <div className="card p-4">
                <div className="d-flex justify-content-between mt-4">
                  <div className="d-flex flex-wrap">
                    <div className="cont_bag_careers">
                      <i
                        className="fa-solid fa-bag-shopping fa-2xl"
                        style={{ color: "#000000" }}
                      ></i>
                    </div>
                    <p className="position_name_careers">
                      {career.position_name}
                    </p>
                  </div>
                  <div>
                    <p>
                      {career.open_count}{" "}
                      {lang === "ar"
                        ? `وظائف مفتوحة ` // RTL text
                        : `position open `}
                    </p>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <button
                    type="button"
                    className="btn btn_blogs btn_position_careers"
                  >
                    {career.position_name}{" "}
                  </button>

                  <div className="card-body">
                    <span className="card-text location_careers">
                      {lang === "ar"
                        ? `الموقع ` // RTL text
                        : `Location `}
                      :{" "}
                    </span>
                    <span>{career.location}</span>
                    <br />
                    <span className="card-text location_careers">
                      {lang === "ar"
                        ? `الخبرة ` // RTL text
                        : `Experience `}
                      :
                    </span>
                    <span>
                      {career.exp}
                      {lang === "ar"
                        ? `سنوات ` // RTL text
                        : `years `}
                    </span>
                    <br />
                    <br />
                    <Link
                      to={`/${lang}/jobdescription/${career.id}`}
                      className="link_job_desc_careers"
                    >
                      {lang === "ar"
                        ? `وصف الوظيفة ` // RTL text
                        : `Job Description
 `}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
                    lang === "ar" ? `ادحل الاسم الاخير ` : `Enter Last Name`
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label for="job-role">
                  {lang === "ar" ? `نوع الوظيفة` : `Position  `}
                </label>

                <select
                  name="role"
                  value={position_id}
                  onChange={handlePosition}
                  id="lang"
                  className="select_pos"
                >
                  <option value="Select Position">
                    {" "}
                    {lang === "ar" ? `اختر نوع الوظيفة ` : `Select Position  `}
                  </option>
                  {positionRole.map((pos) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.position_name}
                    </option>
                  ))}
                </select>
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
              <div className="skills-display">
                {/* <h3>{lang === "ar" ? `المهارات المضافة` : `Added Skills`}</h3> */}
                <ul>
                  {skillsList.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="cont_cv">
                <div className="form-control ">
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
    </>
  );
}

export default Careers;
