/** @jsx jsx */
import { useState, useCallback } from 'react';
import { jsx } from '@emotion/core';
import Form from 'components/Form';
import InputText from 'components/InputText';
import InputDropdown from 'components/InputDropdown';
import Note from 'components/Note';

function SupplyForm({ onSubmit }) {
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
      description="You’ll be able to add more requests after submitting this first one."
      title="What supplies do you need most?"
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
    >
      <InputDropdown
        name="type"
        placeholder="Select type"
        value={type}
        customOnChange={handleFieldChange('type')}
      />
      <InputDropdown
        name="kind"
        placeholder="Select kind"
        value={kind}
        customOnChange={handleFieldChange('kind')}
      />
      <InputText
        name="quantity"
        label="Quantity"
        value={quantity}
        customOnChange={handleFieldChange('quantity')}
      />
      <Note>
        Note: By submitting this request you acknowledge that Help Supply
        assumes no liability for any supplies delivered by donors.
      </Note>
    </Form>
  );
}

export default SupplyForm;
