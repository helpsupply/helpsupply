import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

export const DropSiteForm = ({ dropSite, onSubmit }) => {
  const { t } = useTranslation();
  const [fields, setFields] = useState(dropSite);

  const handleFieldChange = useCallback(
    (field) => (value) => setFields({ ...fields, [field]: value }),
    [fields],
  );
  const handleSubmit = useCallback(() => {
    onSubmit(fields);
  }, [fields, onSubmit]);

  const { dropSiteAddress, dropSiteDescription } = fields;

  const fieldData = [
    {
      customOnChange: handleFieldChange('dropSiteAddress'),
      label: t('request.dropSiteForm.dropSiteAddress.label'),
      name: 'dropSiteAddress',
      type: formFieldTypes.INPUT_TEXT,
      defaultValue: dropSiteAddress,
    },
    {
      customOnChange: handleFieldChange('dropSiteDescription'),
      label: t('request.dropSiteForm.dropSiteDescription.label'),
      name: 'dropSiteDescription',
      type: formFieldTypes.INPUT_TEXT,
      defaultValue: dropSiteDescription,
    },
    {
      customOnChange: handleFieldChange('dropSiteNotes'),
      label: t('request.dropSiteForm.dropSiteNotes.label'),
      name: 'dropSiteNotes',
      type: formFieldTypes.TEXT_AREA,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('request.dropSiteForm.title')}
      description={t('request.dropSiteForm.description')}
      disabled={!fields.dropSiteAddress || !fields.dropSiteDescription}
      fields={fieldData}
    />
  );
};

export default DropSiteForm;
