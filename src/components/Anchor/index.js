/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { styles } from './Anchor.styles';
import { ReactComponent as Chevron } from 'static/icons/chevron.svg';

const Anchor = ({ children, iconColor, withIcon, ...rest }) => (
  <a css={styles.root} {...rest}>
    {children}
    {withIcon && <Chevron css={styles.chevron} fill={iconColor} />}
  </a>
);

Anchor.propTypes = {
  href: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  withIcon: PropTypes.bool,
};

export default Anchor;
