/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { styles } from './Anchor.styles';
import { ReactComponent as Chevron } from 'static/icons/chevron.svg';
import { Color } from 'lib/theme';

const Anchor = ({ children, withIcon, ...rest }) => (
  <a css={styles.root} {...rest}>
    {children}
    {withIcon && <Chevron css={styles.chevron} fill={Color.CORAL} />}
  </a>
);

Anchor.propTypes = {
  href: PropTypes.string.isRequired,
};

export default Anchor;
