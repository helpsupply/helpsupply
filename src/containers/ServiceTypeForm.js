/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function ServiceTypeForm() {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    serviceType: '',
    urgency: '',
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
    history.push(routeWithParams(Routes.SERVICE_TYPE));
    console.log(
      'todo: route to specific service request form, groceries, childcare, etc.',
    );
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('serviceType'),
      label: t('service.selectType.form.serviceType.label'),
      // todo: move these values to enum
      options: [
        { label: 'Groceries', value: 'groceries' },
        { label: 'Childcare', value: 'childcare' },
        { label: 'Pet care', value: 'petcare' },
        { label: 'Emotional support', value: 'emotional-support' },
      ],
      name: 'serviceType',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.serviceType,
    },
    {
      customOnChange: handleFieldChange('urgency'),
      label: t('service.selectType.form.urgency.label'),
      // todo: move these values to enum
      options: [
        { label: "Immediately - I'm in crisis", value: 'immediate' },
        { label: 'In the next few days', value: 'soon' },
        {
          label: "I'm okay for now but am worried that I won't be soon",
          value: 'later',
        },
      ],
      name: 'urgency',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.urgency,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.selectType.title')}
      description={t('service.selectType.description')}
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default ServiceTypeForm;
