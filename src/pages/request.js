/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { withRouter } from 'react-router-dom'
import Box from 'components/Box'
import FindFacility from 'containers/FindFacility'
import BackButton from 'components/BackButton'
import Header from 'components/Header'

class Request extends React.Component {
  render() {
    return (
      <Box>
        <Header />
        <BackButton />
        <FindFacility {...this.props} />
      </Box>
    )
  }
}

export default withRouter(Request)
