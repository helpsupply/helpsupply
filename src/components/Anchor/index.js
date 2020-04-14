/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as Chevron } from 'static/icons/chevron.svg';
import { styles } from './Anchor.styles';

export const anchorTypes = {
  A: 'A',
  LINK: 'LINK',
};

const anchorTypesMap = {
  [anchorTypes.A]: 'a',
  [anchorTypes.LINK]: Link,
};

const Anchor = ({
  as = anchorTypes.LINK,
  children,
  href,
  iconColor,
  withIcon,
  ...rest
}) => {
  const isLink = as === anchorTypes.LINK;
  const Element = anchorTypesMap[as];

  return (
    <Element
      to={isLink ? href : null}
      href={!isLink ? href : null}
      css={styles.root}
      {...rest}
    >
      {children}
      {withIcon && <Chevron css={styles.chevron} fill={iconColor} />}
    </Element>
  );
};

Anchor.propTypes = {
  href: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  withIcon: PropTypes.bool,
};

export default Anchor;
