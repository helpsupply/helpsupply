/** @jsx jsx */
import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { css, jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { buttonReset, Color } from 'lib/theme';

import { AdditionalCta } from 'components/AdditionalCta';
import { AdditionalFormTitle } from 'components/AdditionalFormTitle';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import { months } from 'data/months';
import { years } from 'data/years';
import { StateContext } from 'state/StateProvider';

const styles = {
  button: css(buttonReset, { color: Color.PRIMARY }),
};

function ChildcareFormDetails({ id, onSave, request }) {
  const history = useHistory();
  const { t } = useTranslation();

  const { state } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    1: {
      birthMonth: '',
      birthYear: '',
      specialNeeds: '',
    },
  });

  const handleFieldChange = useCallback(
    (field, idx) => (value) => {
      setFields((fields) => ({
        ...fields,
        [idx]: {
          ...fields[idx],
          [field]: value,
        },
      }));
    },
    [],
  );

  const handleRemoveClick = useCallback(
    (targetKey) => {
      const { [targetKey]: _, ...newFields } = fields;
      setFields(newFields);
    },
    [fields],
  );

  const handleAddClick = useCallback(() => {
    const targetFields = Object.keys(fields);
    const nextKey = parseInt(targetFields[targetFields.length - 1]) + 1;
    setFields({
      ...fields,
      [nextKey]: {
        birthMonth: '',
        birthYear: '',
        specialNeeds: '',
      },
    });
  }, [fields]);

  const buildFields = useCallback(() => {
    return Object.keys(fields).flatMap((fieldKey, index) => {
      const targetIndex = index + 1;
      return [
        {
          type: formFieldTypes.NODE,
          node: [
            <AdditionalFormTitle
              key={`childcare-child-title-${fieldKey}`}
              title={`${t(
                'service.childcare.details.labels.title',
              )} ${targetIndex}`}
              secondaryCta={
                targetIndex !== 1 && (
                  <Text
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveClick(fieldKey);
                    }}
                    as="button"
                    type={TEXT_TYPE.BODY_2}
                    css={styles.button}
                  >
                    {t('service.childcare.details.labels.remove')}
                  </Text>
                )
              }
            />,
          ],
        },
        {
          customOnChange: handleFieldChange('birthMonth', fieldKey),
          customkey: `${t(
            'service.childcare.details.labels.birthMonth',
          )}-${fieldKey}`,
          defaultValue: fields[fieldKey].birthMonth,
          label: t('service.childcare.details.labels.birthMonth'),
          options: months,
          name: 'birthMonth',
          type: formFieldTypes.INPUT_DROPDOWN,
          value: fields[fieldKey].birthMonth,
        },
        {
          customOnChange: handleFieldChange('birthYear', fieldKey),
          customkey: `${t(
            'service.childcare.details.labels.birthYear',
          )}-${fieldKey}`,
          defaultValue: fields[fieldKey].birthYear,
          label: t('service.childcare.details.labels.birthYear'),
          options: years,
          name: 'birthYear',
          type: formFieldTypes.INPUT_DROPDOWN,
          value: fields[fieldKey].birthYear,
        },
        {
          customOnChange: handleFieldChange('specialNeeds', fieldKey),
          customkey: `${t(
            'service.childcare.details.labels.specialNeeds',
          )}-${fieldKey}`,
          label: t('service.childcare.details.labels.specialNeeds'),
          name: 'specialNeeds',
          type: formFieldTypes.TEXT_AREA,
          value: fields[fieldKey].specialNeeds,
        },
      ];
    });
  }, [fields, handleFieldChange, handleRemoveClick, t]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await onSave({ children: fields });
    if (!res) {
      setIsLoading(false);
      return;
    }

    const url =
      state.editServiceUrl ||
      routeWithParams(Routes.SERVICE_CHILDCARE_WHAT, { id });
    history.push(url);
  };

  const additionalCta = [
    {
      type: formFieldTypes.NODE,
      node: [
        <AdditionalCta
          cta={t('service.childcare.details.labels.addAnother')}
          key="additional"
          onClick={handleAddClick}
          title={t('service.additionalContact.title')}
        />,
      ],
    },
  ];

  return (
    <div>
      <FormBuilder
        defaultValues={fields}
        onSubmit={handleSubmit}
        title={t('service.childcare.details.title')}
        description={t('service.childcare.details.description')}
        disabled={
          !Object.keys(fields).every(
            (key) => !!fields[key].birthMonth && !!fields[key].birthYear,
          )
        }
        fields={buildFields().concat(additionalCta)}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ChildcareFormDetails;
