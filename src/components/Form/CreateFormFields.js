import React from 'react';
import PropTypes from 'prop-types';

import HeaderInfo from 'components/Form/HeaderInfo';
import InputCheckbox from 'components/Checkbox';
import InputDate from 'components/InputDate';
import InputDropdown from 'components/InputDropdown';
import InputText from 'components/InputText/InputText';
import InputPhone from 'components/InputText/InputPhone';
import InputEmail from 'components/InputText/InputEmail';
import InputZip from 'components/InputText/InputZip';
import TextArea from 'components/TextArea';

export const formFieldTypes = {
  HEADER_INFO: 'HEADER_INFO',
  INPUT_CHECKBOX: 'INPUT_CHECKBOX',
  INPUT_DATE: 'INPUT_DATE',
  INPUT_DROPDOWN: 'INPUT_DROPDOWN',
  INPUT_TEXT: 'INPUT_TEXT',
  INPUT_PHONE: 'INPUT_PHONE',
  INPUT_EMAIL: 'INPUT_EMAIL',
  INPUT_ZIP: 'INPUT_ZIP',
  NODE: 'NODE',
  TEXT_AREA: 'TEXT_AREA',
};

export const formFieldPropTypes = {
  customOnChange: PropTypes.func,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.instanceOf(Date),
  ]),
  isHalfWidth: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(Object.values(formFieldTypes)).isRequired,
  validation: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.instanceOf(Date),
  ]),
};

const inputMap = {
  [formFieldTypes.HEADER_INFO]: HeaderInfo,
  [formFieldTypes.INPUT_CHECKBOX]: InputCheckbox,
  [formFieldTypes.INPUT_DATE]: InputDate,
  [formFieldTypes.INPUT_DROPDOWN]: InputDropdown,
  [formFieldTypes.INPUT_TEXT]: InputText,
  [formFieldTypes.INPUT_PHONE]: InputPhone,
  [formFieldTypes.INPUT_EMAIL]: InputEmail,
  [formFieldTypes.INPUT_ZIP]: InputZip,
  [formFieldTypes.TEXT_AREA]: TextArea,
};

function CreateFormFields(fields) {
  const formFields = fields.map(({ type, ...rest }) => {
    if (type === formFieldTypes.NODE) {
      return rest.node;
    }

    const InputEl = inputMap[type];
    return (
      <InputEl key={rest.customkey || rest.label || rest.title} {...rest} />
    );
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
