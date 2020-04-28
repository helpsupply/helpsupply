/** @jsx jsx */
import { jsx } from '@emotion/core';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { ReactComponent as Check } from 'static/icons/green-check.svg';

import styles from './Confirmation.styles.js';

function ConfirmationWrapper({ children, title, noIcon }) {
  return (
    <div css={styles.root}>
      <div css={styles.header}>
        <Text as="h3" type={TEXT_TYPE.CONTENT_HEADER} css={styles.title}>
          {title}
          {!noIcon && <Check css={styles.check} />}
        </Text>
      </div>
      {children}
    </div>
  );
}

export default ConfirmationWrapper;
