import React, { useState, useEffect } from 'react';
import { readExcelFile } from './utils/excelReader';
import TopBar from './components/TopBar';
import LeftPanel from './components/LeftPanel';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('');

  useEffect(() => {
    const fetchExcelData = async () => {
      const response = await fetch('/config.xlsx');
      const blob = await response.blob();
      const excelData = await readExcelFile(blob);
      setData(excelData);
      if (excelData.length > 0) {
        setSelectedTab(excelData[0].Tab);
      }
    };

    fetchExcelData();
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleSectionChange = (section) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredSections = data.filter(item => item.Tab === selectedTab);
  const sections = Array.from(new Set(filteredSections.map(item => item.Section)));
  const filteredFields = filteredSections;

  return (
    <div className="App">
      <TopBar />
      <div className="container">
        <LeftPanel
          tabs={Array.from(new Set(data.map(item => item.Tab)))}
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
        />
        <MainContent fields={filteredFields} sections={sections} />
        <RightPanel
          sections={sections}
          onSectionChange={handleSectionChange}
        />
      </div>
    </div>
  );
}

export default App;
