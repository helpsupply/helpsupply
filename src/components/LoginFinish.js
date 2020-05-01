/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, useContext } from 'react';
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
import { ErrorContext } from 'state/ErrorProvider';

function LoginFinish({ backend }) {
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const { t } = useTranslation();
  const { errorMsg, setError } = useContext(ErrorContext);

  const [email, setEmail] = useState('');
  const [shouldConfirmEmail, setShouldConfirmEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const routeToNextPage = useCallback(() => {
    backend
      .getServiceRequests()
      .then((data) => {
        // If there are active request then route to the dashboard
        if (data.length) {
          history.push(routeWithParams(Routes.DASHBOARD));
          return;
        }

        // Otherwise go to create new request flow
        history.push(routeWithParams(Routes.SERVICE_TYPE));
        return;
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
      });
  }, [setError, backend, history]);

  const handleSubmit = useCallback(
    ({ email }) => {
      if (!email) {
        return;
      }
      setSubmitting(true);

      let url = window.location.href;

      backend
        .continueSignin(url, shouldConfirmEmail ? email : null)
        .then(() => {
          routeToNextPage();
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          setIsLoading(false);
          setError(error.message);
        });
    },
    [setError, backend, routeToNextPage, shouldConfirmEmail],
  );

  useEffect(() => {
    if (submitting || !!errorMsg) {
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
    errorMsg,
    handleSubmit,
    isLoggedIn,
    submitting,
    setSubmitting,
    routeToNextPage,
  ]);

  const validate = (val) => {
    if (!isValidEmail(val)) {
      return t('workEmailForm.workEmail.validationLabel');
    }
  };

  const fieldData = [
    {
      customOnChange: setEmail,
      label: t('workEmailForm.workEmail.label'),
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
          title={t('workEmailForm.finish.title')}
          description={t('workEmailForm.description')}
          disabled={!isValidEmail(email)}
          isLoading={isLoading}
          fields={fieldData}
        >
          <Note>
            {t('workEmailForm.workEmail.disclaimer') + ' '}
            <Anchor href={Routes.HOME} as={anchorTypes.A}>
              {t('workEmailForm.learnMore')}
            </Anchor>
          </Note>
        </FormBuilder>
      )}
    </Fragment>
  );
}

export default LoginFinish;
