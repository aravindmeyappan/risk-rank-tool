import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import LeftPanel from '../components/LeftPanel';
import MainContent from '../components/MainContent';
import RightPanel from '../components/RightPanel';
import './AssessmentPage.css';

const AssessmentPage = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState('');
  const navigate = useNavigate(); // Import and use useNavigate

  useEffect(() => {
    if (data.length > 0) {
      setSelectedTab(data[0].Tab);
    }
  }, [data]);

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
    <div className="assessment-page">
      <TopBar navigateHome={() => navigate('/')} />
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
};

export default AssessmentPage;
