/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { SecondaryButton } from 'components/Button';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { styles } from './Card.styles';

export const Card = ({ details, editLabel, onClick, label }) => (
  <div css={styles.root}>
    <div>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.label}>
        {label}
      </Text>
      <Text css={styles.details}>{details}</Text>
    </div>
    <SecondaryButton onClick={onClick}>
      <Text type={TEXT_TYPE.NOTE}>{editLabel}</Text>
    </SecondaryButton>
  </div>
);

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Card;
