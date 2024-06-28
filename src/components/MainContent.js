import React, { useState } from 'react';
import './MainContent.css'; 

const MainContent = ({ fields, sections }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (section, fieldName, inputIndex, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [fieldName]: {
          ...prevData[section]?.[fieldName],
          [`input${inputIndex}`]: value,
        }
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Perform any additional actions with formData, such as sending it to a server
  };

  return (
    <div className="main-content">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} id={section}>
          <h2>{section}</h2>
          {fields.filter(field => field.Section === section).map((field, fieldIndex) => (
            <div key={fieldIndex} className="card">
              <div className="field-name"><b>{field['Field-name']}</b></div>
              {field.present_or_not1 !== 'n' && (
                <div className="field-row">
                  <div className="field-input">
                    {field.input_type1 === 'text' && (
                      <input
                        type="text"
                        defaultValue={field.default_input1}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 1, e.target.value)}
                      />
                    )}
                    {field.input_type1 === 'numeric' && (
                      <input
                        type="number"
                        defaultValue={field.default_input1}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 1, e.target.value)}
                      />
                    )}
                    {field.input_type1 === 'dropdown' && (
                      <select
                        defaultValue={field.default_input1}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 1, e.target.value)}
                      >
                        {field.input_criteria1.split(',').map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    {field.input_type1 === 'read-only' && (
                      <input
                        type="text"
                        defaultValue={field.default_input1}
                        readOnly
                      />
                    )}
                    {field.input_type1 === 'multiline' && (
                      <textarea
                        defaultValue={field.default_input1}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 1, e.target.value)}
                        className="fixed-size-textarea" // Apply CSS class for fixed size
                      />
                    )}
                  </div>
                  <div className="field-description">{field.description1}</div>
                </div>
              )}
              {field.present_or_not2 !== 'n' && (
                <div className="field-row">
                  <div className="field-input">
                    {field.input_type2 === 'text' && (
                      <input
                        type="text"
                        defaultValue={field.default_input2}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 2, e.target.value)}
                      />
                    )}
                    {field.input_type2 === 'numeric' && (
                      <input
                        type="number"
                        defaultValue={field.default_input2}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 2, e.target.value)}
                      />
                    )}
                    {field.input_type2 === 'dropdown' && (
                      <select
                        defaultValue={field.default_input2}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 2, e.target.value)}
                      >
                        {field.input_criteria2.split(',').map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    {field.input_type2 === 'read-only' && (
                      <input
                        type="text"
                        defaultValue={field.default_input2}
                        readOnly
                      />
                    )}
                    {field.input_type2 === 'multiline' && (
                      <textarea
                        defaultValue={field.default_input2}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 2, e.target.value)}
                        className="fixed-size-textarea" // Apply CSS class for fixed size
                      />
                    )}
                  </div>
                  <div className="field-description">{field.description2}</div>
                </div>
              )}
              {field.present_or_not3 !== 'n' && (
                <div className="field-row">
                  <div className="field-input">
                    {field.input_type3 === 'text' && (
                      <input
                        type="text"
                        defaultValue={field.default_input3}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 3, e.target.value)}
                      />
                    )}
                    {field.input_type3 === 'numeric' && (
                      <input
                        type="number"
                        defaultValue={field.default_input3}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 3, e.target.value)}
                      />
                    )}
                    {field.input_type3 === 'dropdown' && (
                      <select
                        defaultValue={field.default_input3}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 3, e.target.value)}
                      >
                        {field.input_criteria3.split(',').map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    {field.input_type3 === 'read-only' && (
                      <input
                        type="text"
                        defaultValue={field.default_input3}
                        readOnly
                      />
                    )}
                    {field.input_type3 === 'multiline' && (
                      <textarea
                        defaultValue={field.default_input3}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 3, e.target.value)}
                        className="fixed-size-textarea" // Apply CSS class for fixed size
                      />
                    )}
                  </div>
                  <div className="field-description">{field.description3}</div>
                </div>
              )}
              {field.present_or_not1 === 'e' && (
                <div className="field-row">
                  <div className="field-description">{field.description1}</div>
                </div>
              )}
              {field.present_or_not2 === 'e' && (
                <div className="field-row">
                  <div className="field-description">{field.description2}</div>
                </div>
              )}
              {field.present_or_not3 === 'e' && (
                <div className="field-row">
                  <div className="field-description">{field.description3}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MainContent;
