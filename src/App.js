import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import EntryPortal from "./components/EntryPortal";
import Hospital from "./components/Hospital";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import Firebase from "firebase";
import config from "./components/Firebase/config";

class App extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);
    this.state = {
      user: {},
      userData: {}
    };
  }

  componentDidMount() {
    let my = this;
    Firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("User is signed-in");
        my.setState({
          user: user
        });
        let db = Firebase.firestore();
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            my.setState({ userData: doc.data() });
          })
          .catch(console.log);
      } else {
        console.log("Anonymous user");
        // No user is signed in.
      }
    });
  }

  render() {
    let db = Firebase.firestore();
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/hospital/:id">
              <Hospital
                db={db}
                user={this.state.user}
                userData={this.state.userData}
              />
            </Route>
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
}

export default App;
