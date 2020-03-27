/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import Form from 'components/Form';
import InputText from 'components/InputText';
import InputDropdown from 'components/InputDropdown';
import Anchor from 'components/Anchor';
import Note from 'components/Note';
import states from 'data/states';

class FacilityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropSiteName: '',
      dropSiteZip: '',
      dropSiteAddress: '',
      dropSiteCity: '',
      dropSiteState: '',
      dropSiteUrl: '',
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
    const { dropSiteUrl, ...requiredFields } = this.state;
    return (
      <Form
        buttonLabel="Submit"
        onSubmit={this.handleSubmit}
        title="Add a new facility"
        disabled={
          !Object.keys(requiredFields).every((key) => !!this.state[key])
        }
        description="Enter some information about your facility."
      >
        <InputText
          label="Name of the facility"
          value={this.state.dropSiteName}
          customOnChange={this.handleFieldChange('dropSiteName')}
        />
        <InputText
          label="Zip code"
          value={this.state.dropSiteZip}
          customOnChange={this.handleFieldChange('dropSiteZip')}
        />
        <div css={{ display: 'flex', '> *': { width: '50%' } }}>
          <InputText
            label="City"
            value={this.state.dropSiteCity}
            customOnChange={this.handleFieldChange('dropSiteCity')}
          />
          <InputDropdown
            placeholder="State"
            value={this.state.dropSiteState}
            options={states}
            customOnChange={this.handleFieldChange('dropSiteState')}
          />
        </div>
        <InputText
          label="Full Street Address"
          value={this.state.dropSiteAddress}
          customOnChange={this.handleFieldChange('dropSiteAddress')}
        />
        <InputText
          label="Website URL (optional)"
          value={this.state.dropSiteUrl}
          customOnChange={this.handleFieldChange('dropSiteUrl')}
        />
        <Note>
          If you’re working from a temporary facility, email us at{' '}
          <Anchor href="mailto:help@help.supply">help@help.supply</Anchor>
        </Note>
      </Form>
    );
  }
}

export default FacilityForm;
