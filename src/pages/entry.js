/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from '@emotion/core'
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Color, Space } from 'lib/theme'
import Anchor from 'components/Anchor'
import Box from 'components/Box'
import LargeHeader from 'components/Header/LargeHeader'
import ListLink from 'components/ListLink'
import Text from 'components/Text'
import { TEXT_TYPE } from 'components/Text/constants'
import { textStyles } from 'components/Text/Text.styles'
import Routes from 'constants/routes'

const styles = {
  box: css({
    height: 'auto',
    paddingTop: 0,
  }),
  text: css({
    color: Color.GRAY_75,
  }),
  titleAndText: css({
    margin: `${Space.S50}px 0 ${Space.S20}px 0`,
    paddingRight: '20px',
  }),
  title: css({
    marginBottom: `${Space.S45}px`,
  }),
}

class EntryPortal extends React.Component {
  render() {
    return (
      <Fragment>
        <LargeHeader />
        <Box css={styles.box}>
          <ListLink
            href={Routes.REQUEST}
            title="Need"
            text="Healthcare professionals only"
          />
          <ListLink
            href={Routes.DONATE}
            title="Donate"
            text="Open to the public"
          />
          <div css={styles.titleAndText}>
            <Text css={styles.title} as="h3" type={TEXT_TYPE.HEADER_4}>
              Nurses and doctors need supplies to keep fighting the coronavirus.
              We help them communicate their needs to people who can help.
            </Text>
            <Text css={styles.text} as="p" type={TEXT_TYPE.BODY_2}>
              Our platform gives a real-time view of immediate needs at various
              hospitals. We make the information freely available so anyone can
              help, including organizations who can provide supplies at scale.
            </Text>
          </div>
          <Anchor href={Routes.FAQ} withIcon>
            <Text css={textStyles.BOLD} type={TEXT_TYPE.BODY_2}>
              Learn more
            </Text>
          </Anchor>
        </Box>
      </Fragment>
    )
  }
}

export default withRouter(EntryPortal)
