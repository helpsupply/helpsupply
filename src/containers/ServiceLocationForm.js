/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Errors } from 'lib/constants/errors';
import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidZipCode } from 'lib/utils/validations';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import FormPrivacyNode from 'components/FormPrivacyNode';

const validate = (val) => {
  if (val === '') {
    return;
  }
  if (!isValidZipCode(val)) {
    return Errors.ZIP;
  }
};

function ServiceLocationForm({ backend, serviceUser }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    zipCode: serviceUser?.data?.zip || '',
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
    setIsLoading(true);

    const servicesByZip = backend.getServicesForZip(fields.zipCode);

    if (!servicesByZip?.length) {
      history.push(routeWithParams(Routes.SERVICE_LOCATION_UNAVAILABLE));
      return;
    }

    backend.setLocalZip(fields.zipCode);
    history.push(
      routeWithParams(Routes.SERVICE_LOCATION_AVAILABLE, {
        zip: fields.zipCode,
      }),
    );
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('zipCode'),
      defaultValue: fields.zipCode,
      label: t('service.locationForm.labels.zipCode'),
      name: 'zipCode',
      type: formFieldTypes.INPUT_ZIP,
      value: fields.zipCode,
      validation: { validate },
    },
    {
      type: formFieldTypes.NODE,
      node: <FormPrivacyNode key="privacy-policy" />,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.locationForm.title')}
      description={t('service.locationForm.description')}
      buttonLabel={t('global.form.submitLabelNext')}
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
