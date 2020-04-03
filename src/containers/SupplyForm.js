/** @jsx jsx */
import { useState, useCallback } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { Space } from 'lib/theme';

import Note from 'components/Note';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function SupplyForm({ backend }) {
  const history = useHistory();
  const params = useParams();

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    requestDescription: '',
    requestTitle: '',
    requestType: '',
    requestQuantity: '',
    requestWillingToPay: false,
  });

  const handleFieldChange = useCallback(
    (field) => (value) => {
      setFields((fields) => ({ ...fields, [field]: value }));
    },
    [],
  );

  const handleSubmit = () => {
    setIsLoading(true);

    const { requestQuantity, ...request } = fields;
    const requestCountAsNumber = parseInt(requestQuantity, 10);
    const payload = {
      dropSiteId: params.id,
      status: 'open',
      requestQuantity: requestCountAsNumber,
      ...request,
    };

    backend.addRequest(payload).then((data) => {
      if (!data) {
        return;
      }

      history.push(
        routeWithParams(Routes.SUPPLY_NEW_ADMIN_CONFIRMATION, {
          id: params.id,
          requestId: data,
        }),
      );
    });
  };

  const { requestDescription, requestWillingToPay, ...requiredFields } = fields;

  const fieldData = [
    {
      customOnChange: handleFieldChange('requestType'),
      label: t('request.supplyForm.type.label'),
      name: 'type',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: requiredFields.requestType,
      options: [
        // TODO: get real options
        {
          value: 'Mask',
          label: 'Mask',
        },
        {
          value: 'Mask V2',
          label: 'Mask V2',
        },
      ],
    },
    {
      customOnChange: handleFieldChange('requestTitle'),
      label: t('request.supplyForm.kind.label'),
      name: 'kind',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: requiredFields.requestTitle,
      options: [
        // TODO: get real kinds
        {
          value: 'Kind One',
          label: 'Kind One',
        },
        {
          value: 'Kind Two',
          label: 'Kind two',
        },
      ],
    },
    {
      customOnChange: handleFieldChange('requestQuantity'),
      label: t('request.supplyForm.quantity.label'),
      name: 'quantity',
      type: formFieldTypes.INPUT_TEXT,
      value: requiredFields.requestQuantity,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <Text as="p" key="text" type={TEXT_TYPE.BODY_2}>
          {t('request.supplyForm.requestDescription.note')}
        </Text>,
      ],
    },
    {
      customOnChange: handleFieldChange('requestDescription'),
      label: t('request.supplyForm.requestDescription.label'),
      name: 'requestDescription',
      type: formFieldTypes.TEXT_AREA,
      value: requestDescription,
    },
    {
      customOnChange: handleFieldChange('requestWillingToPay'),
      label: t('request.supplyForm.requestWillingToPay.label'),
      name: 'requestWillingToPay',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: `${requestWillingToPay}`,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <Note key="note-2" css={{ marginTop: Space.S20, width: '100%' }}>
          {t('request.supplyForm.disclaimer')}
        </Note>,
      ],
    },
  ];

  return (
    <FormBuilder
      buttonLabel={t('generic.form.submitLabel')}
      defaultValues={fields}
      description={t('request.supplyForm.description')}
      disabled={!Object.keys(requiredFields).every((key) => !!fields[key])}
      onSubmit={handleSubmit}
      title={t('request.supplyForm.title')}
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default SupplyForm;
