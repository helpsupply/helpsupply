/** @jsx jsx */
import { jsx } from '@emotion/core';

import styles from './PageLoader.styles';

export const PageLoader = ({ passedStyles }) => {
  return (
    <span css={[styles.root, passedStyles]}>
      Page is loading... TODO: add a page loader
    </span>
  );
};

export default PageLoader;
