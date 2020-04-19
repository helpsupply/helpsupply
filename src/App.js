import React from 'react';
import { Global } from '@emotion/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { Routes } from 'constants/Routes';

import { StateProvider } from 'state/StateProvider';
import { useAuth } from 'hooks/useAuth';

import NewSupplyRequest from 'pages/supplies_new';
import NewSupplyRequestConfirmation from 'pages/supplies_new_confirmation';
import AdminDropSite from 'pages/dropsite_admin';
import ContactDropSite from 'pages/dropsite_contact';
import ContactDropSiteConfirmation from 'pages/dropsite_contact_confirmation';
import NewFacility from 'pages/facility_new';
import FacilityConfirmation from 'pages/facility_confirmation';
import FacilityEdit from 'pages/facility_edit';
import NewDropSite from 'pages/dropsite_new';
import Request from 'pages/request';

// MVP
import EntryPortal from 'pages/entry';
import Facility from 'pages/facility';
import SignUp from 'pages/signup';
import Login from 'pages/login';
import SignUpConfirmation from 'pages/signup_confirmation';
import SignupComplete from 'pages/signup_approve';
import Contact from 'pages/contact';
import ContactConfirmation from 'pages/contact_confirmation';
import ServiceLocation from 'pages/service_location';
import ServiceLocationUpdate from 'pages/service_location_update';
import ServiceLocationAvailable from 'pages/service_location_available';
import ServiceLocationUnavailable from 'pages/service_location_unavailable';
import EmailListConfirmation from 'pages/email_list_confirmation';
import ServiceType from 'pages/service_type';
import ServiceGrocery from 'pages/service_grocery';
import ServiceChildcare from 'pages/service_childcare';
import ServicePetcare from 'pages/service_petcare';
import ServiceEmotional from 'pages/service_emotional';
import ServiceAdditionalInfo from 'pages/service_additional_info';
import LearnMore from 'pages/learn_more';
import Dashboard from 'pages/dashboard';
import ServiceConfirmation from 'pages/service_confirmation';
import ServiceReview from 'pages/service_review';
import NoMatch from 'pages/404';
// End MVP

import HCPSignupFinish from 'components/HCPSignupFinish';
import DropSite from 'components/DropSite';
import PendingDomains from 'components/PendingDomains';
import Logout from 'components/Logout';
import Profile from 'components/Profile';
import StyleGuide from 'components/StyleGuide/index';
import Box from 'components/Box';
import InvalidEmail from 'components/Alert/InvalidEmail';
import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import DebugRequests from 'components/DebugRequests';

import { styles } from './App.styles';
import ErrorProvider from 'state/ErrorProvider';

const ProtectedRoute = ({ backend, children, path }) => {
  const history = useHistory();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [badDomain, setBadDomain] = useState(false);
  const { isInitializing, isLoggedIn } = useAuth();

  const checkValid = useCallback(() => {
    backend.isValidHealthcareWorker().then((verified) => {
      setLoading(false);
      setVerified(verified);

      if (!verified) {
        setBadDomain(backend.badDomain);
      }
    });
  }, [backend]);

  useEffect(() => {
    if (isInitializing) {
      return;
    }

    if (!isInitializing && !isLoggedIn) {
      history.push(Routes.HOME);
      return;
    }

    checkValid();
  }, [isInitializing, isLoggedIn, checkValid, history]);

  let content = <Route path={path}>{children}</Route>;
  if (loading) {
    content = (
      <Page hasBackButton={false}>
        <PageLoader />
      </Page>
    );
  }

  // service/supply TODO: check if this accounts for mismatched validation, ie email does not match facility
  if (!verified && badDomain) {
    content = (
      <Box>
        <InvalidEmail />
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
        <StateProvider>
          <ErrorProvider>
            <div className="App">
              <Switch>
                {/*Debug / Admin Routes*/}
                <Route exact path={Routes.DEBUG_REQUESTS}>
                  <DebugRequests backend={backend} />
                </Route>
                {/*MVP Routes*/}
                <Route exact path={Routes.HOME}>
                  <EntryPortal backend={backend} />
                </Route>
                <Route backend={backend} exact path={Routes.SERVICE_LOCATION}>
                  <ServiceLocation backend={backend} />
                </Route>
                <Route path={Routes.LOGIN}>
                  <Login />
                </Route>
                <Route
                  backend={backend}
                  exact
                  path={Routes.SERVICE_LOCATION_UPDATE}
                >
                  <ServiceLocationUpdate backend={backend} />
                </Route>
                <Route
                  backend={backend}
                  exact
                  path={Routes.SERVICE_LOCATION_AVAILABLE}
                >
                  <ServiceLocationAvailable backend={backend} />
                </Route>
                <Route
                  backend={backend}
                  exact
                  path={Routes.SERVICE_LOCATION_UNAVAILABLE}
                >
                  <ServiceLocationUnavailable backend={backend} />
                </Route>
                <Route backend={backend} exact path={Routes.EMAIL_LIST_SENT}>
                  <EmailListConfirmation backend={backend} />
                </Route>
                <Route exact path={Routes.FACILITY}>
                  <Facility backend={backend} />
                </Route>
                <Route exact path={Routes.EMAIL_SIGNUP_FORM}>
                  <SignUp backend={backend} />
                </Route>
                <Route exact path={Routes.EMAIL_SIGNUP_SENT}>
                  <SignUpConfirmation backend={backend} />
                </Route>
                <Route exact path={Routes.EMAIL_SIGNUP_COMPLETE}>
                  <SignupComplete backend={backend} />
                </Route>
                <ProtectedRoute backend={backend} exact path={Routes.DASHBOARD}>
                  <Dashboard backend={backend} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.CONTACT_FORM}
                >
                  <Contact backend={backend} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.CONTACT_CONFIRMATION}
                >
                  <ContactConfirmation backend={backend} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_TYPE}
                >
                  <ServiceType backend={backend} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_GROCERIES_WHERE}
                >
                  <ServiceGrocery backend={backend} step={1} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_GROCERIES_WHEN}
                >
                  <ServiceGrocery backend={backend} step={2} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_GROCERIES_WHAT}
                >
                  <ServiceGrocery backend={backend} step={3} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_CHILDCARE_WHERE}
                >
                  <ServiceChildcare backend={backend} step={1} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_CHILDCARE_WHEN}
                >
                  <ServiceChildcare backend={backend} step={2} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_CHILDCARE_DETAILS}
                >
                  <ServiceChildcare backend={backend} step={3} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_CHILDCARE_WHAT}
                >
                  <ServiceChildcare backend={backend} step={4} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_PETCARE_WHERE}
                >
                  <ServicePetcare backend={backend} step={1} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_PETCARE_WHEN}
                >
                  <ServicePetcare backend={backend} step={2} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_PETCARE_DETAILS}
                >
                  <ServicePetcare backend={backend} step={3} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_EMOTIONAL_WHEN}
                >
                  <ServiceEmotional backend={backend} step={1} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_EMOTIONAL_WHAT}
                >
                  <ServiceEmotional backend={backend} step={2} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_ADDITIONAL_INFO}
                >
                  <ServiceAdditionalInfo backend={backend} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_REVIEW}
                >
                  <ServiceReview backend={backend} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.SERVICE_CONFIRMATION}
                >
                  <ServiceConfirmation backend={backend} />
                </ProtectedRoute>
                <Route exact path={Routes.FAQ}>
                  <LearnMore backend={backend} />
                </Route>
                {process.env.NODE_ENV !== 'production' && (
                  <Route exact path={Routes.STYLE_GUIDE}>
                    <StyleGuide backend={backend} />
                  </Route>
                )}
                <Route path="*">
                  <NoMatch />
                </Route>
                {/*END MVP Routes*/}
                <Route path={Routes.LOGOUT}>
                  <Logout backend={backend} />
                </Route>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.DROPSITE_CONTACT}
                >
                  <ContactDropSite backend={backend} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  exact
                  path={Routes.DROPSITE_CONTACT_CONFIRMATION}
                >
                  <ContactDropSiteConfirmation backend={backend} />
                </ProtectedRoute>
                <ProtectedRoute
                  backend={backend}
                  path={Routes.DROPSITE_NEW_ADMIN}
                >
                  <NewDropSite backend={backend} />
                </ProtectedRoute>
                <ProtectedRoute
                  exact
                  backend={backend}
                  path={Routes.SUPPLY_NEW_ADMIN}
                >
                  <NewSupplyRequest backend={backend} />
                </ProtectedRoute>
                <ProtectedRoute
                  exact
                  backend={backend}
                  path={Routes.SUPPLY_NEW_ADMIN_CONFIRMATION}
                >
                  <NewSupplyRequestConfirmation backend={backend} />
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
                <Route exact path={Routes.HOME}>
                  <EntryPortal backend={backend} />
                </Route>
                <Route path={Routes.REQUEST_SUPPLIES}>
                  <Request backend={backend} />
                </Route>
                <Route exact path={Routes.SIGNUP_DROPSITE}>
                  <SignUp backend={backend} />
                </Route>
                <Route exact path={Routes.SIGNUP_DROPSITE_CONFIRMATION}>
                  <SignUpConfirmation backend={backend} />
                </Route>
                <Route exact path={Routes.NEW_FACILITY}>
                  <NewFacility backend={backend} />
                </Route>
                <Route exact path={Routes.FACILITY_CONFIRMATION}>
                  <FacilityConfirmation backend={backend} />
                </Route>
                <ProtectedRoute
                  exact
                  path={Routes.FACILITY_EDIT}
                  backend={backend}
                >
                  <FacilityEdit backend={backend} />
                </ProtectedRoute>
              </Switch>
            </div>
          </ErrorProvider>
        </StateProvider>
      </Router>
    </>
  );
}

export default App;
