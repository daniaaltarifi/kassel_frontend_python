import React, { useEffect, useState } from 'react'
import '../Css/about.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function Mainbackground({path}) {
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;

const [mainBackground,setMainBackground]=useState([])
  useEffect(()=>{
const fetchMainBackground =async ()=>{
  try {
    const response = await axios(`${API_URL}/backgroundpath/${lang}/${path}`);
    const data = await response.data;
    setMainBackground(data)
  } catch (error) {
    console.error('Error fetching background', error);
    
  }
 
}
fetchMainBackground()
  },[])
  return (
    <>
    <div className="home">
      {mainBackground.map((back)=>(
 <div className="content"key={back.id}>
    
 {/* Scattered icons */}
 <div className="scattered-icons">
   <i className="bi bi-plus"style={{ fontWeight: '700', fontSize: '32px',color:'#e0cef5' }}></i>
   
  
   <i className="bi bi-chevron-double-left"style={{ fontWeight: '700', fontSize: '22px',color:'#e0cef5' }}></i>
  <i className="bi bi-water"style={{ fontWeight: '700',color:'#e0cef5' }}></i>
 </div>
   <h5>{back.subtitle} </h5>
   <h1 className="about-title mt-2">
{back.title}   </h1>
   <p className="about-prag mt-4">
     <span>
       <i className="bi bi-house-door-fill m-2" style={{ fontWeight: '900', fontSize: '22px' }}></i>
     </span>
     Home
     <span>
       <i className="bi bi-slash-lg m-2" style={{ color: 'black', fontWeight: '900', fontSize: '22px'}}></i>
     </span>
{back.path}   </p>
 </div>
      ))}
 
 {/* Scattered icons */}
 <div className="scattered-icons">
 <i className="bi bi-chevron-double-left"style={{  fontSize: '20px' }}></i>
   
    <i className="bi bi-plus-lg"style={{color:'#e0cef5'}}></i>
   
  </div>
</div>

  {/* Section Services Start */}
    
    </>
  )
}

export default Mainbackground