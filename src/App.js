import React from 'react';
import { Global } from '@emotion/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { useEffect } from 'react';

import { Routes } from 'lib/constants/routes';

import { StateProvider } from 'state/StateProvider';
import { useAuth } from 'hooks/useAuth';

import EntryPortal from 'pages/entry';
import Facility from 'pages/facility';
import SignUp from 'pages/signup';
import SignUpWelcome from 'pages/signup_welcome';
import Login from 'pages/login';
import LoginApprove from 'pages/login_approve';
import Logout from 'components/Logout';
import SignUpConfirmation from 'pages/signup_confirmation';
import SignupApprove from 'pages/signup_approve';
import Contact from 'pages/contact';
import ContactConfirmation from 'pages/contact_confirmation';
import ServiceLocation from 'pages/service_location';
import ServiceLocationUpdate from 'pages/service_location_update';
import ServiceLocationAvailable from 'pages/service_location_available';
import ServiceLocationUnavailable from 'pages/service_location_unavailable';
import EmailListConfirmation from 'pages/email_list_confirmation';
import ServiceType from 'pages/service_type';
import ServicePayment from 'pages/service_payment';
import ServiceGrocery from 'pages/service_grocery';
import ServiceChildcare from 'pages/service_childcare';
import ServicePetcare from 'pages/service_petcare';
import ServiceEmotional from 'pages/service_emotional';
import ServiceAdditionalInfo from 'pages/service_additional_info';
import LearnMore from 'pages/learn_more';
import Privacy from 'pages/privacy';
import Dashboard from 'pages/dashboard';
import ServiceConfirmation from 'pages/service_confirmation';
import ServiceReview from 'pages/service_review';
import NoMatch from 'pages/404';

import StyleGuide from 'components/StyleGuide/index';
import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import DebugRequests from 'components/DebugRequests';

import { styles } from './App.styles';
import ErrorProvider from 'state/ErrorProvider';

const ProtectedRoute = ({ children, path }) => {
  const history = useHistory();
  const { isInitializing, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isInitializing) {
      return;
    }

    if (!isInitializing && !isLoggedIn) {
      history.push(Routes.HOME);
    }
  }, [isInitializing, isLoggedIn, history]);

  let content = <Route path={path}>{children}</Route>;
  if (isInitializing) {
    content = (
      <Page hasBackButton={false}>
        <PageLoader />
      </Page>
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
                {process.env.NODE_ENV !== 'production' && (
                  <Route exact path={Routes.STYLE_GUIDE}>
                    <StyleGuide backend={backend} />
                  </Route>
                )}
                {/*End Debug*/}

                <Route exact path={Routes.HOME}>
                  <EntryPortal backend={backend} />
                </Route>
                <Route path={Routes.PRIVACY}>
                  <Privacy backend={backend} />
                </Route>
                <Route backend={backend} exact path={Routes.SERVICE_LOCATION}>
                  <ServiceLocation backend={backend} />
                </Route>
                <Route exact path={Routes.LOGIN_COMPLETE}>
                  <LoginApprove backend={backend} />
                </Route>
                <Route path={Routes.LOGIN}>
                  <Login backend={backend} />
                </Route>
                <Route path={Routes.LOGOUT}>
                  <Logout backend={backend} />
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
                <Route
                  backend={backend}
                  exact
                  path={Routes.SERVICE_LOCATION_UNAVAILABLE_SIGNUP_COMPLETE}
                >
                  <EmailListConfirmation backend={backend} />
                </Route>
                <Route exact path={Routes.FACILITY}>
                  <Facility backend={backend} />
                </Route>
                <Route exact path={Routes.EMAIL_SIGNUP_SENT}>
                  <SignUpConfirmation backend={backend} />
                </Route>
                <Route exact path={Routes.EMAIL_SIGNUP_COMPLETE}>
                  <SignupApprove backend={backend} />
                </Route>
                <Route exact path={Routes.WELCOME}>
                  <SignUpWelcome backend={backend} />
                </Route>
                <Route exact path={Routes.EMAIL_SIGNUP_FORM}>
                  <SignUp backend={backend} />
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
                  path={Routes.SERVICE_PAYMENT}
                >
                  <ServicePayment backend={backend} />
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
                <Route path="*">
                  <NoMatch />
                </Route>
              </Switch>
            </div>
          </ErrorProvider>
        </StateProvider>
      </Router>
    </>
  );
}

export default App;
