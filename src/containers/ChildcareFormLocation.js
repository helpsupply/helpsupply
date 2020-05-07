/** @jsx jsx */
import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidPhoneNumber, isValidEmail } from 'lib/utils/validations';
import { LANGUAGES } from 'lib/constants/languages';
import { CONTACT_PREFERENCES } from 'lib/constants/contact';

import { AdditionalCta } from 'components/AdditionalCta';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import { StateContext } from 'state/StateProvider';

const validatePhone = (val) => {
  if (val === '') {
    return;
  }
  if (!isValidPhoneNumber(val)) {
    return 'Please enter a valid phone number';
  }
};

const validateEmail = (val) => {
  if (val === '') {
    return;
  }
  if (!isValidEmail(val)) {
    return 'Please enter a valid email address';
  }
};

function ChildcareFormLocation({ id, onSave, neighborhoodOptions }) {
  const history = useHistory();
  const { t } = useTranslation();

  const { state } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [addAdditionalContact, setAddAdditionalContact] = useState();
  const [fields, setFields] = useState({
    neighborhood: undefined,
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

  const handleAdditionalFieldChange = useCallback(
    (field) => (value) => {
      setAdditionalFields((fields) => ({
        ...fields,
        [field]: value,
      }));
    },
    [],
  );

  const [additionalFields, setAdditionalFields] = useState({
    additionalContactFirstName: '',
    additionalContactLastName: '',
    additionalContactRelationship: '',
    additionalContactEmail: '',
    additionalContactPhone: '',
    additionalContactContactPreference: '',
    additionalContactLanguagePreference: '',
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await onSave({
      ...fields,
      ...(addAdditionalContact && additionalFields),
    });
    if (!res) {
      setIsLoading(false);
      return;
    }
    const url =
      state.editServiceUrl ||
      routeWithParams(Routes.SERVICE_CHILDCARE_WHEN, { id });
    history.push(url);
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('neighborhood'),
      defaultValue: fields.neighborhood,
      label: t('service.childcare.where.labels.neighborhood'),
      options: neighborhoodOptions,
      name: 'neighborhood',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.neighborhood,
    },
    {
      customOnChange: handleFieldChange('crossStreet'),
      defaultValue: fields.crossStreet,
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

  const additionalContactFieldData = [
    {
      customOnChange: handleAdditionalFieldChange('additionalContactFirstName'),
      defaultValue: additionalFields.additionalContactFirstName,
      label: t('service.contactForm.labels.firstName'),
      name: 'additionalContactFirstName',
      type: formFieldTypes.INPUT_TEXT,
      value: additionalFields.additionalContactFirstName,
    },
    {
      customOnChange: handleAdditionalFieldChange('additionalContactLastName'),
      defaultValue: additionalFields.additionalContactLastName,
      isRequired: false,
      label: t('service.additionalContact.labels.lastName'),
      name: 'additionalContactLastName',
      type: formFieldTypes.INPUT_TEXT,
      value: additionalFields.additionalContactLastName,
    },
    {
      customOnChange: handleAdditionalFieldChange(
        'additionalContactRelationship',
      ),
      defaultValue: additionalFields.additionalContactRelationship,
      isRequired: false,
      label: t('service.additionalContact.labels.relationship'),
      name: 'additionalContactRelationship',
      type: formFieldTypes.INPUT_TEXT,
      value: additionalFields.additionalContactRelationship,
    },
    {
      customOnChaonge: handleAdditionalFieldChange('additionalContactEmail'),
      defaultValue: additionalFields.additionalContactEmail,
      isRequired: false,
      label: t('service.additionalContact.labels.email'),
      name: 'additionalContactEmail',
      type: formFieldTypes.INPUT_EMAIL,
      validation: { validate: validateEmail },
      value: additionalFields.additionalContactEmail,
    },
    {
      customOnChange: handleAdditionalFieldChange('additionalContactPhone'),
      defaultValue: additionalFields.additionalContactPhone,
      label: t('service.contactForm.labels.phone'),
      name: 'additionalContactPhone',
      type: formFieldTypes.INPUT_PHONE,
      validation: { validate: validatePhone },
      value: additionalFields.additionalContactPhone,
    },
    {
      customOnChange: handleAdditionalFieldChange(
        'additionalContactContactPreference',
      ),
      defaultValue: additionalFields.additionalContactContactPreference,
      label: t('service.contactForm.labels.contactPreference'),
      options: CONTACT_PREFERENCES,
      name: 'additionalContactContactPreference',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: additionalFields.additionalContactContactPreference,
    },
    {
      customOnChange: handleAdditionalFieldChange(
        'additionalContactLanguagePreference',
      ),
      defaultValue: additionalFields.additionalContactLanguagePreference,
      label: t('service.contactForm.labels.languagePreference'),
      options: LANGUAGES,
      name: 'additionalContactLanguagePreference',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: additionalFields.additionalContactLanguagePreference,
    },
  ];

  const {
    additionalContactLastName,
    additionalContactRelationship,
    additionalContactEmail,
    ...additionalRequiredFields
  } = additionalFields;

  if (addAdditionalContact) {
    return (
      <FormBuilder
        buttonLabel={t('global.form.submitLabelNext')}
        defaultValues={{ ...fields, ...additionalFields }}
        onSubmit={handleSubmit}
        title={t('service.childcare.where.title')}
        description={t('service.childcare.where.description')}
        disabled={
          (additionalFields.additionalContactPhone !== '' &&
            !isValidPhoneNumber(additionalFields.additionalContactPhone)) ||
          (additionalFields.additionalContactEmail !== '' &&
            !isValidEmail(additionalFields.additionalContactEmail)) ||
          !Object.keys({ ...fields, ...additionalRequiredFields }).every(
            (key) => !!{ ...fields, ...additionalRequiredFields }[key],
          )
        }
        fields={[...fieldData, ...additionalContactFieldData]}
        isLoading={isLoading}
      />
    );
  }

  return (
    <FormBuilder
      buttonLabel={t('global.form.submitLabelNext')}
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.childcare.where.title')}
      description={t('service.childcare.where.description')}
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default ChildcareFormLocation;
