/** @jsx jsx */
import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { Space } from 'lib/theme';

import { AdditionalFormTitle } from 'components/AdditionalFormTitle';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import Note from 'components/Note';
import { StateContext } from 'state/StateProvider';

const dayFields = [
  'mondays',
  'tuesdays',
  'wednesdays',
  'thursdays',
  'fridays',
  'saturdays',
  'sundays',
  'varies',
];

function ChildcareFormDate({ id, onSave, request }) {
  const history = useHistory();
  const { t } = useTranslation();
  const { state } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    mondays: false,
    tuesdays: false,
    wednesdays: false,
    thursdays: false,
    fridays: false,
    saturdays: false,
    sundays: false,
    varies: false,

    mornings: false,
    afternoons: false,
    evenings: false,
    nights: false,
    variesTime: false,
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
      routeWithParams(Routes.SERVICE_CHILDCARE_DETAILS, { id });
    history.push(url);
  };

  const buildDayFields = () => {
    return dayFields.flatMap((day, index) => {
      return [
        {
          customOnChange: handleFieldChange(day),
          label: t(`service.when.labels.${day}`),
          name: day,
          type: formFieldTypes.INPUT_CHECKBOX,
          value: fields[day],
        },
      ];
    });
  };

  const fieldData = [
    {
      type: formFieldTypes.NODE,
      node: [
        <div key="childcare-options-title" css={{ paddingTop: Space.S25 }}>
          <AdditionalFormTitle
            description={t('service.childcare.when.additional.title')}
            title={t('service.childcare.when.additional.description')}
          />
        </div>,
      ],
    },
    {
      customOnChange: handleFieldChange('mornings'),
      label: t('service.when.labels.mornings'),
      name: 'mornings',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.mornings,
    },
    {
      customOnChange: handleFieldChange('afternoons'),
      label: t('service.when.labels.afternoons'),
      name: 'afternoons',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.afternoons,
    },
    {
      customOnChange: handleFieldChange('evenings'),
      label: t('service.when.labels.evenings'),
      name: 'evenings',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.evenings,
    },
    {
      customOnChange: handleFieldChange('nights'),
      label: t('service.when.labels.nights'),
      name: 'nights',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.nights,
    },
    {
      customOnChange: handleFieldChange('variesTime'),
      label: t('service.when.labels.varies'),
      customkey: `${t('service.when.labels.varies')}-1`,
      name: 'variesTime',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.variesTime,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <Note key="note-2" css={{ marginTop: Space.S25, width: '100%' }}>
          {t('service.childcare.when.note')}
        </Note>,
      ],
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.childcare.when.title')}
      description={t('service.childcare.when.description')}
      fields={[...buildDayFields(), ...fieldData]}
      isLoading={isLoading}
    />
  );
}

export default ChildcareFormDate;
