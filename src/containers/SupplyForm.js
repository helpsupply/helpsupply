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
    detailedRequirements: undefined,
    type: undefined,
    kind: undefined,
    quantity: undefined,
    requestWillingToPay: false,
  });

  const handleFieldChange = useCallback(
    (field) => (value) => {
      setFields((fields) => ({ ...fields, [field]: value }));
    },
    [],
  );

  const handleSubmit = () => {
    console.log('handle supply submit for dropsite', fields);
    setIsLoading(true);

    // TODO: plug this form in
    setTimeout(() => {
      history.push(
        routeWithParams(Routes.SUPPLY_NEW_ADMIN_CONFIRMATION, {
          id: params.id,
        }),
      );
    }, 2000);
  };

  const {
    requestWillingToPay,
    detailedRequirements,
    ...requiredFields
  } = fields;

  const fieldData = [
    {
      customOnChange: handleFieldChange('type'),
      label: t('request.supplyForm.type.label'),
      name: 'type',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: requiredFields.type,
      options: [
        // TODO: get real options
        {
          value: 'mask',
          label: 'Mask',
        },
        {
          value: 'mask_v2',
          label: 'Mask V2',
        },
      ],
    },
    {
      customOnChange: handleFieldChange('kind'),
      label: t('request.supplyForm.kind.label'),
      name: 'kind',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: requiredFields.kind,
      options: [
        // TODO: get real kinds
        {
          value: 'kind_one',
          label: 'Kind One',
        },
        {
          value: 'kind_two',
          label: 'Kind two',
        },
      ],
    },
    {
      customOnChange: handleFieldChange('quantity'),
      label: t('request.supplyForm.quantity.label'),
      name: 'quantity',
      type: formFieldTypes.INPUT_TEXT,
      value: requiredFields.quantity,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <Text as="p" key="text" type={TEXT_TYPE.BODY_2}>
          {t('request.supplyForm.detailedRequirements.note')}
        </Text>,
      ],
    },
    {
      customOnChange: handleFieldChange('detailedRequirements'),
      label: t('request.supplyForm.detailedRequirements.label'),
      name: 'detailedRequirements',
      type: formFieldTypes.TEXT_AREA,
      value: detailedRequirements,
    },
    {
      customOnChange: handleFieldChange('requestWillingToPay'),
      label: t('request.supplyForm.facilityWillPayLargeVolumes.label'),
      name: 'facilityWillPayLargeVolumes',
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
