/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import { mentalHealthOptions } from 'lib/constants/options';

function EmotionalFormDate({ id, onSave, request }) {
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

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await onSave(fields);
    if (!res) {
      setIsLoading(false);
      return;
    }
    history.push(routeWithParams(Routes.SERVICE_ADDITIONAL_INFO, { id }));
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('type'),
      defaultValue: fields.type,
      label: t('service.emotional.what.labels.type'),
      options: mentalHealthOptions,
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
