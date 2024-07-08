// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import { readExcelFile } from './utils/excelReader';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [assessmentID, setAssessmentID] = useState('');

  useEffect(() => {
    const fetchExcelData = async () => {
      const response = await fetch('/config.xlsx');
      const blob = await response.blob();
      const excelData = await readExcelFile(blob);
      setData(excelData);
    };

    fetchExcelData();
  }, []);

  const handleAuthenticate = (generatedID) => {
    setAssessmentID(generatedID);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AssessmentPage data={data} assessmentID={assessmentID} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
