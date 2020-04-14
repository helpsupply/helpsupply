/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import Note from 'components/Note';

function GroceryFormDate() {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    date: '',
    time: '',
    recurring: '',
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
    setIsLoading(true);
    // service todo: wire-up form events
    history.push(routeWithParams(Routes.SERVICE_GROCERIES_WHAT));
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('date'),
      label: t('service.grocery.when.labels.day'),
      name: 'date',
      type: formFieldTypes.INPUT_DATE,
      value: fields.date,
    },
    {
      customOnChange: handleFieldChange('time'),
      label: t('service.grocery.when.labels.time'),
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
      label: t('service.grocery.when.labels.recurring'),
      name: 'recurring',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.recurring,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <Note key="note-2" css={{ width: '100%' }}>
          {t('service.grocery.when.note')}
        </Note>,
      ],
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.grocery.when.title')}
      description={t('service.grocery.when.description')}
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default GroceryFormDate;
