/** @jsx jsx */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidEmail } from 'lib/utils/validations';

import Note from 'components/Note';
import Anchor, { anchorTypes } from 'components/Anchor';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function EmailForm({ backend }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const validate = (val) => {
    if (!isValidEmail(val)) {
      return t('request.workEmailForm.workEmail.validationLabel');
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    backend
      .signupServicesWithEmail(email)
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
      <Note>
        {t('request.workEmailForm.workEmail.disclaimer') + ' '}
        <Anchor href={Routes.HOME} as={anchorTypes.A}>
          {t('request.workEmailForm.learnMore')}
        </Anchor>
      </Note>
    </FormBuilder>
  );
}

export default EmailForm;
