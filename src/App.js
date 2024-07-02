import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import { readExcelFile } from './utils/excelReader';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExcelData = async () => {
      const response = await fetch('/config.xlsx');
      const blob = await response.blob();
      const excelData = await readExcelFile(blob);
      setData(excelData);
    };

    fetchExcelData();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/assessment">Assessment</Link></li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AssessmentPage data={data} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
