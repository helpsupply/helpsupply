/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import styles from './Form.styles.js';

function InfoHeader({
  as = 'h3',
  description,
  textType = TEXT_TYPE.HEADER_3,
  title,
}) {
  return (
    <div>
      {title && (
        <Text as={as} type={textType} css={styles.title}>
          {title}
        </Text>
      )}
      {description && (
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          {description}
        </Text>
      )}
    </div>
  );
}

InfoHeader.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default InfoHeader;
