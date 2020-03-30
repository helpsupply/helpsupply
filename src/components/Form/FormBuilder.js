import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

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
  onSubmit,
  title,
}) {
  const { t } = useTranslation();

  return (
    <Form
      buttonLabel={buttonLabel || t('generic.form.submitLabel')}
      subSection={subSection}
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
  subSection: PropTypes.object,
};

export default FormBuilder;
