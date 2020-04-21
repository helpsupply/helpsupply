/** @jsx jsx */
import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { css, jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidPhoneNumber, isValidEmail } from 'lib/utils/validations';
import { LANGUAGES } from 'lib/constants/languages';
import { CONTACT_PREFERENCES } from 'lib/constants/contact';
import { buttonReset, Color } from 'lib/theme';

import { AdditionalCta } from 'components/AdditionalCta';
import FormBuilder from 'components/Form/FormBuilder';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import { StateContext } from 'state/StateProvider';

const styles = {
  button: css(buttonReset, { color: Color.PRIMARY }),
};

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

const initialAdditionalFields = {
  additionalContactFirstName: '',
  additionalContactLastName: '',
  additionalContactRelationship: '',
  additionalContactEmail: '',
  additionalContactPhone: '',
  additionalContactContactPreference: '',
  additionalContactLanguagePreference: '',
};

function GroceryFormLocation({ id, onSave, neighborhoodOptions }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [addAdditionalContact, setAddAdditionalContact] = useState(false);
  const { state } = useContext(StateContext);
  const [fields, setFields] = useState({
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

  const [additionalFields, setAdditionalFields] = useState(
    initialAdditionalFields,
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

  const handleRemoveClick = useCallback(() => {
    setAddAdditionalContact(false);
    setAdditionalFields(initialAdditionalFields);
  }, []);

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
      routeWithParams(Routes.SERVICE_GROCERIES_WHEN, { id });
    history.push(url);
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('neighborhood'),
      defaultValue: fields.neighborhood,
      label: t('service.grocery.where.labels.neighborhood'),
      options: neighborhoodOptions,
      name: 'neighborhood',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.neighborhood,
    },
    {
      customOnChange: handleFieldChange('crossStreet'),
      defaultValue: fields.crossStreet,
      label: t('service.grocery.where.labels.crossStreet'),
      name: 'crossStreet',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.crossStreet,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <AdditionalCta
          cta={t('service.grocery.where.add')}
          key="additional"
          onClick={() => setAddAdditionalContact(true)}
          open={addAdditionalContact}
          title={t('service.additionalContact.title')}
          secondaryCta={
            <Text
              onClick={(e) => {
                e.preventDefault();
                handleRemoveClick();
              }}
              as="button"
              type={TEXT_TYPE.BODY_2}
              css={styles.button}
            >
              {t('service.grocery.where.labels.remove')}
            </Text>
          }
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
        defaultValues={{ ...fields, ...additionalFields }}
        onSubmit={handleSubmit}
        title={t('service.grocery.where.title')}
        description={t('service.grocery.where.description')}
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
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.grocery.where.title')}
      description={t('service.grocery.where.description')}
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default GroceryFormLocation;
