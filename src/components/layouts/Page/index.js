/** @jsx jsx */
import { jsx } from '@emotion/core'

import Header from 'components/Header'
import BackButton from 'components/BackButton'

import styles from './Page.styles'

export const Page = ({ children }) => (
  <div css={styles.root}>
    <Header />
    <BackButton />
    <div css={styles.content}>{children}</div>
  </div>
)

export default Page
