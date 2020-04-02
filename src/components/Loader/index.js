/** @jsx jsx */
import { jsx } from '@emotion/core';

import { ReactComponent as LoaderIcon } from 'static/icons/loader.svg';

import styles from './Loader.styles';

export const Loader = ({ passedStyles }) => {
  return (
    <span css={[styles.root, passedStyles]}>
      <LoaderIcon />
    </span>
  );
};

export default Loader;
