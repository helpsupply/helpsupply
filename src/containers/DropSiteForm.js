import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TEXT_TYPE } from 'components/Text/constants';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

export const DropSiteForm = ({ dropSite, onSubmit }) => {
  const { t } = useTranslation();
  const [fields, setFields] = useState({
    dropSiteId: dropSite?.location_id,
    dropSiteDescription: '',
    dropSiteAddress: dropSite?.dropSiteAddress || '',
    dropSiteRequirements: '',
    dropSiteName: '',
    dropSitePhone: '',
    dropSiteNotes: '',
    requestWillingToPay: false,
  });

  const handleFieldChange = useCallback(
    (field) => (value) => setFields({ ...fields, [field]: value }),
    [fields],
  );
  const handleSubmit = useCallback(() => {
    const { dropSiteId, ...state } = fields;
    onSubmit({ ...state, location_id: dropSiteId });
  }, [fields, onSubmit]);

  const {
    dropSiteAddress,
    dropSiteDescription,
    dropSiteName,
    dropSitePhone,
  } = fields;

  const fieldData = [
    {
      customOnChange: handleFieldChange('dropSiteAddress'),
      label: t('request.dropSiteForm.dropSiteAddress.label'),
      name: 'address',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteAddress,
    },
    {
      customOnChange: handleFieldChange('dropSiteDescription'),
      label: t('request.dropSiteForm.dropSiteDescription.label'),
      name: 'details',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteDescription,
    },
    {
      as: 'h4',
      description: t('request.dropSiteForm.requirements.description'),
      title: t('request.dropSiteForm.requirements.title'),
      textType: TEXT_TYPE.HEADER_4,
      type: formFieldTypes.HEADER_INFO,
    },
    {
      customOnChange: handleFieldChange('dropSiteRequirements'),
      label: t('request.dropSiteForm.dropSiteRequirements.label'),
      name: 'requirement',
      type: formFieldTypes.TEXT_AREA,
    },
    {
      as: 'h4',
      description: t('request.dropSiteForm.moreInfo.description'),
      title: t('request.dropSiteForm.moreInfo.title'),
      textType: TEXT_TYPE.HEADER_4,
      type: formFieldTypes.HEADER_INFO,
    },
    {
      customOnChange: handleFieldChange('dropSiteName'),
      isRequired: false,
      label: t('request.dropSiteForm.dropSiteName.label'),
      name: 'name',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteName,
    },
    {
      customOnChange: handleFieldChange('dropSitePhone'),
      isRequired: false,
      label: t('request.dropSiteForm.dropSitePhone.label'),
      name: 'phone',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSitePhone,
    },
    {
      customOnChange: handleFieldChange('dropSiteNotes'),
      label: t('request.dropSiteForm.dropSiteNotes.label'),
      name: 'notes',
      type: formFieldTypes.TEXT_AREA,
    },
    {
      customOnChange: handleFieldChange('requestWillingToPay'),
      label: t('request.dropSiteForm.requestWillingToPay.label'),
      name: 'willingnessToPay',
      type: formFieldTypes.INPUT_CHECKBOX,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('request.dropSiteForm.title')}
      description={t('request.dropSiteForm.description')}
      fields={fieldData}
    />
  );
};

export default DropSiteForm;
