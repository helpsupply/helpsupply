/** @jsx jsx */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

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

function ServiceContactForm({ backend }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    history.push(routeWithParams(Routes.CONTACT_CONFIRMATION));

    // todo: wire up new action, something like editUserContact, see rough idea below
    /*
    backend
      .editUserContact({
        //params
      })
      .then(() => {
        history.push(routeWithParams(Routes.CONTACT_CONFIRMATION));
      })
      .catch((error) => {
        console.error('error', error);
        setIsLoading(false);
      });
      */
    // TODO: handle exceptions
  };

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
      title={t('service.contactForm.title')}
      description={t('service.contactForm.description')}
      disabled={
        (!isValidPhoneNumber(contact) && !isValidEmail(contact)) || !name
      }
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default ServiceContactForm;
