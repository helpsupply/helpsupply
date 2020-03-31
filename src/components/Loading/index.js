/** @jsx jsx */
import { jsx } from '@emotion/core';

import styles from './Loading.styles';

export const Loading = ({ message }) => {
  return (
    <div css={styles.root}>
      <div css={styles.loader} />
      {message}
    </div>
  );
};

export default Loading;
