/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidPhoneNumber, isValidEmail } from 'lib/utils/validations';

import { AdditionalContact } from 'components/AdditionalContact';
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

function GroceryFormLocation({ id, onSave }) {
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
    history.push(routeWithParams(Routes.SERVICE_GROCERIES_WHEN, { id }));
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('zipCode'),
      label: t('service.grocery.where.labels.zip'),
      name: 'zipCode',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.zipCode,
    },
    {
      customOnChange: handleFieldChange('neighborhood'),
      label: t('service.grocery.where.labels.neighborhood'),
      // service todo: wire-up neighborhoods data
      options: neighborhoods.Brooklyn,
      name: 'neighborhood',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.neighborhood,
    },
    {
      customOnChange: handleFieldChange('crossStreet'),
      label: t('service.grocery.where.labels.crossStreet'),
      name: 'crossStreet',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.crossStreet,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <AdditionalContact
          cta={t('service.grocery.where.add')}
          key="additional"
          onClick={setAddAdditionalContact}
          open={addAdditionalContact}
          title={t('service.grocery.where.additionalContact.title')}
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
      label: t('service.grocery.where.additionalContact.labels.lastName'),
      name: 'lastName',
      type: formFieldTypes.INPUT_TEXT,
    },
    {
      customOnChange: handleFieldChange('relationship'),
      label: t('service.grocery.where.additionalContact.labels.relationship'),
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
      label: t('service.grocery.where.additionalContact.labels.email'),
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
      title={t('service.grocery.where.title')}
      description={t('service.grocery.where.description')}
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

export default GroceryFormLocation;
