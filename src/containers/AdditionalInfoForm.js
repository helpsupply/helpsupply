/** @jsx jsx */
import { useCallback, useState } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

export const AdditionalInfoForm = ({ id, onSave }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const [fields, setFields] = useState({
    additionalInfo: '',
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
    history.push(routeWithParams(Routes.SERVICE_REVIEW, { id }));
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('additionalInfo'),
      label: t('service.additionalInfo.labels.additionalInfo'),
      name: 'additionalInfo',
      type: formFieldTypes.TEXT_AREA,
      value: fields.additionalInfo,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.additionalInfo.title')}
      description={t('service.additionalInfo.description')}
      fields={fieldData}
      isLoading={isLoading}
    />
  );
};

export default AdditionalInfoForm;
