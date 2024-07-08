import React from 'react';
import './TopBar.css';

const TopBar = ({ navigateHome, assessmentID }) => (
  <div className="top-bar">
    <h1>Player Decision Tool</h1>
    {assessmentID && <span className="assessment-id">Assessment ID: {assessmentID}</span>}
    <button className="home-icon" onClick={navigateHome}>🏠</button>
  </div>
);

export default TopBar;
