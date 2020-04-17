/** @jsx jsx **/
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import styles from './AdditionalFormTitle.styles';

export const AdditionalFormTitle = ({
  description,
  noBorder = false,
  title,
  secondaryCta,
}) => (
  <div css={[styles.root, noBorder && styles.noBorder]}>
    <div css={styles.titleHolder}>
      <Text type={TEXT_TYPE.HEADER_4}>{title}</Text>
      {secondaryCta}
    </div>
    {description && (
      <Text type={TEXT_TYPE.BODY_2} css={styles.description}>
        {description}
      </Text>
    )}
  </div>
);

AdditionalFormTitle.BottomRule = () => <div css={styles.bottomRule} />;

AdditionalFormTitle.propTypes = {
  description: PropTypes.string,
  noBorder: PropTypes.bool,
  secondaryCta: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  title: PropTypes.string.isRequired,
};

export default AdditionalFormTitle;
