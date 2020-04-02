/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidEmail } from 'lib/utils/validations';

import Note from 'components/Note';
import Anchor, { anchorTypes } from 'components/Anchor';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function EmailForm({ backend }) {
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [dropSite, setDropSite] = useState(params.id);

  useEffect(() => {
    setDropSite(params.id);
  }, [params.id]);

  const validate = (val) => {
    if (!isValidEmail(val)) {
      return t('request.workEmailForm.workEmail.validation.label');
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    backend
      .signupWithEmail(email, dropSite)
      .then(() => {
        history.push(
          routeWithParams(Routes.SIGNUP_DROPSITE_CONFIRMATION, {
            id: params.id,
          }),
        );
      })
      .catch((error) => {
        console.error('error', error);
        setIsLoading(false);
      });
    // TODO: handle exceptions
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
