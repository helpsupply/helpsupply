/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import Page from 'components/layouts/Page';
import HeaderInfo from 'components/Form/HeaderInfo';

function SignUp(props) {
  const { t } = useTranslation();

  return (
    <Page hasBackButton={false}>
      <HeaderInfo
        title={t('request.workEmailForm.sent.title')}
        description={t('request.workEmailForm.sent.description')}
      />
    </Page>
  );
}

export default SignUp;
