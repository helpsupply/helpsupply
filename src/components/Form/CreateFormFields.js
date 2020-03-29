import React from 'react';
import PropTypes from 'prop-types';

import HeaderInfo from 'components/Form/HeaderInfo';
import InputCheckbox from 'components/Checkbox';
import InputText from 'components/InputText';
import InputDropdown from 'components/InputDropdown';
import TextArea from 'components/TextArea';

export const formFieldTypes = {
  HEADER_INFO: 'HEADER_INFO',
  INPUT_CHECKBOX: 'INPUT_CHECKBOX',
  INPUT_DROPDOWN: 'INPUT_DROPDOWN',
  INPUT_TEXT: 'INPUT_TEXT',
  NODE: 'NODE',
  TEXT_AREA: 'TEXT_AREA',
};

export const formFieldPropTypes = {
  customOnChange: PropTypes.func,
  isHalfWidth: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(Object.values(formFieldTypes)).isRequired,
  validation: PropTypes.object,
  value: PropTypes.string,
};

const inputMap = {
  [formFieldTypes.HEADER_INFO]: HeaderInfo,
  [formFieldTypes.INPUT_CHECKBOX]: InputCheckbox,
  [formFieldTypes.INPUT_DROPDOWN]: InputDropdown,
  [formFieldTypes.INPUT_TEXT]: InputText,
  [formFieldTypes.TEXT_AREA]: TextArea,
};

function CreateFormFields(fields) {
  const formFields = fields.map(({ type, ...rest }) => {
    if (type === formFieldTypes.NODE) {
      return rest.node;
    }

    const InputEl = inputMap[type];
    return <InputEl key={rest.label || rest.title} {...rest} />;
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
