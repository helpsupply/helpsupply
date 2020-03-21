import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import EntryPortal from "./components/EntryPortal";
import HCPSignup from "./components/HCPSignup";
import HCPSignupFinish from "./components/HCPSignupFinish";
import DropSiteAdmin from "./components/DropSiteAdmin";
import DropSite from "./components/DropSite";
import PendingDomains from "./components/PendingDomains";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NewDropSite from "./components/NewDropSite";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userData: {}
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/dropsite/new/admin/:dropsite?">
              <NewDropSite backend={this.props.backend} />
            </Route>
            <Route path="/signup/:dropsite?">
              <HCPSignup backend={this.props.backend} />
            </Route>
            <Route path="/signupFinish/:dropsite?">
              <HCPSignupFinish backend={this.props.backend} />
            </Route>

            <Route path="/dropsite/:id/admin">
              <DropSiteAdmin backend={this.props.backend} />
            </Route>
            <Route path="/dropsite/:id">
              <DropSite backend={this.props.backend} />
            </Route>
            <Route path="/dropsite">
              <EntryPortal backend={this.props.backend} />
            </Route>

            <Route path="/profile">
              <Profile backend={this.props.backend} />
            </Route>

            <Route path="/pending-domains">
              <PendingDomains backend={this.props.backend}/>
            </Route>

            <Route exact path="/">
              <EntryPortal backend={this.props.backend} />
            </Route>

            <Route path="*">
              <NoMatch />
            </Route>

            {/* <Route path="/domainValidation"></Route> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
