/** @jsx jsx */
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { ErrorContext } from 'state/ErrorProvider';

import { Errors } from 'lib/constants/errors';
import { Routes } from 'lib/constants/routes';
import { isValidEmail } from 'lib/utils/validations';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

export const EmailListForm = ({ backend }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setError } = useContext(ErrorContext);
  const [email, setEmail] = useState('');

  const validate = (val) => {
    if (!isValidEmail(val)) {
      return Errors.EMAIL;
    }
  };

  const handleSubmit = () => {
    backend
      .saveToEmailList(email)
      .then(() => {
        history.push(Routes.SERVICE_LOCATION_UNAVAILABLE_SIGNUP_COMPLETE);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const fieldData = [
    {
      customOnChange: setEmail,
      label: t('global.form.emailAddressLabel'),
      name: 'email',
      type: formFieldTypes.INPUT_EMAIL,
      validation: { validate },
    },
  ];

  return (
    <FormBuilder
      defaultValues={{ email: '' }}
      onSubmit={handleSubmit}
      title={t('service.unavailable.title')}
      description={t('service.unavailable.description')}
      disabled={!isValidEmail(email)}
      fields={fieldData}
      buttonLabel={t('global.form.submitLabel')}
    />
  );
};

export default EmailListForm;
