import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import EntryPortal from "./components/EntryPortal";
import Hospital from "./components/Hospital";
import NoMatch from "./components/NoMatch";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/hospital/:id" component={Hospital}></Route>
          <Route path="/hospital">
            <EntryPortal />
          </Route>
          <Route exact path="/">
            <EntryPortal />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
