import React from 'react';
import './splash-screen.scss';
const logo = require('../../images/logo.png');
const SplashScreen = () => (
  <div id="splash-screen" className="splash-screen">
    <img src={logo} alt="logo" width="160" />
    <svg className="spinner" viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
    </svg>
  </div>
);

export default SplashScreen;
