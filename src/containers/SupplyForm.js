/** @jsx jsx */
import { useState, useCallback } from 'react';
import { jsx } from '@emotion/core';
import Form from 'components/Form';
import InputText from 'components/InputText';
import InputDropdown from 'components/InputDropdown';
import Note from 'components/Note';
import { useTranslation } from 'react-i18next';

function SupplyForm({ onSubmit }) {
  const { t } = useTranslation();
  const [fields, setFields] = useState({
    type: undefined,
    kind: undefined,
    quantity: '',
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

  const { type, kind, quantity } = fields;

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
        placeholder={t('request.supplyForm.type.label')}
        value={type}
        customOnChange={handleFieldChange('type')}
      />
      <InputDropdown
        name="kind"
        placeholder={t('request.supplyForm.kind.label')}
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
    </Form>
  );
}

export default SupplyForm;
