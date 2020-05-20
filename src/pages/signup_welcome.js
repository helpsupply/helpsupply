/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Routes } from 'lib/constants/routes';
import { Color, Space } from 'lib/theme';

import Page from 'components/layouts/Page';
import ConfirmationWrapper from 'components/Confirmation/ConfirmationWrapper';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { PrimaryButton } from 'components/Button';

const styles = { color: Color.GRAY_75, marginBottom: Space.S50 };

function LoginWelcome() {
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = () => {
    history.push(Routes.CONTACT_FORM);
  };

  return (
    <Page>
      <ConfirmationWrapper noIcon title={t('welcome.signup.title')}>
        <Text as="p" type={TEXT_TYPE.BODY_2} css={styles}>
          {t('welcome.signup.description')}
        </Text>
        <PrimaryButton onClick={handleSubmit}>
          {t('global.form.submitLabelNext')}
        </PrimaryButton>
      </ConfirmationWrapper>
    </Page>
  );
}

export default LoginWelcome;
