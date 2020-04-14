/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function AdditionalInfoForm() {
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

  const handleSubmit = () => {
    setIsLoading(true);
    console.log('go to review/submit', fields);
    history.push(routeWithParams(Routes.SERVICE_ADDITIONAL_INFO));
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
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default AdditionalInfoForm;
