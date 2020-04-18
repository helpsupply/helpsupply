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

function PetcareFormDetails({ id, onSave, request }) {
  const history = useHistory();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    1: {
      petType: '',
      careNeeded: '',
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
        petType: '',
        careNeeded: '',
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
              key={`petcare-pet-title-${fieldKey}`}
              title={`${t(
                'service.petcare.details.labels.title',
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
                    {t('service.petcare.details.labels.remove')}
                  </Text>
                )
              }
            />,
          ],
        },
        {
          customOnChange: handleFieldChange('petType', fieldKey),
          customkey: `${t(
            'service.petcare.details.labels.petType',
          )}-${fieldKey}`,
          defaultValue: fields[fieldKey].petType,
          label: t('service.petcare.details.labels.petType'),
          options: [
            { label: 'Dog', value: 'dog' },
            { label: 'Cat', value: 'cat' },
          ],
          name: 'petType',
          type: formFieldTypes.INPUT_DROPDOWN,
          value: fields[fieldKey].petType,
        },
        {
          customOnChange: handleFieldChange('careNeeded', fieldKey),
          customkey: `${t(
            'service.petcare.details.labels.careNeeded',
          )}-${fieldKey}`,
          defaultValue: fields[fieldKey].careNeeded,
          label: t('service.petcare.details.labels.careNeeded'),
          options: [
            { label: 'Walking', value: 'walking' },
            { label: 'Feeding', value: 'feeding' },
            { label: 'Medicine', value: 'medicine' },
          ],
          name: 'careNeeded',
          type: formFieldTypes.INPUT_DROPDOWN,
          value: fields[fieldKey].careNeeded,
        },
      ];
    });
  }, [fields, handleFieldChange, handleRemoveClick, t]);

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSave({ pets: fields });
    history.push(routeWithParams(Routes.SERVICE_ADDITIONAL_INFO, { id }));
  };

  const additionalCta = [
    {
      type: formFieldTypes.NODE,
      node: [
        <AdditionalCta
          cta={t('service.petcare.details.labels.addAnother')}
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
        title={t('service.petcare.details.title')}
        description={t('service.petcare.details.description')}
        disabled={!Object.keys(fields).every((key) => !!fields[key])}
        fields={buildFields().concat(additionalCta)}
        isLoading={isLoading}
      />
    </div>
  );
}

export default PetcareFormDetails;
