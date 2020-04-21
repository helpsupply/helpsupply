/** @jsx jsx */
import { useEffect, useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import RequestKinds from 'lib/organizations/kinds';
import { buildUrgencyOptions } from 'lib/utils/urgency';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import { ErrorContext } from 'state/ErrorProvider';
import { StateContext } from 'state/StateProvider';

function ServiceTypeForm({
  backend,
  id,
  onSave,
  request,
  serviceOptions,
  zip,
}) {
  const history = useHistory();
  const { t } = useTranslation();
  const { setError } = useContext(ErrorContext);
  const { state } = useContext(StateContext);

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    kind: '',
    urgency: '',
    organization: '',
    zip: '',
  });

  useEffect(() => {
    setFields((fields) => ({
      ...fields,
      zip,
    }));
  }, [zip]);

  const handleFieldChange = useCallback(
    (field) => (value) => {
      if (field === 'kind') {
        const organization = serviceOptions.filter(
          (opt) => opt.value === value,
        )[0].organization;
        setFields((fields) => ({
          ...fields,
          [field]: value,
          organization,
        }));
        console.log(fields);
      } else {
        setFields((fields) => ({
          ...fields,
          [field]: value,
        }));
      }
    },
    [serviceOptions],
  );

  const handleSubmit = async () => {
    const { kind } = fields;
    setIsLoading(true);

    if (
      state.editServiceUrl &&
      id &&
      request &&
      request?.kind === fields.kind
    ) {
      history.push(state.editServiceUrl);
      const res = await onSave(fields);
      if (!res) {
        setIsLoading(false);
        return;
      }
      history.push(state.editServiceUrl);
    } else {
      backend
        .saveServiceRequest(fields)
        .then((id) => {
          switch (kind) {
            case RequestKinds.GROCERY:
              history.push(
                routeWithParams(Routes.SERVICE_GROCERIES_WHERE, {
                  id,
                }),
              );
              break;
            case RequestKinds.CHILDCARE:
              history.push(
                routeWithParams(Routes.SERVICE_CHILDCARE_WHERE, {
                  id,
                }),
              );
              break;
            case RequestKinds.PETCARE:
              history.push(
                routeWithParams(Routes.SERVICE_PETCARE_WHERE, {
                  id,
                }),
              );
              break;
            case RequestKinds.MENTALHEALTH:
              history.push(
                routeWithParams(Routes.SERVICE_EMOTIONAL_WHEN, {
                  id,
                }),
              );
              break;
            default:
              history.push(routeWithParams(Routes.SERVICE_TYPE));
              break;
          }
        })
        .catch((e) => {
          setError(e.message);
          setIsLoading(false);
        });
    }
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('kind'),
      label: t('service.selectType.form.serviceTypeLabel'),
      options: serviceOptions,
      name: 'kind',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.kind,
    },
    {
      customOnChange: handleFieldChange('urgency'),
      label: t('service.selectType.form.urgencyLabel'),
      options: buildUrgencyOptions(),
      name: 'urgency',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.urgency,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={
        <ReactMarkdown
          source={t('service.selectType.title', {
            url: Routes.SERVICE_LOCATION_UPDATE,
            zip,
          })}
        />
      }
      description={t('service.selectType.description')}
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default ServiceTypeForm;
