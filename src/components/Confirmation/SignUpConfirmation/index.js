/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import ConfirmationWrapper from '../ConfirmationWrapper';
import { styles } from './SignUpConfirmation.styles';

export const SignUpConfirmation = ({ email }) => {
  const { t } = useTranslation();

  return (
    <ConfirmationWrapper noIcon title={t('workEmailForm.sent.title')}>
      <Text as="div" type={TEXT_TYPE.BODY_2} css={styles.description}>
        <ReactMarkdown
          source={t('workEmailForm.sent.description', {
            email,
          })}
        />
      </Text>
      <Text as="div" type={TEXT_TYPE.BODY_2} css={styles.description}>
        {t('workEmailForm.sent.note')}
      </Text>
    </ConfirmationWrapper>
  );
};

export default SignUpConfirmation;
