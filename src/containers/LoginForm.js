/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Errors } from 'lib/constants/errors';
import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidEmail } from 'lib/utils/validations';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import FormPrivacyNode from 'components/FormPrivacyNode';

function LoginForm({ backend }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = (val) => {
    if (!isValidEmail(val)) {
      return Errors.EMAIL;
    }
  };

  useEffect(() => {
    return backend.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push(routeWithParams(Routes.DASHBOARD));
      }
    });
  });

  const handleSubmit = () => {
    setIsLoading(true);

    backend
      .loginServicesWithEmail(email)
      .then(() => {
        history.push(routeWithParams(Routes.EMAIL_SIGNUP_SENT));
      })
      .catch((error) => {
        console.error('error', error);
        setIsLoading(false);
      });
    // service TODO: handle exceptions
  };

  const fieldData = [
    {
      customOnChange: setEmail,
      label: t('workEmailForm.workEmail.label'),
      name: 'email',
      type: formFieldTypes.INPUT_EMAIL,
      validation: { validate },
    },
    {
      type: formFieldTypes.NODE,
      node: <FormPrivacyNode key="privacy-policy" />,
    },
  ];

  return (
    <FormBuilder
      defaultValues={{ email: '' }}
      onSubmit={handleSubmit}
      title={t('loginForm.title')}
      description={t('loginForm.description')}
      disabled={!isValidEmail(email)}
      isLoading={isLoading}
      fields={fieldData}
      buttonLabel={t('global.form.submitLabel')}
    />
  );
}

export default LoginForm;
