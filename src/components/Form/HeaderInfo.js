/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import styles from './Form.styles.js';

class InfoHeader extends React.Component {
  static propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      as = 'h3',
      description,
      title,
      type = TEXT_TYPE.HEADER_3,
    } = this.props;
    return (
      <div>
        {title && (
          <Text as={as} type={type} css={styles.title}>
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
}

export default InfoHeader;
