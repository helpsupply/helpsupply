/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import Form from 'components/Form'
import InputText from 'components/InputText'
import InputDropdown from 'components/InputDropdown'
import Anchor from 'components/Anchor'
import Note from 'components/Note'
import states from 'data/states'
import FacilityConfirmation from 'components/FacilityConfirmation'

class FacilityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropSiteId: '',
      fields: {
        dropSiteFacilityName: '',
        dropSiteZip: '',
        dropSiteAddress: '',
        dropSiteCity: '',
        dropSiteState: '',
        dropSiteUrl: '',
      },
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillUpdate(_, nextState) {
    if (!this.state.dropSiteId && nextState.dropSiteId) {
      this.props.backend.getDropSites(nextState.dropSiteId).then((data) => {
        data && this.setState({ fields: data })
      })
    }
  }

  handleFieldChange = (field) => (value) => {
    this.setState({ fields: { ...this.state.fields, [field]: value } })
  }

  handleSubmit() {
    this.props.backend.addNewDropSite(this.state.fields).then((data) => {
      if (!data) {
        return
      }
      this.setState({ dropSiteId: data })
    })
  }

  render() {
    const { dropSiteUrl, ...requiredFields } = this.state.fields

    if (this.state.dropSiteId) {
      const {
        dropSiteFacilityName,
        dropSiteAddress,
        dropSiteCity,
        dropSiteState,
        dropSiteZip,
      } = this.state.fields
      return (
        <Form
          onSubmit={() =>
            this.props.history.push(`/signup/${this.state.dropSiteId}`)
          }>
          <FacilityConfirmation
            name={dropSiteFacilityName}
            address={[
              dropSiteAddress,
              dropSiteCity,
              dropSiteState,
              dropSiteZip,
            ].join(', ')}
          />
        </Form>
      )
    }

    return (
      <Form
        buttonLabel="Submit"
        onSubmit={this.handleSubmit}
        title="Add a new facility"
        disabled={
          !Object.keys(requiredFields).every((key) => !!this.state.fields[key])
        }
        description="Enter some information about your facility.">
        <InputText
          label="Name of the facility"
          value={this.state.dropSiteFacilityName}
          customOnChange={this.handleFieldChange('dropSiteFacilityName')}
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
    )
  }
}

export default FacilityForm
