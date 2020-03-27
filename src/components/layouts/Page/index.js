/** @jsx jsx */
import { jsx } from '@emotion/core';

import Header from 'components/Header';
import BackButton from 'components/BackButton';

import styles from './Page.styles';

const Page = ({ children, hasBackButton = true, onBackButtonClick }) => (
  <div css={styles.root}>
    <Header />
    {hasBackButton && <BackButton onClick={onBackButtonClick} />}
    <div css={styles.content}>{children}</div>
  </div>
);

export default Page;
