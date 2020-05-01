/** @jsx jsx */
import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import Note from 'components/Note';
import { StateContext } from 'state/StateProvider';

function EmotionalFormDate({ id, onSave, request }) {
  const history = useHistory();
  const { state } = useContext(StateContext);
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    date: undefined,
    time: undefined,
    recurring: false,
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
    setIsLoading(true);
    const res = await onSave(fields);
    if (!res) {
      setIsLoading(false);
      return;
    }
    const url =
      state.editServiceUrl ||
      routeWithParams(Routes.SERVICE_EMOTIONAL_WHAT, { id });
    history.push(url);
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('date'),
      defaultValue: fields.date,
      label: t('service.emotional.when.labels.day'),
      options: [
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' },
        { label: 'Saturday', value: 'saturday' },
        { label: 'Sunday', value: 'sunday' },
      ],
      name: 'date',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.date,
    },
    {
      customOnChange: handleFieldChange('time'),
      defaultValue: fields.time,
      label: t('service.emotional.when.labels.time'),
      options: [
        { label: 'Morning', value: 'morning' },
        { label: 'Afternoon', value: 'afternoon' },
        { label: 'Evening', value: 'evening' },
        { label: 'Night', value: 'night' },
      ],
      name: 'time',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.time,
    },
    {
      customOnChange: handleFieldChange('recurring'),
      label: t('service.emotional.when.labels.recurring'),
      name: 'recurring',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.recurring,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <Note key="note-2" css={{ width: '100%' }}>
          {t('service.emotional.when.note')}
        </Note>,
      ],
    },
  ];

  const { recurring, ...requiredFields } = fields;

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.emotional.when.title')}
      description={t('service.emotional.when.description')}
      disabled={!Object.keys(requiredFields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default EmotionalFormDate;
