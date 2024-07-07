import React, { useState, useEffect } from 'react';
import './MainContent.css';
import { validatePlayerID } from './validations';

const MainContent = ({ fields, sections }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initialFormData = {};
    sections.forEach(section => {
      initialFormData[section] = {};
      fields.filter(field => field.Section === section).forEach(field => {
        initialFormData[section][field['Field-name']] = {};
        if (field.present_or_not1 !== 'n') {
          initialFormData[section][field['Field-name']]['input1'] = field.default_input1;
        }
        if (field.present_or_not2 !== 'n') {
          initialFormData[section][field['Field-name']]['input2'] = field.default_input2;
        }
        if (field.present_or_not3 !== 'n') {
          initialFormData[section][field['Field-name']]['input3'] = field.default_input3;
        }
      });
    });
    setFormData(initialFormData);
  }, [fields, sections]);

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

    // Validate Player ID if the field is Player ID
    if (fieldName === 'Player ID') {
      const isValid = validatePlayerID(value);
      setErrors(prevErrors => ({
        ...prevErrors,
        [section]: {
          ...prevErrors[section],
          [fieldName]: {
            ...prevErrors[section]?.[fieldName],
            [`input${inputIndex}`]: isValid ? '' : 'Invalid Player ID format',
          }
        }
      }));
    }
  };

  const isDefaultValue = (section, fieldName, inputIndex) => {
    return formData[section]?.[fieldName]?.[`input${inputIndex}`] === fields.find(field => field['Field-name'] === fieldName)[`default_input${inputIndex}`];
  };

  // const handleEditableButtonClick = (section, fieldName, inputIndex, targetFieldName) => {
  //   let targetValue = 'Please input the necessary values for calculation';
    
  //   for (const sectionKey in formData) {
  //     if (formData[sectionKey][targetFieldName]) {
  //       targetValue = formData[sectionKey][targetFieldName][`input${inputIndex}`] || targetValue;
  //       break;
  //     }
  //   }

  //   console.log(targetValue);

  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     [section]: {
  //       ...prevFormData[section],
  //       [fieldName]: {
  //         ...prevFormData[section]?.[fieldName],
  //         [`input${inputIndex}`]: targetValue,
  //       }
  //     }
  //   }));
  // };
  const handleEditableButtonClick = (section, fieldName, inputIndex, formData, formula) => {
    const { fields, operator } = parseFormula(formula);
  
    let values = fields.map(field => {
      for (const sec in formData) {
        for (const f in formData[sec]) {
          if (f === field) {
            return formData[sec][f][`input${inputIndex}`];
          }
        }
      }
      return null;
    });
  
    if (values.includes(null) || values.includes('')) {
      alert('Please enter all necessary columns for evaluation');
      return;
    }
  
    let result;
    switch (operator) {
      case '+':
        result = values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
        break;
      case '-':
        result = values.reduce((a, b) => parseFloat(a) - parseFloat(b));
        break;
      case '*':
        result = values.reduce((a, b) => parseFloat(a) * parseFloat(b), 1);
        break;
      case '/':
        result = values.reduce((a, b) => parseFloat(a) / parseFloat(b));
        break;
      case 'Max':
        result = Math.max(...values.map(v => parseFloat(v)));
        break;
      case 'Min':
        result = Math.min(...values.map(v => parseFloat(v)));
        break;
      case 'yesand':
        result = values.every(v => v === 'Yes') ? 'Yes' : 'No';
        break;
      case 'noand':
        result = values.every(v => v === 'No') ? 'No' : 'Yes';
        break;
      default:
        result = 'Invalid formula';
    }
  
    console.log(result);
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [fieldName]: {
          ...prevFormData[section]?.[fieldName],
          [`input${inputIndex}`]: result,
        }
      }
    }));
  };
  
  

  const parseFormula = (formula) => {
    const operators = ['+', '-', '*', '/', 'Max', 'Min', 'yesand', 'noand'];
    let operator = null;
    let fields = [];
  
    const yesAndMatch = formula.match(/yesand\(([^)]+)\)/);
    const noAndMatch = formula.match(/noand\(([^)]+)\)/);
    const maxMatch = formula.match(/Max\(([^)]+)\)/);
    const minMatch = formula.match(/Min\(([^)]+)\)/);
  
    if (yesAndMatch) {
      operator = 'yesand';
      fields = yesAndMatch[1].split(',').map(f => f.trim());
    } else if (noAndMatch) {
      operator = 'noand';
      fields = noAndMatch[1].split(',').map(f => f.trim());
    } else if (maxMatch) {
      operator = 'Max';
      fields = maxMatch[1].split(',').map(f => f.trim());
    } else if (minMatch) {
      operator = 'Min';
      fields = minMatch[1].split(',').map(f => f.trim());
    } else {
      for (const op of operators) {
        if (formula.includes(op) && !operator) {
          operator = op;
          fields = formula.split(op).map(f => f.trim());
          break;
        }
      }
    }
  
    return { fields, operator };
  };
  
  

  const handleSubmit = () => {
    const submittedData = { ...formData };
    console.log('Form Data on Submit:', submittedData);
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
                        value={formData[section]?.[field['Field-name']]?.['input1'] || ''}
                        className={isDefaultValue(section, field['Field-name'], 1) ? 'default-value' : 'user-input'}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 1, e.target.value)}
                      />
                    )}
                    {field.input_type1 === 'numeric' && (
                      <input
                        type="number"
                        value={formData[section]?.[field['Field-name']]?.['input1'] || ''}
                        className={isDefaultValue(section, field['Field-name'], 1) ? 'default-value' : 'user-input'}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 1, e.target.value)}
                      />
                    )}
                    {field.input_type1 === 'dropdown' && (
                      <select
                        value={formData[section]?.[field['Field-name']]?.['input1'] || ''}
                        className={isDefaultValue(section, field['Field-name'], 1) ? 'default-value' : 'user-input'}
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
                        value={formData[section]?.[field['Field-name']]?.['input1'] || field.default_input1}
                        className="default-value"
                        readOnly
                      />
                    )}
                    {field.input_type1 === 'multiline' && (
                      <textarea
                        value={formData[section]?.[field['Field-name']]?.['input1'] || ''}
                        className={`fixed-size-textarea ${isDefaultValue(section, field['Field-name'], 1) ? 'default-value' : 'user-input'}`}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 1, e.target.value)}
                      />
                    )}
                  </div>
                  <div className="field-description">{field.description1}</div>
                  {errors[section]?.[field['Field-name']]?.['input1'] && (
                    <div className="error-message">{errors[section][field['Field-name']]['input1']}</div>
                  )}
                  {field.present_or_not1 === 'e' && (
                    <button onClick={() => handleEditableButtonClick(section, field['Field-name'], 1, formData, field.formula1)}>Evaluate</button>
                  )}
                </div>
              )}
              {field.present_or_not2 !== 'n' && (
                <div className="field-row">
                  <div className="field-input">
                    {field.input_type2 === 'text' && (
                      <input
                        type="text"
                        value={formData[section]?.[field['Field-name']]?.['input2'] || ''}
                        className={isDefaultValue(section, field['Field-name'], 2) ? 'default-value' : 'user-input'}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 2, e.target.value)}
                      />
                    )}
                    {field.input_type2 === 'numeric' && (
                      <input
                        type="number"
                        value={formData[section]?.[field['Field-name']]?.['input2'] || ''}
                        className={isDefaultValue(section, field['Field-name'], 2) ? 'default-value' : 'user-input'}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 2, e.target.value)}
                      />
                    )}
                    {field.input_type2 === 'dropdown' && (
                      <select
                        value={formData[section]?.[field['Field-name']]?.['input2'] || ''}
                        className={isDefaultValue(section, field['Field-name'], 2) ? 'default-value' : 'user-input'}
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
                        value={formData[section]?.[field['Field-name']]?.['input2'] || field.default_input2}
                        className="default-value"
                        readOnly
                      />
                    )}
                    {field.input_type2 === 'multiline' && (
                      <textarea
                        value={formData[section]?.[field['Field-name']]?.['input2'] || ''}
                        className={`fixed-size-textarea ${isDefaultValue(section, field['Field-name'], 2) ? 'default-value' : 'user-input'}`}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 2, e.target.value)}
                      />
                    )}
                  </div>
                  <div className="field-description">{field.description2}</div>
                  {errors[section]?.[field['Field-name']]?.['input2'] && (
                    <div className="error-message">{errors[section][field['Field-name']]['input2']}</div>
                  )}
                  {field.present_or_not2 === 'e' && (
                    <button onClick={() => handleEditableButtonClick(section, field['Field-name'], 2, formData, field.formula1)}>Evaluate</button>
                  )}
                </div>
              )}
              {field.present_or_not3 !== 'n' && (
                <div className="field-row">
                  <div className="field-input">
                    {field.input_type3 === 'text' && (
                      <input
                        type="text"
                        value={formData[section]?.[field['Field-name']]?.['input3'] || ''}
                        className={isDefaultValue(section, field['Field-name'], 3) ? 'default-value' : 'user-input'}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 3, e.target.value)}
                      />
                    )}
                    {field.input_type3 === 'numeric' && (
                      <input
                        type="number"
                        value={formData[section]?.[field['Field-name']]?.['input3'] || ''}
                        className={isDefaultValue(section, field['Field-name'], 3) ? 'default-value' : 'user-input'}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 3, e.target.value)}
                      />
                    )}
                    {field.input_type3 === 'dropdown' && (
                      <select
                        value={formData[section]?.[field['Field-name']]?.['input3'] || ''}
                        className={isDefaultValue(section, field['Field-name'], 3) ? 'default-value' : 'user-input'}
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
                        value={formData[section]?.[field['Field-name']]?.['input3'] || field.default_input3}
                        className="default-value"
                        readOnly
                      />
                    )}
                    {field.input_type3 === 'multiline' && (
                      <textarea
                        value={formData[section]?.[field['Field-name']]?.['input3'] || ''}
                        className={`fixed-size-textarea ${isDefaultValue(section, field['Field-name'], 3) ? 'default-value' : 'user-input'}`}
                        onChange={(e) => handleInputChange(section, field['Field-name'], 3, e.target.value)}
                      />
                    )}
                  </div>
                  <div className="field-description">{field.description3}</div>
                  {errors[section]?.[field['Field-name']]?.['input3'] && (
                    <div className="error-message">{errors[section][field['Field-name']]['input3']}</div>
                  )}
                  {field.present_or_not3 === 'e' && (
                    <button onClick={() => handleEditableButtonClick(section, field['Field-name'], 3, formData, field.formula1)}>Evaluate</button>
                  )}
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