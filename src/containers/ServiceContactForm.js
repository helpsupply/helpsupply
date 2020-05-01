/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidPhoneNumber } from 'lib/utils/validations';
import { LANGUAGES } from 'lib/constants/languages';
import { CONTACT_PREFERENCES } from 'lib/constants/contact';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import Note from 'components/Note';

const validate = (val) => {
  if (val === '') {
    return;
  }
  if (!isValidPhoneNumber(val)) {
    return 'Please enter a valid phone number';
  }
};

function ServiceContactForm({ backend, serviceUser }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    firstName: serviceUser?.data?.firstName || '',
    lastName: serviceUser?.data?.lastName || '',
    phone: serviceUser?.data?.phone || '',
    contactPreference: serviceUser?.data?.contactPreference || undefined,
    languagePreference: serviceUser?.data?.languagePreference || undefined,
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
    const zip = backend.getLocalZip();
    const facility = backend.getLocalFacility();
    setIsLoading(true);

    backend
      .saveServiceUser({ ...data, zip, facility })
      .then(() => {
        setIsLoading(false);
        history.push(routeWithParams(Routes.CONTACT_CONFIRMATION));
      })
      .catch((error) => {
        console.error('error', error);
        setIsLoading(false);
      });
    // service TODO: handle exceptions
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('firstName'),
      defaultValue: fields.firstName,
      label: t('service.contactForm.labels.firstName'),
      name: 'firstName',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.firstName,
    },
    {
      customOnChange: handleFieldChange('lastName'),
      defaultValue: fields.lastName,
      label: t('service.contactForm.labels.lastName'),
      name: 'lastName',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.lastName,
    },
    {
      customOnChange: handleFieldChange('phone'),
      defaultValue: fields.phone,
      isRequired: false,
      label: t('service.contactForm.labels.phone'),
      name: 'phone',
      type: formFieldTypes.INPUT_PHONE,
      validation: { validate },
      value: fields.phone,
    },
    {
      customOnChange: handleFieldChange('contactPreference'),
      defaultValue: fields.contactPreference,
      label: t('service.contactForm.labels.contactPreference'),
      options: CONTACT_PREFERENCES,
      name: 'contactPreference',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.contactPreference,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <Note key="note-2" css={{ width: '100%' }}>
          {t('service.contactForm.note')}
        </Note>,
      ],
    },
    {
      customOnChange: handleFieldChange('languagePreference'),
      defaultValue: fields.languagePreference,
      label: t('service.contactForm.labels.languagePreference'),
      options: LANGUAGES,
      name: 'languagePreference',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.languagePreference,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.contactForm.title')}
      description={t('service.contactForm.description')}
      disabled={
        (fields.phone !== '' && !isValidPhoneNumber(fields.phone)) ||
        !Object.keys(requiredFields).every((key) => !!fields[key])
      }
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default ServiceContactForm;
