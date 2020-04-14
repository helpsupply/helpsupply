/** @jsx jsx */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidEmail, isValidPhoneNumber } from 'lib/utils/validations';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

const validate = (val) => {
  if (!isValidPhoneNumber(val) && !isValidEmail(val)) {
    return 'Please enter a valid email address or phone number';
  }
};

function ContactForm({ backend, dropSite }) {
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();

  const [name, setName] = useState(dropSite.dropSiteName);
  const [contact, setContact] = useState(dropSite.dropSitePhone);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);

    backend
      .editDropSite({ ...dropSite, dropSiteName: name, dropSitePhone: contact })
      .then(() => {
        history.push(
          routeWithParams(Routes.DROPSITE_CONTACT_CONFIRMATION, {
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
      customOnChange: setName,
      label: t('request.dropSiteContactForm.nameLabel'),
      name: 'name',
      type: formFieldTypes.INPUT_TEXT,
    },
    {
      customOnChange: setContact,
      label: t('request.dropSiteContactForm.contactLabel'),
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
      isLoading={isLoading}
    />
  );
}

export default ContactForm;
