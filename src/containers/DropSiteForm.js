import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import InputCheckbox from 'components/Checkbox';
import Form from 'components/Form';
import HeaderInfo from 'components/Form/HeaderInfo';
import InputText from 'components/InputText';
import { TEXT_TYPE } from 'components/Text/constants';
import TextArea from 'components/TextArea';

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
  return (
    <Form
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('request.dropSiteForm.title')}
      description={t('request.dropSiteForm.description')}
    >
      <InputText
        name="address"
        label={t('request.dropSiteForm.dropSiteAddress.label')}
        value={dropSiteAddress}
        customOnChange={handleFieldChange('dropSiteAddress')}
      />
      <InputText
        name="details"
        label={t('request.dropSiteForm.dropSiteDescription.label')}
        value={dropSiteDescription}
        customOnChange={handleFieldChange('dropSiteDescription')}
      />
      <HeaderInfo
        as="h4"
        type={TEXT_TYPE.HEADER_4}
        title={t('request.dropSiteForm.requirements.title')}
        description={t('request.dropSiteForm.requirements.description')}
      />
      <TextArea
        customOnChange={handleFieldChange('dropSiteRequirements')}
        label={t('request.dropSiteForm.dropSiteRequirements.label')}
      />
      <HeaderInfo
        as="h4"
        type={TEXT_TYPE.HEADER_4}
        title={t('request.dropSiteForm.moreInfo.title')}
        description={t('request.dropSiteForm.moreInfo.description')}
      />
      <InputText
        name="name"
        label={t('request.dropSiteForm.dropSiteName.label')}
        value={dropSiteName}
        isRequired={false}
        customOnChange={handleFieldChange('dropSiteName')}
      />
      <InputText
        name="phone"
        label={t('request.dropSiteForm.dropSitePhone.label')}
        value={dropSitePhone}
        isRequired={false}
        customOnChange={handleFieldChange('dropSitePhone')}
      />
      <TextArea
        label={t('request.dropSiteForm.dropSiteNotes.label')}
        customOnChange={handleFieldChange('dropSiteNotes')}
      />
      <InputCheckbox
        customOnChange={handleFieldChange('requestWillingToPay')}
        label={t('request.dropSiteForm.requestWillingToPay.label')}
      />
    </Form>
  );
};

export default DropSiteForm;
