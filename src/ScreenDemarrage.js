import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EcranDemarrage.css'; 
import LOGO from './assets/LOGO.png'; 

const ScreenDemarrage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Redirection vers Dashboard");
      setIsLoaded(true);
    }, 5000); 

    return () => clearTimeout(timer); 
  }, []);

  if (isLoaded) {
    navigate('/dashboard');
    return null; 
  }

  return (
    <div className="ecran-demarrage">
            <img src={LOGO} alt="ecran-demarrage" />

      <div className="loader"></div>
    </div>
  );
};

export default ScreenDemarrage;
