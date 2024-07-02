import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
import './HomePage.css';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAuthenticate = (assessmentID, modelID) => {
    // Perform authentication here
    console.log('Authenticated with:', assessmentID, modelID);
    navigate('/assessment');
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <button className="navigate-button" onClick={handleOpenModal}>Go to Assessment Page</button>
      <AuthModal show={showModal} onClose={handleCloseModal} onAuthenticate={handleAuthenticate} />
    </div>
  );
};

export default HomePage;
