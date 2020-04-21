import React from 'react';
import PropTypes from 'prop-types';

import Form from 'components/Form';
import CreateFormFields, {
  formFieldPropTypes,
} from 'components/Form/CreateFormFields';

function FormBuilder({
  buttonLabel,
  children,
  subSection,
  defaultValues,
  description,
  disabled,
  fields,
  isLoading,
  onSubmit,
  title,
}) {
  return (
    <Form
      buttonLabel={buttonLabel}
      subSection={subSection}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      title={title}
      disabled={disabled}
      description={description}
      isLoading={isLoading}
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
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      ...formFieldPropTypes,
    }),
  ).isRequired,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subSection: PropTypes.object,
};

export default FormBuilder;
