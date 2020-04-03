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

  const { id: dropsite } = params;

  useEffect(() => {
    if (isLoggedIn && dropsite) {
      history.push(
        routeWithParams(Routes.DROPSITE_ADMIN, {
          id: dropsite,
        }),
      );
    }
  }, [isLoggedIn, history, dropsite]);

  const handleSubmit = useCallback(
    ({ email }) => {
      if (backend.authLoaded && backend.isLoggedIn()) {
        history.push(
          routeWithParams(Routes.DROPSITE_ADMIN, {
            id: dropsite,
          }),
        );
      }

      if (!email) {
        return;
      }

      let url = window.location.href;
      let hasAddress;

      backend
        .continueSignup(url, shouldConfirmEmail ? email : null)
        .then(() => {
          backend
            .getDropSites(dropsite)
            .then((data) => {
              hasAddress = !!data.dropSiteAddress;
              if (!hasAddress) {
                history.push(
                  routeWithParams(Routes.DROPSITE_NEW_ADMIN, {
                    id: dropsite,
                  }),
                );
              }
            })
            .then(() => {
              if (!hasAddress) {
                return;
              }
              backend.getRequests(dropsite).then((requests) => {
                if (requests?.length) {
                  history.push(
                    routeWithParams(Routes.DROPSITE_ADMIN, {
                      id: dropsite,
                    }),
                  );
                  return;
                }

                history.push(
                  routeWithParams(Routes.SUPPLY_NEW_ADMIN, {
                    dropsite: dropsite,
                  }),
                );
              });
            });
        })
        .catch((error) => {
          console.error('error', error);
          setIsLoading(false);
          // todo: handle this error
        });
    },
    [backend, shouldConfirmEmail, dropsite, history],
  );

  useEffect(() => {
    const emailForSignIn = backend.getEmailForSignIn();
    setShouldConfirmEmail(emailForSignIn === null);
    if (!shouldConfirmEmail) {
      handleSubmit({ email: emailForSignIn });
      return;
    }
    setIsLoading(false);
  }, [backend, handleSubmit, shouldConfirmEmail]);

  const validate = (val) => {
    if (!isValidEmail(val)) {
      return t('request.workEmailForm.workEmail.validation.label');
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
