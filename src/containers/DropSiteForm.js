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
      locationDetails: '',
      address: '',
      requirements: '',
      contactName: '',
      contactPhone: '',
      notes: '',
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldChange = (field) => (value) => {
    this.setState({ [field]: value });
  };

  handleSubmit() {
    const { errors, ...state } = this.state;
    const payload = state;
    this.props.onSubmit(payload);
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
          value={this.state.address}
          customOnChange={this.handleFieldChange('address')}
        />
        <InputText
          label="Additional location details"
          value={this.state.locationDetails}
          customOnChange={this.handleFieldChange('locationDetails')}
        />
        <HeaderInfo
          as="h4"
          type={TEXT_TYPE.HEADER_4}
          title="Add requirements (optional)"
          description="Please enter any requirements about how supplies should be delivered."
        />
        <TextArea
          customOnChange={this.handleFieldChange('requirements')}
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
          value={this.state.name}
          customOnChange={this.handleFieldChange('contactName')}
        />
        <InputText
          label="Email or phone number"
          value={this.state.phone}
          customOnChange={this.handleFieldChange('contactPhone')}
        />
        <TextArea
          label="Is there anything else you’d like others to know about the situation at your facility?"
          customOnChange={this.handleFieldChange('notes')}
        />
        <InputCheckbox label="My facility will pay for large volumes of high-quality supplies." />
      </Form>
    );
  }
}

export default DropSiteForm;
