import React from 'react';
import PropTypes from 'prop-types';

import Form from 'components/Form';
import CreateFormFields, {
  formFieldPropTypes,
} from 'components/Form/CreateFormFields';

function CreateForm({
  buttonLabel,
  disabled,
  description,
  formFields,
  onSubmit,
  otherContent,
  title,
}) {
  return (
    <Form
      buttonLabel={buttonLabel || 'Submit'}
      onSubmit={onSubmit}
      title={title}
      disabled={disabled}
      description={description}
    >
      {CreateFormFields(formFields)}
      {otherContent}
    </Form>
  );
}

CreateForm.propTypes = {
  buttonLabel: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      formFieldPropTypes,
    }),
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  otherContent: PropTypes.object,
  title: PropTypes.string,
};

export default CreateForm;
