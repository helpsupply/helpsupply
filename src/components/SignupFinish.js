/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidEmail } from 'lib/utils/validations';

import { useAuth } from 'hooks/useAuth';

import PageLoader from 'components/Loader/PageLoader';
import Note from 'components/Note';
import Anchor, { anchorTypes } from 'components/Anchor';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function SignupFinish({ backend }) {
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [shouldConfirmEmail, setShouldConfirmEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const routeToNextPage = useCallback(() => {
    history.push(routeWithParams(Routes.CONTACT_FORM));
  }, [history]);

  const handleSubmit = useCallback(
    ({ email }) => {
      if (!email) {
        return;
      }
      setSubmitting(true);

      let url = window.location.href;

      backend
        .continueSignup(url, shouldConfirmEmail ? email : null)
        .then(() => {
          routeToNextPage();
          setSubmitting(false);
        })
        .catch((error) => {
          console.error('error', error);
          setSubmitting(false);
          setIsLoading(false);
          // todo: handle this error
        });
    },
    [backend, routeToNextPage, shouldConfirmEmail],
  );

  useEffect(() => {
    if (submitting) {
      return;
    }

    const emailForSignIn = backend.getEmailForSignIn();
    setShouldConfirmEmail(emailForSignIn === null);

    if (isLoggedIn && emailForSignIn === null) {
      routeToNextPage();
      setSubmitting(true);
      return;
    }

    if (emailForSignIn === null) {
      setIsLoading(false);
    } else {
      handleSubmit({ email: emailForSignIn });
    }
  }, [
    backend,
    handleSubmit,
    isLoggedIn,
    submitting,
    setSubmitting,
    routeToNextPage,
  ]);

  const validate = (val) => {
    if (!isValidEmail(val)) {
      return t('request.workEmailForm.workEmail.validationLabel');
    }
  };

  const fieldData = [
    {
      customOnChange: setEmail,
      label: t('request.workEmailForm.workEmail.label'),
      name: 'email',
      type: formFieldTypes.INPUT_TEXT,
      validation: { validate },
    },
  ];

  return (
    <Fragment>
      {isLoading && <PageLoader />}
      {!isLoading && (
        <FormBuilder
          defaultValues={{ email: '' }}
          onSubmit={handleSubmit}
          title={t('request.workEmailForm.finish.title')}
          description={t('request.workEmailForm.description')}
          disabled={!isValidEmail(email)}
          isLoading={isLoading}
          fields={fieldData}
        >
          <Note>
            {t('request.workEmailForm.workEmail.disclaimer') + ' '}
            <Anchor href={Routes.HOME} as={anchorTypes.A}>
              {t('request.workEmailForm.learnMore')}
            </Anchor>
          </Note>
        </FormBuilder>
      )}
    </Fragment>
  );
}

export default SignupFinish;
