/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { AdditionalFormTitle } from 'components/AdditionalFormTitle';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import { ReactComponent as Plus } from 'static/icons/plus-circle.svg';

import styles from './AdditionalCta.styles';

export const AdditionalCta = ({ cta, onClick, open, title }) => (
  <Fragment>
    {open && <AdditionalFormTitle title={title} />}

    {!open && (
      <Text
        onClick={(e) => {
          e.preventDefault();
          if (onClick) {
            onClick();
          }
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

AdditionalCta.propTypes = {
  cta: PropTypes.string,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};

export default AdditionalCta;
