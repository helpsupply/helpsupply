/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidPhoneNumber, isValidEmail } from 'lib/utils/validations';

import { AdditionalCta } from 'components/AdditionalCta';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

import { neighborhoods } from 'data/neighborhoods';

const validate = (val) => {
  if (!isValidPhoneNumber(val)) {
    return 'Please enter a valid phone number';
  }
};

const validateEmail = (val) => {
  if (!isValidEmail(val)) {
    return 'Please enter a valid email address';
  }
};

// service todo: Temp values while we build backend or an enum for this part.
const LANGUAGES = [
  { label: 'English', value: 'english' },
  { label: 'Spanish', value: 'spanish' },
];

function ChildcareFormLocation({ id, onSave }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [addAdditionalContact, setAddAdditionalContact] = useState(false);
  const [fields, setFields] = useState({
    zipCode: '',
    neighborhood: '',
    crossStreet: '',
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

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSave(fields);
    history.push(routeWithParams(Routes.SERVICE_CHILDCARE_WHEN, { id }));
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('zipCode'),
      label: t('service.childcare.where.labels.zip'),
      name: 'zipCode',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.zipCode,
    },
    {
      customOnChange: handleFieldChange('neighborhood'),
      label: t('service.childcare.where.labels.neighborhood'),
      // service todo: wire-up neighborhoods data
      options: neighborhoods.Brooklyn,
      name: 'neighborhood',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.neighborhood,
    },
    {
      customOnChange: handleFieldChange('crossStreet'),
      label: t('service.childcare.where.labels.crossStreet'),
      name: 'crossStreet',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.crossStreet,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <AdditionalCta
          cta={t('service.childcare.where.add')}
          key="additional"
          onClick={() => setAddAdditionalContact(true)}
          open={addAdditionalContact}
          title={t('service.additionalContact.title')}
        />,
      ],
    },
  ];

  const additionalContactFields = [
    {
      customOnChange: handleFieldChange('firstName'),
      label: t('service.contactForm.labels.firstName'),
      name: 'firstName',
      type: formFieldTypes.INPUT_TEXT,
    },
    {
      customOnChange: handleFieldChange('lastName'),
      label: t('service.additionalContact.labels.lastName'),
      name: 'lastName',
      type: formFieldTypes.INPUT_TEXT,
    },
    {
      customOnChange: handleFieldChange('relationship'),
      label: t('service.additionalContact.labels.relationship'),
      options: [
        { label: 'Partner', value: 'partner' },
        { label: 'Family member', value: 'family-member' },
        { label: 'Friend', value: 'friend' },
      ],
      name: 'relationship',
      type: formFieldTypes.INPUT_DROPDOWN,
    },
    {
      customOnChange: handleFieldChange('email'),
      label: t('service.additionalContact.labels.email'),
      name: 'email',
      type: formFieldTypes.INPUT_TEXT,
      validation: { validateEmail },
    },
    {
      customOnChange: handleFieldChange('phone'),
      isRequired: false,
      label: t('service.contactForm.labels.phone'),
      name: 'phone',
      type: formFieldTypes.INPUT_TEXT,
      validation: { validate },
    },
    {
      customOnChange: handleFieldChange('contactPreference'),
      label: t('service.contactForm.labels.contactPreference'),
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
      ],
      name: 'contactPreference',
      type: formFieldTypes.INPUT_DROPDOWN,
    },
    {
      customOnChange: handleFieldChange('languagePreference'),
      label: t('service.contactForm.labels.languagePreference'),
      options: LANGUAGES,
      name: 'languagePreference',
      type: formFieldTypes.INPUT_DROPDOWN,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.childcare.where.title')}
      description={t('service.childcare.where.description')}
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
      fields={
        addAdditionalContact
          ? [...fieldData, ...additionalContactFields]
          : fieldData
      }
      isLoading={isLoading}
    />
  );
}

export default ChildcareFormLocation;
