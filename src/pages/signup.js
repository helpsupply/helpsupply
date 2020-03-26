/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { withRouter } from "react-router-dom";
import Box from "components/Box";
import EmailForm from "containers/EmailForm";
import BackButton from "components/BackButton";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box>
        <BackButton />
        <EmailForm {...this.props} />
      </Box>
    );
  }
}

export default withRouter(SignUp);
