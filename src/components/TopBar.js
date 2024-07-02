import React from 'react';
import './TopBar.css';

const TopBar = ({ navigateHome }) => (
  <div className="top-bar">
    <h1>Player Decision Tool</h1>
    <button className="home-icon" onClick={navigateHome}>🏠</button>
  </div>
);

export default TopBar;
