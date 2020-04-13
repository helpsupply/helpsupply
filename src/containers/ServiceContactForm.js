/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidPhoneNumber } from 'lib/utils/validations';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import Note from 'components/Note';

const validate = (val) => {
  if (!isValidPhoneNumber(val)) {
    return 'Please enter a valid phone number';
  }
};

// service todo: Temp values while we build backend or an enum for this part.
const LANGUAGES = [
  { label: 'English', value: 'english' },
  { label: 'Spanish', value: 'spanish' },
];

function ServiceContactForm({ backend }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    contactPreference: '',
    languagePreference: '',
  });

  const handleFieldChange = useCallback(
    (field) => (value) => {
      setFields((fields) => ({
        ...fields,
        [field]: value,
      }));
    },
    [],
  );

  const { phone, ...requiredFields } = fields;

  const handleSubmit = (data) => {
    setIsLoading(true);
    history.push(routeWithParams(Routes.CONTACT_CONFIRMATION));

    // service todo: wire up new action, something like editUserContact, see rough idea below
    /*
    backend
      .editUser({
        //params
      })
      .then(() => {
        console.log('ok here');
        setIsLoading(false);
        // history.push(routeWithParams(Routes.CONTACT_CONFIRMATION));
      })
      .catch((error) => {
        console.error('error', error);
        setIsLoading(false);
      });
     */
    // service TODO: handle exceptions
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('firstName'),
      label: t('request.dropSiteContactForm.nameLabel'),
      name: 'firstName',
      type: formFieldTypes.INPUT_TEXT,
    },
    {
      customOnChange: handleFieldChange('lastName'),
      label: t('request.dropSiteContactForm.contactLabel'),
      name: 'lastName',
      type: formFieldTypes.INPUT_TEXT,
    },
    {
      customOnChange: handleFieldChange('phone'),
      isRequired: false,
      label: t('service.contactForm.phone.label'),
      name: 'phone',
      type: formFieldTypes.INPUT_TEXT,
      validation: { validate },
    },
    {
      customOnChange: handleFieldChange('contactPreference'),
      label: t('service.contactForm.contactPreference.label'),
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
      ],
      name: 'contactPreference',
      type: formFieldTypes.INPUT_DROPDOWN,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <Note key="note-2" css={{ width: '100%' }}>
          {t('service.contactForm.languagePreference.description')}
        </Note>,
      ],
    },
    {
      customOnChange: handleFieldChange('languagePreference'),
      label: t('service.contactForm.languagePreference.label'),
      options: LANGUAGES,
      name: 'languagePreference',
      type: formFieldTypes.INPUT_DROPDOWN,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.contactForm.title')}
      description={t('service.contactForm.description')}
      disabled={
        !isValidPhoneNumber(fields.phone) ||
        !Object.keys(requiredFields).every((key) => !!fields[key])
      }
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default ServiceContactForm;
