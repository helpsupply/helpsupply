/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { withRouter } from "react-router-dom";
import Box from "components/Box";
import NewDropSiteForm from "containers/NewDropSiteForm";
import BackButton from "components/BackButton";

class NewDropSite extends React.Component {
  render() {
    return (
      <Box>
        <BackButton />
        <NewDropSiteForm {...this.props} />
      </Box>
    );
  }
}

export default withRouter(NewDropSite);
