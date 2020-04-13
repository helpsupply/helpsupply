/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { isValidEmail } from 'lib/utils/validations';

import { useAuth } from 'hooks/useAuth';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import Note from 'components/Note';
import Anchor, { anchorTypes } from 'components/Anchor';

function HCPSignupFinish({ backend }) {
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [shouldConfirmEmail, setShouldConfirmEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { id: dropsite } = params;

  const newDropSitePage = routeWithParams(Routes.DROPSITE_NEW_ADMIN, {
    id: dropsite,
  });
  const adminDropSitePage = routeWithParams(Routes.DROPSITE_ADMIN, {
    id: dropsite,
  });
  const newSupplyPage = routeWithParams(Routes.SUPPLY_NEW_ADMIN, {
    id: dropsite,
  });

  const routeToNextPage = useCallback(() => {
    let hasAddress;

    backend
      .getDropSites(dropsite)
      .then((data) => {
        hasAddress = !!data.dropSiteAddress;
        if (!hasAddress) {
          history.push(newDropSitePage);
        }
      })
      .then(() => {
        backend.getRequests(dropsite).then((requests) => {
          if (requests?.length) {
            history.push(adminDropSitePage);
            return;
          }

          history.push(routeWithParams(newSupplyPage));
        });
      });
  }, [
    adminDropSitePage,
    backend,
    dropsite,
    history,
    newDropSitePage,
    newSupplyPage,
  ]);

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
          // supply todo: handle this error
        });
    },
    [backend, shouldConfirmEmail, routeToNextPage],
  );

  useEffect(() => {
    if (submitting) {
      return;
    }

    const emailForSignIn = backend.getEmailForSignIn();
    setShouldConfirmEmail(emailForSignIn === null);

    if (isLoggedIn && dropsite && emailForSignIn === null) {
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
    dropsite,
    handleSubmit,
    isLoggedIn,
    routeToNextPage,
    submitting,
    setSubmitting,
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
    <Page currentProgress={3} totalProgress={5}>
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
    </Page>
  );
}

export default HCPSignupFinish;
