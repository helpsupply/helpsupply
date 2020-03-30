/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { type } from './constants';

import styles from './Button.styles';

export const PrimaryButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[type.FILL]]} {...rest}>
    {children}
  </button>
);

PrimaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const SecondaryButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[type.OUTLINE]]} {...rest}>
    {children}
  </button>
);

SecondaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const LinkButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[type.LINK]]} {...rest}>
    {children}
  </button>
);

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const IconButton = ({ children, ...rest }) => (
  <button css={styles.root} {...rest}>
    {children}
  </button>
);
