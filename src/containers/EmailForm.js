/** @jsx jsx */
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidEmail, isValidZipCode } from 'lib/utils/validations';

import Note from 'components/Note';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import { ErrorContext } from 'state/ErrorProvider';

function EmailForm({ backend }) {
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
    // if we don't have a zip from the zip-forms, send them over there
    checkZip();
  }, [checkZip]);

  const validate = (val) => {
    if (!isValidEmail(val)) {
      return t('request.workEmailForm.workEmail.validationLabel');
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    if (!checkZip()) {
      return;
    }

    backend
      .signupServicesWithEmail(email, backend.getLocalZip())
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
      label: t('request.workEmailForm.workEmail.label'),
      name: 'email',
      type: formFieldTypes.INPUT_TEXT,
      validation: { validate },
    },
  ];

  return (
    <FormBuilder
      defaultValues={{ email: '' }}
      onSubmit={handleSubmit}
      title={t('request.workEmailForm.title')}
      description={t('request.workEmailForm.description')}
      disabled={!isValidEmail(email)}
      isLoading={isLoading}
      fields={fieldData}
    >
      <Note>{t('request.workEmailForm.workEmail.disclaimer')}</Note>
    </FormBuilder>
  );
}

export default EmailForm;
