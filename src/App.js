import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import EntryPortal from "./components/EntryPortal";
import Hospital from "./components/Hospital";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import { FirebaseContext } from "./lib/";

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
            <Route path="/hospital/:id">
              {/* 
              <Hospital
                db={db}
                user={this.state.user}
                userData={this.state.userData}
              />*/}
            </Route>
            <Route path="/hospital">
              <EntryPortal />
            </Route>
            <Route exact path="/">
              <FirebaseContext.Consumer>
                {firebase => <EntryPortal firebase={firebase} />}
              </FirebaseContext.Consumer>
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
