import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import EntryPortal from "./components/EntryPortal";
import DropSiteAdmin from "./components/DropSiteAdmin";
import DropSite from "./components/DropSite";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";

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
            <Route path="/dropsite/:id/admin">
              <DropSiteAdmin backend={this.props.backend} />
            </Route>
            <Route path="/dropsite/:id">
              <DropSite backend={this.props.backend} />
            </Route>
            <Route path="/dropsite">
              <EntryPortal />
            </Route>
            <Route exact path="/">
              <EntryPortal firebase={this.props.backend} />}
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
