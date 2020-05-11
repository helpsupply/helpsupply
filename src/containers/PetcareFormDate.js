/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { css, jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import { Space } from 'lib/theme';

import { AdditionalFormTitle } from 'components/AdditionalFormTitle';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import Note from 'components/Note';

const styles = {
  optionsTitle: css({
    paddingTop: Space.S25,
  }),
  note: css({
    marginTop: Space.S25,
    width: '100%',
  }),
};

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

export const PetcareFormDate = ({ id, onSave }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const [fields, setFields] = useState({
    mondays: '',
    tuesdays: '',
    wednesdays: '',
    thursdays: '',
    fridays: '',
    saturdays: '',
    sundays: '',
    varies: '',

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
    history.push(routeWithParams(Routes.SERVICE_PETCARE_DETAILS, { id }));
  };

  const buildDayFields = () => {
    return dayFields.flatMap((day) => {
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
          label:
            time === 'variesTime'
              ? `${t('service.when.labels.varies')}-1`
              : t(`service.when.labels.${time}`),
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
        <div key="petcare-options-title" css={styles.optionsTitle}>
          <AdditionalFormTitle
            description={t('service.petcare.when.additional.title')}
            title={t('service.petcare.when.additional.description')}
          />
        </div>,
      ],
    },
    ...buildTimeFields(),
    {
      type: formFieldTypes.NODE,
      node: [
        <Note key="note-2" css={styles.note}>
          {t('service.petcare.when.note')}
        </Note>,
      ],
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.petcare.when.title')}
      description={t('service.petcare.when.description')}
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
};

export default PetcareFormDate;
