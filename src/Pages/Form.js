import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/messages.css";
import { useLocation } from "react-router-dom";
const SendMessageForm = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en"; // Get the language from the path, default to 'en'
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [phoneByCount, setPhoneByCount] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [responseSucc, setResponseSucc] = useState("");

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };
  const fetchPhone = async (e) => {
    e.preventDefault();
    const parsedCount = parseInt(count, 10);

    // Validate the count
    if (isNaN(parsedCount) || parsedCount <= 0) {
      setError("Please provide a valid count of phone numbers.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/phone/count`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: parsedCount }),
      });

      // Check if the response is OK (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPhoneByCount(data);
      // Ensure you're accessing the correct data structure
      const fetchedPhones = data.map((phone) => phone.phone).join(", "); // Use 'data' instead of 'response.data'
      setPhone(fetchedPhones);
      setError(""); // Clear error on success
    } catch (err) {
      console.error("Error fetching phone numbers:", err); // Log the error
      setError("An error occurred while fetching the phone numbers.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("message", message);
    // for (let i = 0; i < images.length; i++) {
    //   formData.append("imageFile", images[i]);
    // }
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("imageFile", images[i]);
      }
    }
    try {
      const response = await axios.post(
        `${API_URL}/sendmessage/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // alert(response.data);
      setResponseSucc(response.data);
      setPhone("");
      setMessage("");
      setImages(null);
    } catch (error) {
      console.error("Error sending message:", error);
      // alert('Failed to send message');
      // setResponseSucc("Failed to send message");
    }
  };

  return (
    <>
      <div className="container" style={{ marginTop: "15vh" }}>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12" >
            <h2 className="instruction_whatsapp_form">
              Instructions for Using Send Message By WhatsApp Form
            </h2>
            <h3 >Step 1: Fill Out the Form</h3>
            <h5 >1.1 Phone Numbers</h5>
            <p > You have two options to input phone numbers:</p>
            <h6 >Option 1: Manual Input</h6>
            <ul>
              <li>
                <b>Field:</b> Phone Numbers
              </li>
              <li>
                <b>Instructions: </b>
                <ul>
                  <li>
                    Enter the phone numbers of the recipients separated by
                    commas e.g, +1234567890, +9627654321.
                  </li>
                  <li>
                    Ensure that each number includes the country code and is
                    formatted correctly.
                  </li>
                </ul>
              </li>
            </ul>
            <h6>Option 2: Retrieve from Website</h6>
            <ul>
              <li>
                <b>Field:</b> Count of Numbers
              </li>
              <li>
                <b>Instructions: </b>
                <ul>
                  <li>
                    If you do not have phone numbers to enter, specify how many
                    phone numbers you would like to send messages to in the
                    input field.
                  </li>
                  <li>
                    Click the Get Phone Numbers option. This service will help
                    you find phone numbers from Kassel based on your specified
                    count.
                  </li>
                </ul>
              </li>
            </ul>
            <h5 >1.2 Message</h5>
            <ul>
              <li>
                <b>Field:</b> Message
              </li>
              <li>
                <b>Instructions: </b>
                <ul>
                  <li>Write the message you wish to send.</li>
                  <li>
                    Keep in mind that this message will be sent to all phone
                    numbers listed.
                  </li>
                </ul>
              </li>
            </ul>
            <h5 >1.3 Image (Optional)</h5>
            <ul>
              <li>
                <b>Field:</b> Upload Image
              </li>
              <li>
                <b>Instructions: </b>
                <ul>
                  <li>
                    If you wish to send image, click on the upload button to
                    select the image file from your device.
                  </li>
                </ul>
              </li>
            </ul>
            <h3 >Step 2: Submit the Form</h3>
            <ul>
              <li>
                After filling in the phone numbers, message, and uploading
                image, click on the Send Message button.
              </li>
              <li>
                Once the form is submitted, the system will automatically sends
                the messages.
              </li>
              <li>
                You will see a confirmation message indicating whether the
                messages were sent successfully.
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="apply-box">
              <h3 className="apply_now_carrers mb-4">
                {lang === "ar"
                  ? `ارسال رسالة عن طريق الواتساب  ` // RTL text
                  : `Send Message By WhatsApp `}
              </h3>

              <form action="" onSubmit={handleSubmit}>
                <div>
                  <div className="form-control form_sendmessage">
                    <label for="phone" className="labels_form_whats">
                      {lang === "ar"
                        ? `الاسم الاول ` // RTL text
                        : `Phone Numbers: `}
                    </label>

                    <textarea
                      id="phone"
                      name="phone"
                      placeholder={
                        lang === "ar" ? `ادخل الاسم الاول` : `Enter Phones`
                      }
                      rows={5}
                      autoComplete="off"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {/* Count Input for Fetching Phone Numbers */}
                  <div className="form-control form_sendmessage">
                    <label htmlFor="count" className="labels_form_whats">
                      {lang === "ar" ? "عدد الهواتف" : "Count:"}
                    </label>
                    <input
                      type="number"
                      id="count"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      placeholder={lang === "ar" ? "ادخل العدد" : "Enter count"}
                    />
                    <button
                      type="button"
                      className="get_phone_num_form"
                      onClick={fetchPhone} // Call fetchPhone on button click
                    >
                      {lang === "ar" ? "احصل على الأرقام" : "Get Phone Numbers"}
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                  </div>
                  <div className="form-control form_sendmessage">
                    <label for="message" className="labels_form_whats">
                      {lang === "ar" ? `الرسالة` : `Message:  `}
                    </label>
                    <textarea
                      type="text"
                      id="message"
                      name="message"
                      rows={5}
                      placeholder={
                        lang === "ar" ? `ادخل الرسالة` : `Enter Message  `
                      }
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="cont_cv">
                    <div className="form-control form_sendmessage">
                      <label for="upload" className="labels_form_whats">
                        {lang === "ar" ? ` تحميل صورة` : `Upload Image: `}
                      </label>
                      <input type="file" multiple onChange={handleImageChange} />
                    </div>
                  </div>
                </div>
                {responseSucc && (
                  <p style={{ color: "green" }}>{responseSucc}</p>
                )}

                <div className="button-container cont_btn_apply_career ">
                  <button
                    type="submit"
                    className="learn_more_btn_home  btn_apply_career"
                    // onClick={handlePost}
                  >
                    {lang === "ar"
                      ? `ارسال`
                      : ` Send Message
  `}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


      {/* <form onSubmit={handleSubmit}style={{marginTop:"20vh",marginLeft:"10vh"}}>
      <div >
        <label>
          Phone Number:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Images:
          <input type="file" multiple onChange={handleImageChange} />
        </label>
      </div>
     
      <button type="submit">Send Message</button>
    </form>
    <form onSubmit={fetchPhone}>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="Enter count"
        />
        <button type="submit">Get Phone Numbers</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {phoneByCount.length > 0 && (
        <ul>
          {phoneByCount.map((phone, index) => (
            <li key={index}>{phone.phone}</li>
          ))}
        </ul>
      )} */}
    </>
  );
};

export default SendMessageForm;
