/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { withRouter } from "react-router-dom";
import Box from "components/Box";
import FindFacility from "containers/FindFacility";
import BackButton from "components/BackButton";

class Request extends React.Component {
  render() {
    return (
      <Box>
        <BackButton />
        <FindFacility {...this.props} />
      </Box>
    );
  }
}

export default withRouter(Request);
