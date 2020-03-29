import React from 'react';
import { Global } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Routes } from 'lib/constants';

import NewSupplyRequest from 'pages/supplies_new';
import AdminDropSite from 'pages/dropsite_admin';
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

import { styles } from './App.styles';

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
            <Route path={Routes.DROPSITE_NEW_ADMIN(':dropsite?')}>
              <NewDropSite backend={backend} />
            </Route>
            <Route path={Routes.SUPPLY_NEW_ADMIN(':dropsite?')}>
              <NewSupplyRequest backend={backend} />
            </Route>
            <Route path={Routes.SIGNUP_FINISH_DROPSITE(':dropsite?')}>
              <HCPSignupFinish backend={backend} />
            </Route>
            <Route path={Routes.DROPSITE_ADMIN(':id')}>
              <AdminDropSite backend={backend} />
            </Route>
            <Route path={Routes.DROPSITE_DETAIL(':id')}>
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
            <Route path={Routes.SIGNUP_DROPSITE(':dropsite?')}>
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
