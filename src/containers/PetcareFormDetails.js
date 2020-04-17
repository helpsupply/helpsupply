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

const styles = {
  button: css(buttonReset, { color: Color.PRIMARY }),
};

function PetcareFormDetails({ id, onSave }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [petCount, setPetCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    petType: '',
    careNeeded: '',
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
    if (petCount <= 0) {
      return;
    }
    setPetCount(petCount - 1);
  }, [petCount]);

  const additionalPets = useCallback(() => {
    return [...Array(petCount)].flatMap((_, index) => {
      return [
        {
          type: formFieldTypes.NODE,
          node: [
            <AdditionalFormTitle
              key={`petcare-pet-title-${index + 2}`}
              title={`${t('service.petcare.details.labels.title')} ${
                index + 2
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
                  {t('service.petcare.details.labels.remove')}
                </Text>
              }
            />,
          ],
        },
        {
          customOnChange: handleFieldChange('petType'),
          customkey: `${t('service.petcare.details.labels.petType')}-${
            index + 2
          }`,
          label: t('service.petcare.details.labels.petType'),
          options: [
            { label: 'Dog', value: 'dog' },
            { label: 'Cat', value: 'cat' },
          ],
          name: 'petType',
          type: formFieldTypes.INPUT_DROPDOWN,
          value: fields.petType,
        },
        {
          customOnChange: handleFieldChange('careNeeded'),
          customkey: `${t('service.petcare.details.labels.careNeeded')}-${
            index + 2
          }`,
          label: t('service.petcare.details.labels.careNeeded'),
          options: [
            { label: 'Walking', value: 'walking' },
            { label: 'Feeding', value: 'feeding' },
            { label: 'Medicine', value: 'medicine' },
          ],
          name: 'careNeeded',
          type: formFieldTypes.INPUT_DROPDOWN,
          value: fields.careNeeded,
        },
      ];
    });
  }, [
    petCount,
    fields.petType,
    fields.careNeeded,
    handleFieldChange,
    handleRemoveClick,
    t,
  ]);

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSave(fields);
    history.push(routeWithParams(Routes.SERVICE_ADDITIONAL_INFO, { id }));
  };

  const fieldData = [
    {
      type: formFieldTypes.NODE,
      node: [
        <AdditionalFormTitle
          key="petcare-pet-title"
          noBorder={true}
          title={`${t('service.petcare.details.labels.title')} 1`}
        />,
      ],
    },
    {
      customOnChange: handleFieldChange('petType'),
      customkey: t('service.petcare.details.labels.petType'),
      label: t('service.petcare.details.labels.petType'),
      options: [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
      ],
      name: 'petType',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.petType,
    },
    {
      customOnChange: handleFieldChange('careNeeded'),
      customkey: t('service.petcare.details.labels.careNeeded'),
      label: t('service.petcare.details.labels.careNeeded'),
      options: [
        { label: 'Walking', value: 'walking' },
        { label: 'Feeding', value: 'feeding' },
        { label: 'Medicine', value: 'medicine' },
      ],
      name: 'careNeeded',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.careNeeded,
    },
  ];

  const additionalCta = [
    {
      type: formFieldTypes.NODE,
      node: [
        <AdditionalCta
          cta={t('service.petcare.where.add')}
          key="additional"
          onClick={() => setPetCount(petCount + 1)}
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
        title={t('service.petcare.details.title')}
        description={t('service.petcare.details.description')}
        disabled={!Object.keys(fields).every((key) => !!fields[key])}
        fields={fieldData.concat(additionalPets(), additionalCta)}
        isLoading={isLoading}
      />
    </div>
  );
}

export default PetcareFormDetails;
