/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { type } from './constants';

import styles from './Button.styles';

export const PrimaryButton = ({ children, isOutline = false, ...rest }) => (
  <button
    css={[styles.root, styles[type.PRIMARY], isOutline && styles[type.OUTLINE]]}
    type="button"
    {...rest}
  >
    {children}
  </button>
);

PrimaryButton.propTypes = {
  isOutline: PropTypes.bool,
  onClick: PropTypes.func,
};

export const SecondaryButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[type.SECONDARY]]} type="button" {...rest}>
    <span css={styles.inner}>{children}</span>
  </button>
);

SecondaryButton.propTypes = {
  onClick: PropTypes.func,
};

export const LinkButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[type.LINK]]} type="button" {...rest}>
    {children}
  </button>
);

LinkButton.propTypes = {
  onClick: PropTypes.func,
};

export const IconButton = ({ children, ...rest }) => (
  <button css={styles.root} type="button" {...rest}>
    {children}
  </button>
);
