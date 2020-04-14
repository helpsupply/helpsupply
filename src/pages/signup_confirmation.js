/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import Page from 'components/layouts/Page';
import HeaderInfo from 'components/Form/HeaderInfo';

function SignUpConfirmation({ backend }) {
  const { t } = useTranslation();

  const email = backend.getEmailForSignIn()
    ? `**${backend.getEmailForSignIn()}**`
    : t('request.workEmailForm.sent.emailDefault');

  return (
    <Page>
      <HeaderInfo
        title={t('request.workEmailForm.sent.title')}
        description={
          <ReactMarkdown
            source={t('request.workEmailForm.sent.description', {
              email,
            })}
          />
        }
      />
    </Page>
  );
}

export default SignUpConfirmation;
