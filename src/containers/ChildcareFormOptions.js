/** @jsx jsx */
import { useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { StateContext } from 'state/StateProvider';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import { Color, Space } from 'lib/theme';

import Anchor, { anchorTypes } from 'components/Anchor';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { AdditionalFormTitle } from 'components/AdditionalFormTitle';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

const nodeContainerStyles = {
  color: Color.GRAY_75,
  marginBottom: Space.S30,
  marginTop: Space.S10,
};

export const ChildcareFormDetails = ({ id, onSave }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { state } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    childCareCenters: false,
    mutualAid: false,
    enrichmentCenters: false,
    babySitters: false,
    freeOptions: false,
    paymentAbility: '',
    householdRisk: undefined,
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
      routeWithParams(Routes.SERVICE_ADDITIONAL_INFO, { id });
    history.push(url);
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('childCareCenters'),
      label: t('service.childcare.what.labels.childCareCenters'),
      name: 'childCareCenters',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.childCareCenters,
    },
    {
      customOnChange: handleFieldChange('mutualAid'),
      label: t('service.childcare.what.labels.mutualAid'),
      name: 'mutualAid',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.mutualAid,
    },
    {
      customOnChange: handleFieldChange('enrichmentCenters'),
      label: t('service.childcare.what.labels.enrichmentCenters'),
      name: 'enrichmentCenters',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.enrichmentCenters,
    },
    {
      customOnChange: handleFieldChange('babySitters'),
      label: t('service.childcare.what.labels.babySitters'),
      name: 'babySitters',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.babySitters,
    },
    {
      customOnChange: handleFieldChange('freeOptions'),
      label: t('service.childcare.what.labels.freeOptions'),
      name: 'freeOptions',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.freeOptions,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <AdditionalFormTitle.BottomRule key="childcare-options-divider" />,
      ],
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <Text
          as="p"
          type={TEXT_TYPE.NOTE}
          css={{ ...nodeContainerStyles, marginTop: 0 }}
          key="childcare-options-note-1"
        >
          {t('service.childcare.what.labels.noteLowCost')}
        </Text>,
      ],
    },
    {
      customOnChange: handleFieldChange('paymentAbility'),
      isRequired: false,
      label: t('service.childcare.what.labels.paymentAbility'),
      name: 'paymentAbility',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.paymentAbility,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <Text
          as="div"
          type={TEXT_TYPE.NOTE}
          css={nodeContainerStyles}
          key="childcare-options-note-1"
        >
          <ReactMarkdown
            renderers={{
              root: ({ children }) => {
                return <div>{children[0].props.children}</div>;
              },
              link: ({ href, children }) => {
                return (
                  <div>
                    <Anchor href={href} as={anchorTypes.A} isExternalLink>
                      {children}
                    </Anchor>
                  </div>
                );
              },
            }}
            source={t('service.childcare.what.labels.noteRisk', {
              url:
                'https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/groups-at-higher-risk.html',
            })}
          />
        </Text>,
      ],
    },
    {
      customOnChange: handleFieldChange('householdRisk'),
      defaultValue: fields.householdRisk,
      label: t('service.childcare.what.labels.householdRisk'),
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
      name: 'householdRisk',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.householdRisk,
    },
    {
      type: formFieldTypes.NODE,
      node: [
        <Text
          as="p"
          type={TEXT_TYPE.NOTE}
          css={{ ...nodeContainerStyles, marginBottom: Space.S10 }}
          key="childcare-options-note-1"
        >
          {t('service.childcare.what.labels.noteShare')}
        </Text>,
      ],
    },
  ];

  const {
    childCareCenters,
    mutualAid,
    enrichmentCenters,
    babySitters,
    freeOptions,
    paymentAbility,
    ...requiredFields
  } = fields;

  return (
    <div>
      <FormBuilder
        buttonLabel={t('global.form.submitLabelNext')}
        defaultValues={fields}
        onSubmit={handleSubmit}
        title={t('service.childcare.what.title')}
        description={t('service.childcare.what.description')}
        disabled={!Object.keys(requiredFields).every((key) => !!fields[key])}
        fields={fieldData}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChildcareFormDetails;
