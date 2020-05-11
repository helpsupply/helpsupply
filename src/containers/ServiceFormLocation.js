/** @jsx jsx */
import { useCallback, useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { css, jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { StateContext } from 'state/StateProvider';

import { Errors } from 'lib/constants/errors';
import { isValidPhoneNumber, isValidEmail } from 'lib/utils/validations';
import { LANGUAGES } from 'lib/constants/languages';
import { CONTACT_PREFERENCES } from 'lib/constants/contact';
import { buttonReset, Color } from 'lib/theme';

import { AdditionalCta } from 'components/AdditionalCta';
import FormBuilder from 'components/Form/FormBuilder';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { formFieldTypes } from 'components/Form/CreateFormFields';

const styles = {
  button: css(buttonReset, { color: Color.PRIMARY }),
};

const validatePhone = (val) => {
  if (val === '') {
    return;
  }
  if (!isValidPhoneNumber(val)) {
    return Errors.PHONE;
  }
};

const validateEmail = (val) => {
  if (val === '') {
    return;
  }
  if (!isValidEmail(val)) {
    return Errors.EMAIL;
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

export const ServiceFormLocation = ({
  onSave,
  neighborhoodOptions,
  nextUrl,
  title,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [addAdditionalContact, setAddAdditionalContact] = useState(false);
  const { state } = useContext(StateContext);

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

  const [additionalFields, setAdditionalFields] = useState(
    initialAdditionalFields,
  );
  const [additionalRequiredFields, setAdditionalRequiredFields] = useState(
    null,
  );

  const [emailRequired, setEmailRequired] = useState(false);
  useEffect(() => {
    if (
      additionalRequiredFields?.additionalContactContactPreference === 'email'
    ) {
      setEmailRequired(true);
      return;
    }
    setEmailRequired(false);
  }, [additionalRequiredFields]);

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
      ...additionalFields,
    });
    if (!res) {
      setIsLoading(false);
      return;
    }
    const url = state.editServiceUrl || nextUrl;
    history.push(url);
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('neighborhood'),
      defaultValue: fields.neighborhood,
      label: t('locationForm.labels.neighborhood'),
      options: neighborhoodOptions,
      name: 'neighborhood',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.neighborhood,
    },
    {
      customOnChange: handleFieldChange('crossStreet'),
      defaultValue: fields.crossStreet,
      label: t('locationForm.labels.crossStreet'),
      name: 'crossStreet',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.crossStreet,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <AdditionalCta
          cta={t('locationForm.add')}
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
              {t('locationForm.labels.remove')}
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
      customOnChange: handleAdditionalFieldChange('additionalContactPhone'),
      defaultValue: additionalFields.additionalContactPhone,
      label: t('service.contactForm.labels.phone'),
      name: 'additionalContactPhone',
      type: formFieldTypes.INPUT_PHONE,
      validation: { validate: validatePhone },
      value: additionalFields.additionalContactPhone,
    },
    {
      customOnChange: handleAdditionalFieldChange('additionalContactEmail'),
      defaultValue: additionalFields.additionalContactEmail,
      isRequired: emailRequired,
      label: emailRequired
        ? t('service.additionalContact.labels.emailRequired')
        : t('service.additionalContact.labels.email'),
      name: 'additionalContactEmail',
      type: formFieldTypes.INPUT_EMAIL,
      validation: { validate: validateEmail },
      value: additionalFields.additionalContactEmail,
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

  useEffect(() => {
    let {
      additionalContactLastName,
      additionalContactRelationship,
      additionalContactEmail,
      ...localRequiredFields
    } = additionalFields;

    if (additionalFields.additionalContactContactPreference === 'email') {
      localRequiredFields.additionalContactEmail = additionalContactEmail;
    }

    setAdditionalRequiredFields(localRequiredFields);
  }, [additionalFields]);

  if (addAdditionalContact) {
    return (
      <FormBuilder
        defaultValues={{ ...fields, ...additionalFields }}
        onSubmit={handleSubmit}
        title={title}
        description={t('locationForm.labels.description')}
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
        buttonLabel={t('global.form.submitLabelNext')}
      />
    );
  }
  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={title}
      description={t('locationForm.labels.description')}
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
      buttonLabel={t('global.form.submitLabelNext')}
    />
  );
};

export default ServiceFormLocation;
