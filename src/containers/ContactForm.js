/** @jsx jsx */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';

import { isValidEmail, isValidPhoneNumber } from 'lib/utils/validations';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import { ContactConfirmation } from 'components/Confirmation';

const validate = (val) => {
  if (!isValidPhoneNumber(val) && !isValidEmail(val)) {
    return 'Please enter a valid email address or phone number';
  }
};

function ContactForm({ backend, location_id, dropSiteName, dropSitePhone }) {
  const { t } = useTranslation();
  const [name, setName] = useState(dropSiteName);
  const [contact, setContact] = useState(dropSitePhone);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    backend
      .editDropSite({ location_id, dropSiteName: name, dropSitePhone: contact })
      .then(() => {
        setSent(true);
      })
      .catch(alert);
    // TODO: handle exceptions
  };

  if (sent) {
    return (
      <ContactConfirmation
        onEdit={() => setSent(false)}
        {...{ name, contact }}
      />
    );
  }

  const fieldData = [
    {
      customOnChange: setName,
      label: t('request.dropSiteContactForm.name.label'),
      name: 'name',
      type: formFieldTypes.INPUT_TEXT,
    },
    {
      customOnChange: setContact,
      label: t('request.dropSiteContactForm.contact.label'),
      name: 'contact',
      type: formFieldTypes.INPUT_TEXT,
      validation: { validate },
    },
  ];

  return (
    <FormBuilder
      defaultValues={{ name, contact }}
      onSubmit={handleSubmit}
      title={t('request.dropSiteContactForm.title')}
      description={t('request.dropSiteContactForm.description')}
      disabled={
        (!isValidPhoneNumber(contact) && !isValidEmail(contact)) || !name
      }
      fields={fieldData}
    />
  );
}

export default ContactForm;
