/** @jsx jsx */
import React, { Fragment } from "react";
import { jsx } from "@emotion/core";
import Form from "components/Form";
import FormGroup from "components/Form/FormGroup";
import InputText from "components/InputText";
import Note from "components/Note";
import Anchor from "components/Anchor";
import Text from "components/Text";
import { TEXT_TYPE } from "components/Text/constants";
import { Space } from "lib/theme";

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      sent: false,
      error: "",
      dropsite: this.props.match.params.dropsite,
    };
    this.submitEmail = this.submitEmail.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  submitEmail(event) {
    event.preventDefault();
    this.props.backend
      .signupWithEmail(this.state.email, this.props.dropsite)
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
        <Fragment>
          <FormGroup mb={Space.S15}>
            <Text as="h3" type={TEXT_TYPE.HEADER_3}>
              Thank you
            </Text>
          </FormGroup>
          <Text as="p" type={TEXT_TYPE.BODY_2}>
            We just sent you an email with a link to verify your email. It
            should arrive within a couple minutes.
          </Text>
        </Fragment>
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
          Note: we will never share your email address with any other parties.{" "}
          <Anchor href="/">Learn more</Anchor>
        </Note>
      </Form>
    );
  }
}

export default EmailForm;
