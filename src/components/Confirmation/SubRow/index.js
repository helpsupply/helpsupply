/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { SecondaryButton } from 'components/Button';
import Note from 'components/Note';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { styles } from './SubRow.styles';

export const SubRow = ({ details, editLabel, onClick, label }) => (
  <Fragment>
    <div>
      <div css={styles.subRow}>
        <Note>{label}</Note>
        <div>
          <SecondaryButton onClick={onClick}>
            <Text type={TEXT_TYPE.NOTE}>{editLabel}</Text>
          </SecondaryButton>
        </div>
      </div>
    </div>
    {details}
  </Fragment>
);

SubRow.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default SubRow;
