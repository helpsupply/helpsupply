/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidEmail, isValidZipCode } from 'lib/utils/validations';

import { useAuth } from 'hooks/useAuth';

import PageLoader from 'components/Loader/PageLoader';
import Note from 'components/Note';
import Anchor, { anchorTypes } from 'components/Anchor';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import { ErrorContext } from 'state/ErrorProvider';

function SignupFinish({ backend }) {
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();
  const { errorMsg, setError } = useContext(ErrorContext);

  const [email, setEmail] = useState('');
  const [shouldConfirmEmail, setShouldConfirmEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { zip: zipRulParam, facility: facilityParam } = params;

  useEffect(() => {
    const zip = zipRulParam || backend.getLocalZip();
    const facility = facilityParam || backend.getLocalFacility();

    // if no zip in url and none in localstorage, go to enter your zip form
    if ((!zipRulParam && !backend.getLocalZip()) || !isValidZipCode(zip)) {
      history.push(Routes.SERVICE_LOCATION);
      return;
    }

    const servicesByZip = backend.getServicesForZip(zip);

    // if they somehow get here and there's not services for their zip, send them to unavailable page
    if (!servicesByZip?.length) {
      history.push(Routes.SERVICE_LOCATION_UNAVAILABLE);
      return;
    }

    // if results for zip provided via localstorage or via url param, explicitly store the zip that works
    backend.setLocalZip(zip);
    backend.setLocalFacility(facility);
  }, [backend, facilityParam, history, zipRulParam]);

  const routeToNextPage = useCallback(() => {
    backend
      .getServiceUser()
      .then((user) => {
        // Redirect to the welcome page, which redirect to contact form
        if (!user) {
          history.push(routeWithParams(Routes.WELCOME));
          return;
        }

        // Save zip and facility (in case it was changed)
        const zip = zipRulParam || backend.getLocalZip();
        const facility = facilityParam || backend.getLocalFacility();
        backend.saveServiceUser({ ...user.data, zip, facility }).then(() => {
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
              setError(e.message);
            });
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, [setError, backend, facilityParam, history, zipRulParam]);

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

export default SignupFinish;
