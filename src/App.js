import React from 'react';
import { Global } from '@emotion/core';
import { styles } from './App.styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HCPSignupFinish from './components/HCPSignupFinish';
import DropSite from './components/DropSite';
import PendingDomains from './components/PendingDomains';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import StyleGuide from './components/StyleGuide/index';

import NewSupplyRequest from 'pages/supplies_new';
import AdminDropSite from 'pages/dropsite_admin';
import NewFacility from 'pages/facility_new';
import NewDropSite from 'pages/dropsite_new';
import EntryPortal from 'pages/entry';
import Request from 'pages/request';
import SignUp from 'pages/signup';

function App({ backend }) {
  return (
    <>
      <Global styles={styles} />
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout backend={backend} />
            </Route>
            <Route path="/dropsite/new/admin/:dropsite?">
              <NewDropSite backend={backend} />
            </Route>
            <Route path="/new/admin/supply/:dropsite?">
              <NewSupplyRequest backend={backend} />
            </Route>
            <Route path="/signupFinish/:dropsite?">
              <HCPSignupFinish backend={backend} />
            </Route>
            <Route path="/dropsite/:id/admin">
              <AdminDropSite backend={backend} />
            </Route>
            <Route path="/dropsite/:id">
              <DropSite backend={backend} />
            </Route>
            <Route path="/profile">
              <Profile backend={backend} />
            </Route>
            <Route path="/pending-domains">
              <PendingDomains backend={backend} />
            </Route>

            <Route exact path="/style-guide">
              <StyleGuide backend={backend} />
            </Route>

            <Route exact path="/">
              <EntryPortal backend={backend} />
            </Route>
            <Route path="/request">
              <Request backend={backend} />
            </Route>
            <Route path="/signup/:dropsite?">
              <SignUp backend={backend} />
            </Route>
            <Route path="/new-facility">
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
