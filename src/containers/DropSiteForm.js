import React, { useState } from 'react';
import Form from 'components/Form';
import InputText from 'components/InputText';
import { TEXT_TYPE } from 'components/Text/constants';
import HeaderInfo from 'components/Form/HeaderInfo';
import TextArea from 'components/TextArea';
import InputCheckbox from 'components/Checkbox';

export const DropSiteForm = ({ dropSite, onSubmit }) => {
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

  const handleFieldChange = (field) => (value) =>
    setFields({ ...fields, [field]: value });
  const handleSubmit = () => {
    const { dropSiteId, ...state } = fields;
    onSubmit({ ...state, location_id: dropSiteId });
  };
  const {
    dropSiteAddress,
    dropSiteDescription,
    dropSiteName,
    dropSitePhone,
  } = fields;
  return (
    <Form
      onSubmit={handleSubmit}
      title="Set a drop-off location"
      description="This is where donors can drop off supplies. It should be an easily identifiable location including a street address."
    >
      <InputText
        label="Street address"
        value={dropSiteAddress}
        customOnChange={handleFieldChange('dropSiteAddress')}
      />
      <InputText
        label="Additional location details"
        value={dropSiteDescription}
        customOnChange={handleFieldChange('dropSiteDescription')}
      />
      <HeaderInfo
        as="h4"
        type={TEXT_TYPE.HEADER_4}
        title="Add requirements (optional)"
        description="Please enter any requirements about how supplies should be delivered."
      />
      <TextArea
        customOnChange={handleFieldChange('dropSiteRequirements')}
        label="All donated items must be unused and sealed in original packaging."
      />
      <HeaderInfo
        as="h4"
        type={TEXT_TYPE.HEADER_4}
        title="More info (optional)"
        description="We’re also working to solve this problem at scale. Can you give us the name and contact info of the person at your facility responsible for procuring supplies?"
      />
      <InputText
        label="Name"
        value={dropSiteName}
        customOnChange={handleFieldChange('dropSiteName')}
      />
      <InputText
        label="Email or phone number"
        value={dropSitePhone}
        customOnChange={handleFieldChange('dropSitePhone')}
      />
      <TextArea
        label="Is there anything else you’d like others to know about the situation at your facility?"
        customOnChange={handleFieldChange('dropSiteNotes')}
      />
      <InputCheckbox
        customOnChange={handleFieldChange('requestWillingToPay')}
        label="My facility will pay for large volumes of high-quality supplies."
      />
    </Form>
  );
};

export default DropSiteForm;
