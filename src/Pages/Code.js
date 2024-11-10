import React,{useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
function Code() {
    const location = useLocation();
    const navigate = useNavigate();
    const lang = location.pathname.split("/")[1] || "en"; // Get the language from the path, default to 'en'
  const API_URL = process.env.REACT_APP_API_URL;
  const [error, setError] = useState("");
const [code,setCode]=useState('')
const checkValidate = async (e) => {
    e.preventDefault();
    const user_id=localStorage.getItem("isAuthenticated")
    try {
        const response = await axios.post(`${API_URL}/codes/verifycode`, {code: code, user_id:user_id});

        if (response.status === 200) {
            if (response.data.valid) {
                navigate(`/${lang}/formdata`);
            } else {
                // Handle expired code
                setError(lang === 'ar' ? " الكود منتهي الصلاحية الرجاء استخدام كود اخر" : "Code has expired. Please try again.");
            }
        } else {
            setError(lang === 'ar' ? "الكود غير صالح. يرجى المحاولة مرة أخرى." : "Invalid code. Please try again.");
        }
    } catch (error) {
        // Handle other errors that might occur (e.g., network issues)
        setError(lang === 'ar' ? "فشل التحقق من الكود. يرجى المحاولة مرة أخرى." : "Failed to verify code. Please try again.");
    }
};


  return (
    <div>
           <div className="container" style={{ marginTop: "15vh" }}>
        <div className="apply-box">
          <h3 className="apply_now_carrers mb-4">
            {lang === "ar"
              ? `التأكد من صلاحية الكود  ` // RTL text
              : `Verify Code`}
          </h3>

          <form action="" onSubmit={checkValidate}>
            <div>
             
              {/* Count Input for Fetching Phone Numbers */}
              <div className="form-control form_sendmessage">
                <label htmlFor="count">
                  {lang === "ar" ? "الكود" : "Code"}
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={lang === "ar" ? "ادخل الكود" : "Enter code"}
                />
                {/* <button
                  type="submit"
                  className="get_phone_num_form"
                //   onClick={checkValidate} // Call fetchPhone on button click
                >
                  {lang === "ar" ? "تحقق من الكود" : "Validate Check"}
                </button> */}
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
             

             
            </div>

            <div className="button-container cont_btn_apply_career ">
              <button
                type="submit"
                className="learn_more_btn_home  btn_apply_career"
                // onClick={handlePost}
              >
                {lang === "ar"
                  ? `التحقق`
                  : ` Verify Check
  `}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Code