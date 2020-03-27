/** @jsx jsx */
import { jsx } from '@emotion/core'
import styles from './FacilityConfirmation.styles.js'
import Text from 'components/Text'
import { TEXT_TYPE } from 'components/Text/constants'
import { ReactComponent as Check } from 'static/icons/green-check.svg'

import { Fragment } from 'react'

export const FacilityConfirmation = ({ name, address }) => (
  <Fragment>
    <div css={[styles.header, styles.section]}>
      <Text as="h3" type={TEXT_TYPE.HEADER_3} css={styles.title}>
        We added your facility
      </Text>
      <Check />
    </div>
    <Text as="p" type={TEXT_TYPE.NOTE} css={styles.subtext}>
      New facility
    </Text>
    <Text as="p">{name}</Text>
    <Text as="p">{address}</Text>
  </Fragment>
)

export default FacilityConfirmation
