/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import styles from './Error.styles';
import Text from 'components/Text';

export const Error = ({ error }) => {
  const { t } = useTranslation();
  return (
    <div css={styles.root}>
      <Text as="div" css={styles.title}>
        {t('global.error.title')}
      </Text>
      <Text as="div" css={styles.text}>
        {error}
      </Text>
    </div>
  );
};

export default Error;
