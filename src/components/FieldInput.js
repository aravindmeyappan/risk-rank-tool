import React from 'react';

const FieldInput = ({ description, presentOrNot, inputType, inputCriteria, defaultInput }) => {
  const renderInput = () => {
    switch (inputType) {
      case 'text':
        return <input type="text" defaultValue={defaultInput} />;
      case 'numeric':
        return <input type="number" defaultValue={defaultInput} />;
      case 'dropdown':
        return (
          <select defaultValue={defaultInput}>
            {inputCriteria.split(',').map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'multiline':
        return <textarea defaultValue={defaultInput} />;
      case 'read-only':
        return <span>{defaultInput}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="field-input">
      <p>{description}</p>
      {renderInput()}
    </div>
  );
};

export default FieldInput;
