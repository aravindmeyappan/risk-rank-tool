import React, { useState } from 'react';
import './AuthModal.css';
import { generateRandomId } from '../utils/utils'; 

const AuthModal = ({ show, onClose, onAuthenticate }) => {
  const [modelID, setModelID] = useState('');

  const handleAuthenticate = () => {
    const assessmentID = generateRandomId(); // Generate new assessment ID
    if (modelID) {
      onAuthenticate(assessmentID, modelID);
    } else {
      alert('Please enter Model ID.');
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
