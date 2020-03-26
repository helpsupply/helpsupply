/** @jsx jsx */
import { jsx } from '@emotion/core'
import Text from 'components/Text'
import { TEXT_TYPE } from 'components/Text/constants'
import styles from './Header.styles'
import { ReactComponent as Plus } from 'static/icons/plus.svg'

export const Header = () => (
  <div css={styles.root}>
    <div css={styles.plus}>
      <Plus />
    </div>
    <Text css={styles.header} as="h1" type={TEXT_TYPE.HEADER_3}>
      Help Supply
    </Text>
  </div>
)

export default Header
