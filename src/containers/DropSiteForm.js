import React from "react";
import Form from "components/Form";
import InputText from "components/InputText";
import { TEXT_TYPE } from "components/Text/constants";
import HeaderInfo from "components/Form/HeaderInfo";
import TextArea from "components/TextArea";

class DropSiteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        name: "",
        description: "",
        address: "",
        zip: "",
        hospital: "",
      },
      dropsite: null,
      // id: '',
      // name: '',
      // description: '',
      // address: '',
      // zip: '',
      // hospital: '',
      // phone: '',
    };
    // this.handleEditDropSite = this.handleEditDropSite.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleValidate = this.handleValidate.bind(this);
  }

  render() {
    console.log(this.props);
    return (
      <Form
        onSubmit={() => this.props.onSubmit("hI!")}
        title="Set a drop-off location"
        description="This is where donors can drop off supplies. It should be an easily identifiable location including a street address."
      >
        <InputText label="Street address" value={this.state.address} />
        <InputText
          label="Additional location details"
          value={this.state.description}
        />
        <HeaderInfo
          as="h4"
          type={TEXT_TYPE.HEADER_4}
          title="Add requirements (optional)"
          description="Please enter any requirements about how supplies should be delivered."
        />
        <TextArea label="All donated items must be unused and sealed in original packaging." />
        <HeaderInfo
          as="h4"
          type={TEXT_TYPE.HEADER_4}
          title="More info (optional)"
          description="We’re also working to solve this problem at scale. Can you give us the name and contact info of the person at your facility responsible for procuring supplies?"
        />
        <InputText label="Name" value={this.state.name} />
        <InputText label="Email or phone number" value={this.state.phone} />
        <TextArea label="Is there anything else you’d like others to know about the situation at your facility?" />
      </Form>
    );
  }
}

export default DropSiteForm;
