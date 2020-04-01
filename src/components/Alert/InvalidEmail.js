/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { Emails } from 'constants/Emails';
import { Routes } from 'constants/Routes';

import Anchor, { anchorTypes } from 'components/Anchor';

import Alert from '.';
import styles from './Alert.styles';

export const InvalidEmail = () => {
  const { t } = useTranslation();
  return (
    <Alert>
      {t('login.alert.preLink')}
      <Anchor css={[styles.link, styles.logout]} href={Routes.LOGOUT}>
        {t('login.alert.link')}
      </Anchor>
      {t('login.alert.postLink')}
      <Anchor
        css={styles.link}
        href={`mailto:${Emails.HELP}`}
        as={anchorTypes.A}
      >
        {Emails.HELP}
      </Anchor>
      .
    </Alert>
  );
};

export default InvalidEmail;
