/** @jsx jsx */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { isValidEmail } from 'lib/utils/validations';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function EmailListForm() {
  const history = useHistory();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');

  const validate = (val) => {
    if (!isValidEmail(val)) {
      return t('request.workEmailForm.workEmail.validationLabel');
    }
  };

  const handleSubmit = () => {
    history.push(Routes.EMAIL_LIST_SENT);
  };

  const fieldData = [
    {
      customOnChange: setEmail,
      label: t('global.form.emailAddressLabel'),
      name: 'email',
      type: formFieldTypes.INPUT_TEXT,
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
}

export default EmailListForm;
