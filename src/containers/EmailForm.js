/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';

import { Routes } from 'lib/constants';

import Form from 'components/Form';
import InputText from 'components/InputText';
import Note from 'components/Note';
import Anchor from 'components/Anchor';
import HeaderInfo from 'components/Form/HeaderInfo';
import { isValidEmail } from 'lib/utils/validations';

const validate = (val) => {
  if (!isValidEmail(val)) {
    return 'Please enter a valid email address';
  }
};

function EmailForm({ backend, match }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [dropsite, setDropsite] = useState(match.params.dropsite);

  useEffect(() => {
    setDropsite(match.params.dropsite);
  }, [match.params.dropsite]);

  const handleSubmit = (event) => {
    event.preventDefault();
    backend
      .signupWithEmail(email, dropsite)
      .then(() => {
        setSent(true);
      })
      .catch(alert);
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

  return (
    <Form
      defaultValues={{ email: '' }}
      onSubmit={handleSubmit}
      title={t('request.workEmailForm.title')}
      description={t('request.workEmailForm.description')}
      disabled={!isValidEmail(email)}
    >
      <InputText
        name="email"
        label={t('request.workEmailForm.workEmail.label')}
        validation={{ validate }}
        customOnChange={setEmail}
      />
      <Note>
        {t('request.workEmailForm.workEmail.disclaimer') + ' '}
        <Anchor href={Routes.HOME}>
          {t('request.workEmailForm.learnMore')}
        </Anchor>
      </Note>
    </Form>
  );
}

export default EmailForm;
