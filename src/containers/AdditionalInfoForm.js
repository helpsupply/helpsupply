/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function AdditionalInfoForm({ id, onSave, request }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    additionalInfo: request?.additionalInfo || '',
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
}

export default AdditionalInfoForm;
