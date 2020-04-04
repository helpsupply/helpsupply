/** @jsx jsx */
import { jsx } from '@emotion/core';

import { ReactComponent as LoaderIcon } from 'static/icons/loader.svg';

import styles from './Loader.styles';

export const Loader = ({ isPrimaryColor = false, passedStyles }) => {
  const iconColor = isPrimaryColor ? styles.svgPrimary : styles.svg;

  return (
    <span css={[styles.root, passedStyles]}>
      <LoaderIcon css={iconColor} />
    </span>
  );
};

export default Loader;
