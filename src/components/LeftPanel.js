// src/components/LeftPanel.js

import React from 'react';

const LeftPanel = ({ tabs, selectedTab, onTabChange }) => (
  <div className="left-panel">
    {tabs.map(tab => (
      <div
        key={tab}
        className={`tab ${tab === selectedTab ? 'selected' : ''}`}
        onClick={() => onTabChange(tab)}
      >
        {tab}
      </div>
    ))}
  </div>
);

export default LeftPanel;
