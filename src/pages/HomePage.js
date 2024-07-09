import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
import RetrieveModal from '../components/RetrieveModal';
import TopBar from './topbarhomepage'
import './HomePage.css';

const HomePage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRetrieveModal, setShowRetrieveModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenAuthModal = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleOpenRetrieveModal = () => {
    setShowRetrieveModal(true);
  };

  const handleCloseRetrieveModal = () => {
    setShowRetrieveModal(false);
  };

  const handleAuthenticate = (assessmentID, modelID) => {
    console.log('Authenticated with:', assessmentID, modelID);
    navigate('/assessment', { state: { assessmentID } });
  };

  const handleRetrieve = async (data) => {
    navigate('/assessment', { state: { assessmentID: data.assessmentID, data: data.data } });
  };
  
  return (
    <div className="home-page">
      <TopBar/>
      <button className="navigate-button-new" onClick={handleOpenAuthModal}>Create New Assessment</button>
      <button className="navigate-button-old" onClick={handleOpenRetrieveModal}>Open Existing Assessment</button>
      <AuthModal show={showAuthModal} onClose={handleCloseAuthModal} onAuthenticate={handleAuthenticate} />
      <RetrieveModal show={showRetrieveModal} onClose={handleCloseRetrieveModal} onRetrieve={handleRetrieve} />
    </div>
  );
};

export default HomePage;
