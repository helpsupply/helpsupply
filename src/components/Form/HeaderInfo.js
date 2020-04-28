/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import styles from './Form.styles.js';

function InfoHeader({
  as = 'h3',
  description,
  textType = TEXT_TYPE.CONTENT_HEADER,
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
        <Text as="div" type={TEXT_TYPE.BODY_2} css={styles.description}>
          {description}
        </Text>
      )}
    </div>
  );
}

InfoHeader.propTypes = {
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default InfoHeader;
