/** @jsx jsx */
import { useState, useCallback } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import { Space } from 'lib/theme';

import Note from 'components/Note';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import SupplyConfirmation from 'components/SupplyConfirmation';

function SupplyForm({ onSubmit }) {
  const { t } = useTranslation();
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

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleSubmit = useCallback(() => {
    if (onSubmit) {
      onSubmit(fields);
    }
    setSubmitSuccess(true);
  }, [fields, onSubmit]);

  if (submitSuccess) {
    return <SupplyConfirmation />;
  }

  const { detailedRequirements, type, kind, quantity } = fields;

  const fieldData = [
    {
      customOnChange: handleFieldChange('type'),
      label: t('request.supplyForm.type.label'),
      name: 'type',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: type,
    },
    {
      customOnChange: handleFieldChange('kind'),
      label: t('request.supplyForm.kind.label'),
      name: 'kind',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: kind,
    },
    {
      customOnChange: handleFieldChange('quantity'),
      label: t('request.supplyForm.quantity.label'),
      name: 'quantity',
      type: formFieldTypes.INPUT_TEXT,
      value: quantity,
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
      value: '1',
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
      defaultValues={fields}
      buttonLabel={t('generic.form.submitLabel')}
      onSubmit={handleSubmit}
      description={t('request.supplyForm.description')}
      title={t('request.supplyForm.title')}
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
      fields={fieldData}
    />
  );
}

export default SupplyForm;
