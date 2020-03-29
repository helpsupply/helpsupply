import React from 'react';
import PropTypes from 'prop-types';

import InputText from 'components/InputText';
import InputDropdown from 'components/InputDropdown';

export const formFieldTypes = {
  INPUT_DROPDOWN: 'INPUT_DROPDOWN',
  INPUT_TEXT: 'INPUT_TEXT',
};

export const formFieldPropTypes = {
  customOnChange: PropTypes.func,
  isHalfWidth: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(Object.values(formFieldTypes)).isRequired,
  value: PropTypes.string,
};

const inputMap = {
  [formFieldTypes.INPUT_DROPDOWN]: InputDropdown,
  [formFieldTypes.INPUT_TEXT]: InputText,
};

function CreateFormFields(fields) {
  const formFields = fields.map(({ type, ...rest }) => {
    const InputEl = inputMap[type];

    return <InputEl key={rest.label} {...rest} />;
  });

  return formFields;
}

CreateFormFields.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      formFieldPropTypes,
    }),
  ).isRequired,
};

export default CreateFormFields;
