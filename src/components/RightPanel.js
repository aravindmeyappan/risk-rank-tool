import React from 'react';

const RightPanel = ({ sections, onSectionChange }) => (
  <div className="right-panel">
    {sections.map((section, index) => (
      <div
        key={index}
        className="section"
        onClick={() => onSectionChange(section)}
      >
        {section}
      </div>
    ))}
  </div>
);

export default RightPanel;
