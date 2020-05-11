/** @jsx jsx */
import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { StateContext } from 'state/StateProvider';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import { mentalHealthOptions } from 'lib/constants/options';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

export const EmotionalFormType = ({ id, onSave }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(StateContext);

  const [fields, setFields] = useState({
    type: undefined,
    agreement: false,
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
    const url =
      state.editServiceUrl ||
      routeWithParams(Routes.SERVICE_ADDITIONAL_INFO, { id });
    history.push(url);
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
};

export default EmotionalFormType;
