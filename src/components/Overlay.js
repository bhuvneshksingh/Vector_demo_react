import React, { useState,useEffect } from 'react';
import Spinner from '../assets/Spinner.gif';
import closeImg from '../assets/close.png';

export default function ImgOverlay({src, alt, closeFun}){

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleEsc = (event) => {
       if (event.keyCode === 27) {
       closeFun();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeFun]);

  const [loading, setLoading] = useState(true);

  const imageLoaded = () => {
    setLoading(false);
  }
  
  return <div className="overlay-container">
    <div className="overlay-content">
      <span onClick={closeFun} className="close-button"><img src={closeImg} alt="" /></span>
      <div style={{display: loading ? "block" : "none", backgroundColor: "white"}}>
        <img src={Spinner} alt="" />
      </div>
      <img src={src} alt={alt} onLoad={imageLoaded} style={{display: loading ? "none" : "block"}} className="overlay-image" /> 
    </div>
  </div>
}