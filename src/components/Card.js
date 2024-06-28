// src/components/Card.js

import React from 'react';
import FieldInput from './FieldInput';

const Card = ({ field }) => (
  <div className="card">
    <h3>{field['Field-name']}</h3>
    {field.present_or_not1 !== 'n' && (
      <FieldInput
        description={field.description1}
        presentOrNot={field.present_or_not1}
        inputType={field.input_type1}
        inputCriteria={field.input_criteria1}
        defaultInput={field.default_input1}
      />
    )}
    {field.present_or_not2 !== 'n' && (
      <FieldInput
        description={field.description2}
        presentOrNot={field.present_or_not2}
        inputType={field.input_type2}
        inputCriteria={field.input_criteria2}
        defaultInput={field.default_input2}
      />
    )}
    {field.present_or_not3 !== 'n' && (
      <FieldInput
        description={field.description3}
        presentOrNot={field.present_or_not3}
        inputType={field.input_type3}
        inputCriteria={field.input_criteria3}
        defaultInput={field.default_input3}
      />
    )}
  </div>
);

export default Card;
