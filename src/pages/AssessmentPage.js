import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import LeftPanel from '../components/LeftPanel';
import MainContent from '../components/MainContent';
import RightPanel from '../components/RightPanel';
import axios from 'axios';
import './AssessmentPage.css';

const AssessmentPage = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState('');
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const assessmentID = state ? state.assessmentID : '';

  useEffect(() => {
    if (data.length > 0) {
      setSelectedTab(data[0].Tab);
    }
    if (state && state.data) {
      setFormData(state.data);
    }
  }, [data, state]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleSectionChange = (section) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (tabName) => {
    try {
      const response = await axios.post('http://localhost:5000/save', {
        assessmentID,
        activeTab: selectedTab,
        formData,
      });
      console.log(response.data.message);
      console.log("response");
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleFieldChange = (tabName, fieldName, value) => {
    setFormData(prevState => ({
      ...prevState,
      [tabName]: {
        ...prevState[tabName],
        [fieldName]: value,
      }
    }));
  };

  const filteredSections = data.filter(item => item.Tab === selectedTab);
  const sections = Array.from(new Set(filteredSections.map(item => item.Section)));
  const filteredFields = filteredSections;

  return (
    <div className="assessment-page">
      <TopBar navigateHome={() => navigate('/')} assessmentID={assessmentID} />
      <div className="container">
        <LeftPanel
          tabs={Array.from(new Set(data.map(item => item.Tab)))}
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
        />
        <MainContent
          fields={filteredFields}
          sections={sections}
          assessmentID={assessmentID}
          selectedTab={selectedTab}
          onFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
        />
        <RightPanel
          sections={sections}
          onSectionChange={handleSectionChange}
        />
      </div>
    </div>
  );
};

export default AssessmentPage;
