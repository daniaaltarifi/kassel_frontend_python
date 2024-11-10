import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./App.css";
import About from './Pages/About.js';
import Services from './Pages/Services';
import { useNavigate,useLocation } from 'react-router-dom';
import TermsAndCondition from './Pages/TermsAndCondition.js';
import PrivacyPolicy from './Pages/PrivacyPolicy.js';
import Blogs from './Pages/Blogs.js';
import Careers from './Pages/Careers.js';
import JobDescription from './Pages/JobDescription.js';
import Contact from './Pages/Contact.js';
import BlogDetails from './Pages/BlogDetails.js';
import SendMessageForm from './Pages/Form.js';
import Login from './Pages/Login.js';
import SignUp from './Pages/SignUp.js';
import ResetPassword from './Pages/ResetPassword.js';
import ForgetPassword from './Pages/ForgetPassword.js';
import Code from './Pages/Code.js';
// Component to redirect to default language
const RedirectToDefaultLanguage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate('/en'); // Redirect to default language
    }
  }, [navigate, location.pathname]);

  return null;
};
// Component to handle direction based on language

const DirectionHandler = () => {
  const location = useLocation();

  const lang = location.pathname.split('/')[1] || 'en'; // Get the language from the path, default to 'en'
  React.useEffect(() => {
    document.body.classList.remove('ltr', 'rtl'); // Remove previous direction classes
    document.body.classList.add(lang === 'ar' ? 'rtl' : 'ltr'); // Add new direction class
  }, [lang]);

  return null;
};

function App() {
  // const originalConsoleError = console.error;
  // console.error = (...args) => {
  //   if (/Warning/.test(args[0])) {
  //     return;
  //   }
  //   originalConsoleError.apply(console, args);
  // };

  return (
  
    <Router>
       <Navbar />
       
      <div className="App">
          <RedirectToDefaultLanguage />
          <DirectionHandler /> {/* Handle direction change */}

        <Routes>
          <Route path="/:lang" element={<Home />} />
          <Route path="/:lang/services" element={<Services />} />
          <Route path="/:lang/about" element={<About />} />
          <Route path="/:lang/blogs" element={<Blogs />} />
          <Route path="/:lang/blogdetails/:id" element={<BlogDetails />} />
          <Route path="/:lang/about" element={<About />} />
          <Route path="/:lang/contact" element={<Contact />} />
          <Route path="/:lang/careers" element={<Careers />} />
          <Route path="/:lang/jobdescription/:id" element={<JobDescription />} />

          <Route path="/:lang/formdata" element={<SendMessageForm/>} />
          <Route path="/:lang/login" element={<Login/>} />
          <Route path="/:lang/signup" element={<SignUp/>} />
          <Route path="/:lang/forgetpassword" element={<ForgetPassword/>} />
          <Route path="/:lang/resetpassword" element={<ResetPassword/>} />
          <Route path="/:lang/validatecode" element={<Code/>} />

          <Route path="/:lang/termsandcondition" element={<TermsAndCondition />} />
          <Route path="/:lang/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <Footer />

    </Router>
  );
}

export default App;
