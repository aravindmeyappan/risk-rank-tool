import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ show, onClose, onAuthenticate }) => {
  const [assessmentID, setAssessmentID] = useState('');
  const [modelID, setModelID] = useState('');

  const handleAuthenticate = () => {
    if (assessmentID && modelID) {
      onAuthenticate(assessmentID, modelID);
    } else {
      alert('Please enter both Assessment ID and Model ID.');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Authentication</h2>
        <div className="modal-body">
          <label>
            Assessment ID:
            <input
              type="text"
              value={assessmentID}
              onChange={(e) => setAssessmentID(e.target.value)}
            />
          </label>
          <label>
            Model ID:
            <input
              type="text"
              value={modelID}
              onChange={(e) => setModelID(e.target.value)}
            />
          </label>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleAuthenticate}>Authenticate</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
