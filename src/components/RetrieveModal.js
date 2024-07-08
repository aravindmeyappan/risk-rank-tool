import React, { useState } from 'react';
import axios from 'axios';
import './RetrieveModal.css';

const RetrieveModal = ({ show, onClose, onRetrieve }) => {
  const [assessmentID, setAssessmentID] = useState('');

  const handleRetrieve = async () => {
    if (assessmentID) {
      try {
        const response = await axios.get(`http://localhost:5000/retrieve`, { params: { assessmentID } });
        onRetrieve(response.data);
        console.log('Assessment ID:', assessmentID)
        console.log('Retrieved data:', response.data);
      } catch (error) {
        console.error('Error retrieving data:', error);
        alert('Assessment not found.');
      }
    } else {
      alert('Please enter Assessment ID.');
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