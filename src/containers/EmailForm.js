/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';

import { Routes } from 'constants/Routes';
import { isValidEmail } from 'lib/utils/validations';

import Note from 'components/Note';
import Anchor, { anchorTypes } from 'components/Anchor';
import HeaderInfo from 'components/Form/HeaderInfo';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

const validate = (val) => {
  if (!isValidEmail(val)) {
    return 'Please enter a valid email address';
  }
};

function EmailForm({ backend, match }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropSite, setDropSite] = useState(match.params.id);

  useEffect(() => {
    setDropSite(match.params.id);
  }, [match.params.id]);

  const handleSubmit = () => {
    setIsLoading(true);

    backend
      .signupWithEmail(email, dropSite)
      .then(() => {
        setSent(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('error', error);
        setIsLoading(false);
      });
    // TODO: handle exceptions
  };

  if (sent) {
    return (
      <HeaderInfo
        title={t('request.workEmailForm.sent.title')}
        description={t('request.workEmailForm.sent.description')}
      />
    );
  }

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
