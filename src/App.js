import React from 'react';
import { Global } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import { Routes } from 'constants/Routes';

import NewSupplyRequest from 'pages/supplies_new';
import AdminDropSite from 'pages/dropsite_admin';
import ContactDropSite from 'pages/dropsite_contact';
import NewFacility from 'pages/facility_new';
import NewDropSite from 'pages/dropsite_new';
import EntryPortal from 'pages/entry';
import Request from 'pages/request';
import SignUp from 'pages/signup';

import HCPSignupFinish from './components/HCPSignupFinish';
import DropSite from './components/DropSite';
import PendingDomains from './components/PendingDomains';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import StyleGuide from './components/StyleGuide/index';
import Box from './components/Box';

import { styles } from './App.styles';
import { Emails } from 'constants/Emails';

const ProtectedRoute = ({ backend, children, path }) => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [badDomain, setBadDomain] = useState(false);

  const checkVerification = useCallback(() => {
    if (!backend.isLoggedIn() && !backend.authLoaded) {
      window.setTimeout(checkVerification, 100);
      return;
    }
    backend.isValidHealthcareWorker().then((verified) => {
      setLoading(false);
      setVerified(verified);

      if (!verified) {
        setBadDomain(backend.badDomain);
      }
    });
  }, [backend]);

  useEffect(() => {
    checkVerification();
  }, [checkVerification]);

  let content = <Route path={path}>{children}</Route>;
  if (loading) {
    content = (
      <Box>
        <div className="alert alert-warning" role="alert">
          <div className="spinner-border alertSpinner" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="alertText">
            Verifying your credentials (should be a few minutes). You'll be able
            to edit/add once verified.
          </div>
        </div>
      </Box>
    );
  }

  // TODO: check if this accounts for mismatched validation, ie email does not match facility
  if (!verified && badDomain) {
    content = (
      <Box>
        <div className="alert alert-danger" role="alert">
          <div className="alertText">
            Your email doesn't look like it's from a healthcare provider. Please{' '}
            <a
              href={Routes.LOGOUT}
              style={{
                color: '#721c24',
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
            >
              log out
            </a>{' '}
            and try your work email or contact{' '}
            <a href={`mailto:${Emails.HELP}`}>{Emails.HELP}</a>.
          </div>
        </div>
      </Box>
    );
  }

  return content;
};

function App({ backend }) {
  return (
    <>
      <Global styles={styles} />
      <Router>
        <div className="App">
          <Switch>
            <Route path={Routes.LOGIN}>
              <Login />
            </Route>
            <Route path={Routes.LOGOUT}>
              <Logout backend={backend} />
            </Route>
            <ProtectedRoute backend={backend} path={Routes.DROPSITE_CONTACT}>
              <ContactDropSite />
            </ProtectedRoute>
            <Route path={Routes.DROPSITE_NEW_ADMIN}>
              <NewDropSite backend={backend} />
            </Route>
            <ProtectedRoute backend={backend} path={Routes.SUPPLY_NEW_ADMIN}>
              <NewSupplyRequest backend={backend} />
            </ProtectedRoute>
            <Route path={Routes.SIGNUP_FINISH_DROPSITE}>
              <HCPSignupFinish backend={backend} />
            </Route>
            <ProtectedRoute backend={backend} path={Routes.DROPSITE_ADMIN}>
              <AdminDropSite backend={backend} />
            </ProtectedRoute>
            <Route path={Routes.DROPSITE_DETAIL}>
              <DropSite backend={backend} />
            </Route>
            <Route path={Routes.PROFILE}>
              <Profile backend={backend} />
            </Route>
            <Route path={Routes.PENDING_DOMAINS}>
              <PendingDomains backend={backend} />
            </Route>
            <Route exact path={Routes.STYLE_GUIDE}>
              <StyleGuide backend={backend} />
            </Route>
            <Route exact path={Routes.HOME}>
              <EntryPortal backend={backend} />
            </Route>
            <Route path={Routes.REQUEST_SUPPLIES}>
              <Request backend={backend} />
            </Route>
            <Route path={Routes.SIGNUP_DROPSITE}>
              <SignUp backend={backend} />
            </Route>
            <Route path={Routes.NEW_FACILITY}>
              <NewFacility backend={backend} />
            </Route>

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
