/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidEmail } from 'lib/utils/validations';

import Note from 'components/Note';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function LoginForm({ backend }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = (val) => {
    if (!isValidEmail(val)) {
      return t('request.workEmailForm.workEmail.validationLabel');
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
      label: t('request.workEmailForm.workEmail.label'),
      name: 'email',
      type: formFieldTypes.INPUT_EMAIL,
      validation: { validate },
    },
  ];

  return (
    <FormBuilder
      defaultValues={{ email: '' }}
      onSubmit={handleSubmit}
      title={t('request.loginForm.title')}
      description={t('request.loginForm.description')}
      disabled={!isValidEmail(email)}
      isLoading={isLoading}
      fields={fieldData}
    >
      <Note>{t('request.workEmailForm.workEmail.disclaimer')}</Note>
    </FormBuilder>
  );
}

export default LoginForm;
