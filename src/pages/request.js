/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { withRouter } from "react-router-dom";
import Box from "components/Box";
import { IconButton } from "components/Button";
import FindFacility from "containers/FindFacility";
import { ReactComponent as Back } from "static/icons/back-circle.svg";

class Request extends React.Component {
  render() {
    const { authLoaded, dropSiteExists, isLoggedIn, history } = this.props;
    return (
      <Box>
        <IconButton>
          <Back />
        </IconButton>
        <FindFacility
          {...{ authLoaded, isLoggedIn, dropSiteExists, history }}
        />
      </Box>
    );
  }
}

export default withRouter(Request);
