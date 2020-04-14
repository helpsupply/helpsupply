/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import RequestKinds from 'lib/organizations/kinds';

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
    const { serviceType } = fields;
    setIsLoading(true);

    switch (serviceType) {
      case RequestKinds.GROCERY:
        history.push(routeWithParams(Routes.SERVICE_GROCERIES_WHERE));
        break;
      default:
        history.push(routeWithParams(Routes.SERVICE_TYPE));
        console.log(
          'service todo: route to specific service request form, groceries, childcare, etc.',
        );
    }
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('serviceType'),
      label: t('service.selectType.form.serviceTypeLabel'),
      // todo: move these values to enum
      options: [
        { label: 'Groceries', value: RequestKinds.GROCERY },
        { label: 'Childcare', value: RequestKinds.CHILDCARE },
        { label: 'Pet care', value: RequestKinds.PETCARE },
        { label: 'Emotional support', value: RequestKinds.MENTALHEALTH },
      ],
      name: 'serviceType',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.serviceType,
    },
    {
      customOnChange: handleFieldChange('urgency'),
      label: t('service.selectType.form.urgencyLabel'),
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
