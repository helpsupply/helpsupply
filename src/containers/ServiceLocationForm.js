/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidZipCode } from 'lib/utils/validations';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

const validate = (val) => {
  if (val === '') {
    return;
  }
  if (!isValidZipCode(val)) {
    return 'Please enter a valid ZIP code';
  }
};

function ServiceLocationForm({ backend, serviceUser }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    zipCode: serviceUser?.data?.zipCode || '',
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

  const { zipCode, ...requiredFields } = fields;

  const handleSubmit = () => {
    // service todo: save zip code field to user
    // service todo: check valid service types
    setIsLoading(true);
    history.push(routeWithParams(Routes.FACILITY));
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('zipCode'),
      defaultValue: fields.zipCode,
      label: t('service.locationForm.labels.zipCode'),
      name: 'zipCode',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.zipCode,
      validation: { validate },
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.locationForm.title')}
      description={t('service.locationForm.description')}
      disabled={
        (fields.phone !== '' && !isValidZipCode(fields.zipCode)) ||
        !Object.keys(requiredFields).every((key) => !!fields[key])
      }
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default ServiceLocationForm;
