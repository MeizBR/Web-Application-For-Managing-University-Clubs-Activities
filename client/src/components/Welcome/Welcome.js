import React from 'react';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
    
      <h1 className="title " style={{fontSize :"40px"}} > Welcome to our platform! </h1>
      <p className="subtitle">Stay connected .. Stay informed </p> 
      <ul className="custom-bullets">
        <li>Explore our Workshops</li>
        <li>Explore our Formations</li>
        <li>Unlock your potential today!</li>
      </ul>
    </div>
  );
};

export default Welcome;