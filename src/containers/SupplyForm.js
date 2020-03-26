/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import Form from 'components/Form'
import InputText from 'components/InputText'
import InputDropdown from 'components/InputDropdown'
import Note from 'components/Note'

class SupplyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        type: '',
        kind: '',
        quantity: '',
      },
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFieldChange = (field) => (value) => {
    this.setState({ [field]: value })
  }

  handleSubmit() {
    this.props.onSubmit(this.state.fields)
  }

  render() {
    return (
      <Form
        buttonLabel="Submit"
        onSubmit={this.handleSubmit}
        description="You’ll be able to add more requests after submitting this first one."
        title="What supplies do you need most?"
        disabled={
          !Object.keys(this.state.fields).every((key) => !!this.state[key])
        }>
        <InputDropdown
          placeholder="Select type"
          value={this.state.type}
          customOnChange={this.handleFieldChange('type')}
        />
        <InputDropdown
          placeholder="Select kind"
          value={this.state.kind}
          customOnChange={this.handleFieldChange('kind')}
        />
        <InputText
          label="Quantity"
          value={this.state.quantity}
          customOnChange={this.handleFieldChange('quantity')}
        />
        <Note>
          Note: By submitting this request you acknowledge that Help Supply
          assumes no liability for any supplies delivered by donors.
        </Note>
      </Form>
    )
  }
}

export default SupplyForm
