/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import Form from 'components/Form';
import FormGroup from 'components/Form/FormGroup';
import InputText from 'components/InputText';
import Note from 'components/Note';
import Anchor from 'components/Anchor';
import HeaderInfo from 'components/Form/HeaderInfo';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      sent: false,
      error: '',
      dropsite: this.props.match.params.dropsite,
    };
    this.submitEmail = this.submitEmail.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  submitEmail(event) {
    event.preventDefault();
    this.props.backend
      .signupWithEmail(this.state.email, this.state.dropsite)
      .then(() => this.setState({ sent: true }))
      .catch(alert);
    // TODO: handle exceptions
  }

  handleEmailChange(value) {
    this.setState({ email: value });
  }

  render() {
    if (this.state.sent) {
      return (
        <HeaderInfo
          title="Thank you"
          description="We just sent you an email with a link to verify your email. It should arrive within a couple minutes."
        />
      );
    }

    return (
      <Form
        onSubmit={this.submitEmail}
        title="Enter your work email address"
        description="We need to verify your email before you request supplies."
        disabled={!this.state.email}
      >
        <FormGroup mb={20}>
          <InputText
            label="Work email"
            customOnChange={this.handleEmailChange}
          />
        </FormGroup>
        <Note>
          Note: we will never share your email address with any other parties.{' '}
          <Anchor href="/">Learn more</Anchor>
        </Note>
      </Form>
    );
  }
}

export default EmailForm;
