/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function EmotionalFormDate() {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    type: '',
    agreement: '',
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

  const handleSubmit = () => {
    setIsLoading(true);
    // service todo: wire-up form events
    history.push(routeWithParams(Routes.SERVICE_ADDITIONAL_INFO));
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('type'),
      label: t('service.emotional.what.labels.type'),
      options: [
        { label: 'Licensed Mental Health Professional', value: 'licensed' },
        { label: 'Spiritual Care Provider', value: 'spiritual' },
        { label: 'Personal/Life Coach', value: 'coach' },
        { label: 'Stress-Reduction Expert', value: 'stress' },
        { label: 'Healing Arts Practitioner', value: 'healing' },
        { label: "I don't have a preference", value: 'any' },
      ],
      name: 'type',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.type,
    },
    {
      customOnChange: handleFieldChange('agreement'),
      label: t('service.emotional.what.labels.agreement'),
      name: 'agreement',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.agreement,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.emotional.what.title')}
      description={t('service.emotional.what.description')}
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default EmotionalFormDate;
