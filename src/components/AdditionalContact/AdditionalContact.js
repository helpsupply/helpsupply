/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import { ReactComponent as Plus } from 'static/icons/plus-circle.svg';

import styles from './AdditionalContact.styles';

export const AdditionalContact = ({ cta, onClick, open, title }) => (
  <Fragment>
    {open && (
      <div css={styles.openContainer}>
        <Text type={TEXT_TYPE.HEADER_4}>{title}</Text>
      </div>
    )}

    {!open && (
      <Text
        onClick={(e) => {
          e.preventDefault();
          onClick(true);
        }}
        as="button"
        type={TEXT_TYPE.BODY_2}
        css={styles.closedButton}
      >
        <Plus css={styles.icon} />
        <div>{cta}</div>
      </Text>
    )}
  </Fragment>
);

AdditionalContact.propTypes = {
  cta: PropTypes.string,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};

export default AdditionalContact;
