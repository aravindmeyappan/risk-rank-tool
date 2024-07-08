import React, { useState } from 'react';
import axios from 'axios';
import './RetrieveModal.css';

const RetrieveModal = ({ show, onClose, onRetrieve }) => {
  const [assessmentID, setAssessmentID] = useState('');
  const [modelID, setModelID] = useState('');

  const handleRetrieve = async () => {
    if (assessmentID && modelID) {
      try {
        const response = await axios.post('http://localhost:5000/retrieve', { assessmentID, modelID });
        onRetrieve(response.data);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
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
        <h2>Retrieve Assessment</h2>
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
          <button onClick={handleRetrieve}>Retrieve</button>
        </div>
      </div>
    </div>
  );
};

export default RetrieveModal;
