/** @jsx jsx */
import React, { Fragment } from 'react'
import { jsx } from '@emotion/core'
import { withRouter } from 'react-router-dom'
import Box from 'components/Box'
import BackButton from 'components/BackButton'
import FacilityForm from 'containers/FacilityForm'

class NewFacility extends React.Component {
  render() {
    return (
      <Box>
        <Fragment>
          <BackButton />
          <FacilityForm {...this.props} />
        </Fragment>
      </Box>
    )
  }
}

export default withRouter(NewFacility)
