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

const timeFields = [
  'mornings',
  'afternoons',
  'evenings',
  'nights',
  'variesTime',
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

  const buildTimeFields = () => {
    return timeFields.flatMap((time, index) => {
      return [
        {
          customOnChange: handleFieldChange(time),
          label: t(`service.when.labels.${time}`),
          name: time,
          type: formFieldTypes.INPUT_CHECKBOX,
          value: fields[time],
        },
      ];
    });
  };

  const fieldData = [
    ...buildDayFields(),
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
    ...buildTimeFields(),
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
      buttonLabel={t('global.form.submitLabelNext')}
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.childcare.when.title')}
      description={t('service.childcare.when.description')
        .split('\n')
        .map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      disabled={
        !dayFields.some((dayField) => {
          return fields[dayField];
        }) ||
        !timeFields.some((timeField) => {
          return fields[timeField];
        })
      }
      fields={fieldData}
      isLoading={isLoading}
    />
  );
}

export default ChildcareFormDate;
