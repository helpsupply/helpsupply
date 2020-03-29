import React from 'react';
import PropTypes from 'prop-types';

import Form from 'components/Form';
import CreateFormFields, {
  formFieldPropTypes,
} from 'components/Form/CreateFormFields';

function FormBuilder({
  buttonLabel,
  children,
  defaultValues,
  description,
  disabled,
  fields,
  onSubmit,
  title,
}) {
  return (
    <Form
      buttonLabel={buttonLabel || 'Submit'}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      title={title}
      disabled={disabled}
      description={description}
    >
      {CreateFormFields(fields)}
      {children}
    </Form>
  );
}

FormBuilder.propTypes = {
  buttonLabel: PropTypes.string,
  children: PropTypes.object,
  defaultValues: PropTypes.object,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      ...formFieldPropTypes,
    }),
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default FormBuilder;
