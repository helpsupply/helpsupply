/** @jsx jsx */
import { useState, useCallback } from 'react';
import { jsx } from '@emotion/core';
import Form from 'components/Form';
import InputCheckbox from 'components/Checkbox';
import InputDropdown from 'components/InputDropdown';
import InputText from 'components/InputText';
import Note from 'components/Note';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import TextArea from 'components/TextArea';
import { useTranslation } from 'react-i18next';

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

  const handleSubmit = useCallback(() => {
    onSubmit(fields);
  }, [fields, onSubmit]);

  const { detailedRequirements, type, kind, quantity } = fields;

  return (
    <Form
      defaultValues={fields}
      buttonLabel="Submit"
      onSubmit={handleSubmit}
      description={t('request.supplyForm.description')}
      title={t('request.supplyForm.title')}
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
    >
      <InputDropdown
        name="type"
        label={t('request.supplyForm.type.label')}
        value={type}
        customOnChange={handleFieldChange('type')}
      />
      <InputDropdown
        name="kind"
        label={t('request.supplyForm.kind.label')}
        value={kind}
        customOnChange={handleFieldChange('kind')}
      />
      <InputText
        name="quantity"
        label={t('request.supplyForm.quantity.label')}
        value={quantity}
        customOnChange={handleFieldChange('quantity')}
      />
      <Note>{t('request.supplyForm.disclaimer')}</Note>

      <Text as="p" type={TEXT_TYPE.BODY_2}>
        {t('request.supplyForm.detailedRequirements.note')}
      </Text>

      <TextArea
        customOnChange={handleFieldChange('detailedRequirements')}
        label={t('request.supplyForm.detailedRequirements.label')}
        name="detailedRequirements"
        value={detailedRequirements}
      />

      <InputCheckbox
        customOnChange={handleFieldChange('requestWillingToPay')}
        label={t('request.supplyForm.facilityWillPayLargeVolumes.label')}
        name="facilityWillPayLargeVolumes"
        value="1"
      />

      <Note>{t('request.supplyForm.disclaimer')}</Note>
    </Form>
  );
}

export default SupplyForm;
