/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import Page from 'components/layouts/Page';
import ConfirmationWrapper from 'components/Confirmation/ConfirmationWrapper';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

function EmailListConfirmation() {
  const { t } = useTranslation();

  return (
    <Page>
      <ConfirmationWrapper noIcon title={t('service.unavailable.sent.title')}>
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          {t('service.unavailable.sent.description')}
        </Text>
      </ConfirmationWrapper>
    </Page>
  );
}

export default EmailListConfirmation;
