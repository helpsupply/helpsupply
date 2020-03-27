import React from 'react';
import Form from 'components/Form';
import InputText from 'components/InputText';
import { TEXT_TYPE } from 'components/Text/constants';
import HeaderInfo from 'components/Form/HeaderInfo';
import TextArea from 'components/TextArea';
import InputCheckbox from 'components/Checkbox';

class DropSiteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        name: '',
        description: '',
        address: '',
        zip: '',
        hospital: '',
      },
      dropSiteId: props.dropSite.location_id,
      dropSiteDescription: '',
      dropSiteAddress: props.dropSite.dropSiteAddress || '',
      dropSiteRequirements: '',
      dropSiteName: '',
      dropSitePhone: '',
      dropSiteNotes: '',
      requestWillingToPay: false,
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFieldChange = (field) => (value) => {
    this.setState({ [field]: value });
  };

  handleSubmit() {
    const { errors, ...state } = this.state
    this.props.onSubmit({ ...state, location_id: this.state.dropSiteId })
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        title="Set a drop-off location"
        description="This is where donors can drop off supplies. It should be an easily identifiable location including a street address."
      >
        <InputText
          label="Street address"
          value={this.state.dropSiteAddress}
          customOnChange={this.handleFieldChange('dropSiteAddress')}
        />
        <InputText
          label="Additional location details"
          value={this.state.dropSiteDescription}
          customOnChange={this.handleFieldChange('dropSiteDescription')}
        />
        <HeaderInfo
          as="h4"
          type={TEXT_TYPE.HEADER_4}
          title="Add requirements (optional)"
          description="Please enter any requirements about how supplies should be delivered."
        />
        <TextArea
          customOnChange={this.handleFieldChange('dropSiteRequirements')}
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
          value={this.state.dropSiteName}
          customOnChange={this.handleFieldChange('dropSiteName')}
        />
        <InputText
          label="Email or phone number"
          value={this.state.dropSitePhone}
          customOnChange={this.handleFieldChange('dropSitePhone')}
        />
        <TextArea
          label="Is there anything else you’d like others to know about the situation at your facility?"
          customOnChange={this.handleFieldChange('dropSiteNotes')}
        />
        <InputCheckbox
          customOnChange={this.handleFieldChange('requestWillingToPay')}
          label="My facility will pay for large volumes of high-quality supplies."
        />
      </Form>
    );
  }
}

export default DropSiteForm;
