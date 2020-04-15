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

function ServiceTypeForm({ backend }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    kind: '',
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

  const handleSubmit = async () => {
    const { kind } = fields;
    setIsLoading(true);
    const serviceRequestId = await backend.saveServiceRequest(fields);
    if (!serviceRequestId) {
      return;
    }
    switch (kind) {
      case RequestKinds.GROCERY:
        history.push(
          routeWithParams(Routes.SERVICE_GROCERIES_WHERE, {
            id: serviceRequestId,
          }),
        );
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
      customOnChange: handleFieldChange('kind'),
      label: t('service.selectType.form.serviceTypeLabel'),
      // todo: move these values to enum
      options: [
        { label: 'Groceries', value: RequestKinds.GROCERY },
        { label: 'Childcare', value: RequestKinds.CHILDCARE },
        { label: 'Pet care', value: RequestKinds.PETCARE },
        { label: 'Emotional support', value: RequestKinds.MENTALHEALTH },
      ],
      name: 'kind',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.kind,
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
