/** @jsx jsx */
import { useCallback, useState } from 'react';
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

const styles = {
  button: css(buttonReset, { color: Color.PRIMARY }),
};

function ChildcareFormDetails() {
  const history = useHistory();
  const { t } = useTranslation();

  const [childCount, setChildCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    birthMonth: '',
    birthYear: '',
    specialNeeds: '',
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

  const handleRemoveClick = useCallback(() => {
    if (childCount <= 0) {
      return;
    }
    setChildCount(childCount - 1);
  }, [childCount]);

  const additionalChildren = useCallback(() => {
    return [...Array(childCount)].flatMap((_, index) => {
      return [
        {
          type: formFieldTypes.NODE,
          node: [
            <AdditionalFormTitle
              key={`childcare-child-title-${index}`}
              title={`${t('service.childcare.details.labels.title')} ${
                index + 1
              }`}
              secondaryCta={
                <Text
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveClick();
                  }}
                  as="button"
                  type={TEXT_TYPE.BODY_2}
                  css={styles.button}
                >
                  {t('service.childcare.details.labels.remove')}
                </Text>
              }
            />,
          ],
        },
        {
          customOnChange: handleFieldChange('birthMonth'),
          customkey: `${t(
            'service.childcare.details.labels.birthMonth',
          )}-${index}`,
          label: t('service.childcare.details.labels.birthMonth'),
          options: months,
          name: 'birthMonth',
          type: formFieldTypes.INPUT_DROPDOWN,
          value: fields.birthMonth,
        },
        {
          customOnChange: handleFieldChange('birthYear'),
          customkey: `${t(
            'service.childcare.details.labels.birthYear',
          )}-${index}`,
          label: t('service.childcare.details.labels.birthYear'),
          options: years,
          name: 'birthYear',
          type: formFieldTypes.INPUT_DROPDOWN,
          value: fields.birthYear,
        },
        {
          customOnChange: handleFieldChange('specialNeeds'),
          customkey: `${t(
            'service.childcare.details.labels.specialNeeds',
          )}-${index}`,
          label: t('service.childcare.details.labels.specialNeeds'),
          name: 'specialNeeds',
          type: formFieldTypes.TEXT_AREA,
          value: fields.specialNeeds,
        },
      ];
    });
  }, [
    childCount,
    fields.birthMonth,
    fields.birthYear,
    fields.specialNeeds,
    handleFieldChange,
    handleRemoveClick,
    t,
  ]);

  const handleSubmit = () => {
    setIsLoading(true);
    // service todo: wire-up form events
    history.push(routeWithParams(Routes.SERVICE_CHILDCARE_WHAT));
  };

  const fieldData = [
    {
      type: formFieldTypes.NODE,
      node: [
        <AdditionalFormTitle
          key="childcare-child-title"
          noBorder={true}
          title={t('service.childcare.details.labels.title')}
        />,
      ],
    },
    {
      customOnChange: handleFieldChange('birthMonth'),
      label: t('service.childcare.details.labels.birthMonth'),
      options: months,
      name: 'birthMonth',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.birthMonth,
    },
    {
      customOnChange: handleFieldChange('birthYear'),
      label: t('service.childcare.details.labels.birthYear'),
      options: years,
      name: 'birthYear',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.birthYear,
    },
    {
      customOnChange: handleFieldChange('specialNeeds'),
      label: t('service.childcare.details.labels.specialNeeds'),
      name: 'specialNeeds',
      type: formFieldTypes.TEXT_AREA,
      value: fields.specialNeeds,
    },
  ];

  const additionalCta = [
    {
      type: formFieldTypes.NODE,
      node: [
        <AdditionalCta
          cta={t('service.childcare.where.add')}
          key="additional"
          onClick={() => setChildCount(childCount + 1)}
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
        disabled={!Object.keys(fields).every((key) => !!fields[key])}
        fields={fieldData.concat(additionalChildren(), additionalCta)}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ChildcareFormDetails;
