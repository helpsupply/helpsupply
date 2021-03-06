/** @jsx jsx */
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { ErrorContext } from 'state/ErrorProvider';

import { Errors } from 'lib/constants/errors';
import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidEmail, isValidZipCode } from 'lib/utils/validations';

import Note from 'components/Note';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

export const EmailForm = ({ backend }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setError } = useContext(ErrorContext);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkZip = useCallback(() => {
    if (!backend.getLocalZip() || !isValidZipCode(backend.getLocalZip())) {
      history.push(Routes.SERVICE_LOCATION);
      return false;
    }
    return true;
  }, [backend, history]);

  useEffect(() => {
    // if we don't have a zip code, send user to add a zip code
    checkZip();
  }, [checkZip]);

  const validate = (val) => {
    if (!isValidEmail(val)) {
      return Errors.EMAIL;
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    if (!checkZip()) {
      return;
    }

    backend
      .signupServicesWithEmail(
        email,
        backend.getLocalZip(),
        backend.getLocalFacility(),
      )
      .then(() => {
        history.push(routeWithParams(Routes.EMAIL_SIGNUP_SENT));
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const fieldData = [
    {
      customOnChange: setEmail,
      label: t('workEmailForm.workEmail.label'),
      name: 'email',
      type: formFieldTypes.INPUT_EMAIL,
      validation: { validate },
    },
  ];

  return (
    <FormBuilder
      defaultValues={{ email: '' }}
      onSubmit={handleSubmit}
      title={t('workEmailForm.title')}
      description={t('workEmailForm.description')}
      buttonLabel={t('global.form.submitLabel')}
      disabled={!isValidEmail(email)}
      isLoading={isLoading}
      fields={fieldData}
    >
      <Note>{t('workEmailForm.workEmail.disclaimer')}</Note>
    </FormBuilder>
  );
};

export default EmailForm;
