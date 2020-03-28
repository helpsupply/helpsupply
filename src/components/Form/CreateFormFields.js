import React from 'react';
import PropTypes from 'prop-types';

import InputText from 'components/InputText';
import InputDropdown from 'components/InputDropdown';

export const formFieldTypes = {
  INPUT_DROPDOWN: 'INPUT_DROPDOWN',
  INPUT_TEXT: 'INPUT_TEXT',
};

const inputMap = {
  [formFieldTypes.INPUT_DROPDOWN]: InputDropdown,
  [formFieldTypes.INPUT_TEXT]: InputText,
};

function CreateFormFields(data) {
  const formFields = data.map(({ type, ...rest }) => {
    const InputEl = inputMap[type];

    return <InputEl key={rest.label} {...rest} />;
  });

  return formFields;
}

CreateFormFields.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      customOnChange: PropTypes.func,
      isHalfWidth: PropTypes.bool,
      label: PropTypes.string,
      type: PropTypes.oneOf(Object.values(formFieldTypes)).isRequired,
      options: PropTypes.array,
      placeholder: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
};

export default CreateFormFields;
