/** @jsx jsx */
import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { css, jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { StateContext } from 'state/StateProvider';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import { Space } from 'lib/theme';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import Note from 'components/Note';

const styles = {
  note: css({
    marginTop: Space.S30,
    width: '100%',
  }),
};

export const GroceryFormDate = ({ id, onSave }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { state } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);

  const [fields, setFields] = useState({
    date: '',
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

  const { recurring, ...requiredFields } = fields;

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await onSave(fields);
    if (!res) {
      setIsLoading(false);
      return;
    }
    const url =
      state.editServiceUrl ||
      routeWithParams(Routes.SERVICE_GROCERIES_WHAT, { id });
    history.push(url);
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('date'),
      defaultValue: fields.date,
      label: t('service.grocery.when.labels.day'),
      name: 'date',
      type: formFieldTypes.INPUT_DATE,
      value: fields.date,
    },
    {
      customOnChange: handleFieldChange('time'),
      defultValue: fields.time,
      isRequired: false,
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
        <Note key="note-2" css={styles.note}>
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
      disabled={!Object.keys(requiredFields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
    />
  );
};

export default GroceryFormDate;
