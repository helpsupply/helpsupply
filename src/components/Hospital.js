import React from "react";
import * as hospital_index from "../data/hospital_index";
import * as needTypes from "../data/needTypes";
import { withRouter } from "react-router-dom";
import LinksResult from "./LinksResult";

class Hospital extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkSubmitTextValue: "",
      linkSubmitValue: "",
      needs: [],
      links: [],
      confirmation: false,
      lastLinkSubmitted: ""
    };
    this.handleLinkSubmitChange = this.handleLinkSubmitChange.bind(this);
    this.handleLinkSubmitTextChange = this.handleLinkSubmitTextChange.bind(
      this
    );

    this.handleLinkSubmit = this.handleLinkSubmit.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.approvePost = this.approvePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  handleLinkSubmitChange(event) {
    this.setState({ linkSubmitValue: event.target.value });
  }

  handleLinkSubmitTextChange(event) {
    this.setState({ linkSubmitTextValue: event.target.value });
  }

  handleLinkSubmit(event) {
    event.preventDefault();
    if (
      this.state.linkSubmitValue !== "" &&
      this.state.linkSubmitTextValue !== ""
    ) {
      console.log("Submitting..." + this.state.linkSubmitValue);
      this.writeUserData("documents", {
        kind: "link",
        location_id: "330101",
        text: this.state.linkSubmitTextValue,
        url: this.state.linkSubmitValue,
        published: false
      });
    } else {
      this.setState({
        error: "You're missing a required field."
      });
    }
  }

  getUserData = () => {
    let db = this.props.db;

    db.collection("need")
      .where("location_id", "==", this.props.match.params.id)
      .get()
      .then(snapshot => {
        let data = snapshot.docs.map(d => {
          var dict = d.data();
          dict["id"] = d.id;
          return dict;
        });
        this.setState({ needs: data });
      })
      .catch(console.log);
    if (this.props.userData.role === "mod") {
      db.collection("documents")
        .where("location_id", "==", this.props.match.params.id)
        .get()
        .then(snapshot => {
          let data = snapshot.docs.map(d => {
            var dict = d.data();
            dict["id"] = d.id;
            return dict;
          });
          this.setState({ links: data });
        })
        .catch(console.log);
    } else {
      db.collection("documents")
        .where("location_id", "==", this.props.match.params.id)
        .where("published", "==", true)
        .get()
        .then(snapshot => {
          let data = snapshot.docs.map(d => {
            var dict = d.data();
            dict["id"] = d.id;
            return dict;
          });
          this.setState({ links: data });
        })
        .catch(console.log);
    }
  };

  writeUserData = (collection, data, title) => {
    let my = this;
    let db = this.props.db;

    if (title) {
      db.collection(collection)
        .doc(title)
        .set(data)
        .then(function() {
          console.log("Document successfully written!");
          my.getUserData();
          my.setState({
            linkSubmitTextValue: "",
            linkSubmitValue: "",
            confirmation: true,
            lastLinkSubmitted: data.text,
            error: ""
          });
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    } else {
      db.collection(collection)
        .add(data)
        .then(function() {
          console.log("Document successfully written!");
          my.getUserData();
          my.setState({
            linkSubmitTextValue: "",
            linkSubmitValue: "",
            confirmation: true,
            lastLinkSubmitted: data.text,
            error: ""
          });
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  };

  approvePost = (collection, id) => {
    let my = this;
    let db = this.props.db;
    db.collection(collection)
      .doc(id)
      .set(
        {
          published: true
        },
        { merge: true }
      )
      .then(function() {
        console.log("Post approved!");
        my.getUserData();
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  deletePost = (collection, id) => {
    let my = this;
    let db = this.props.db;
    db.collection(collection)
      .doc(id)
      .delete()
      .then(function() {
        console.log("Post deleted!");
        my.getUserData();
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  handleChange(event) {}

  handleSubmit(event) {}

  componentDidUpdate() {}

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps) {
    //update data if user role has switched
    if (prevProps.userData.role != this.props.userData.role) {
      this.getUserData();
    }
  }

  render() {
    const hospital = hospital_index.index.id_index[this.props.match.params.id];

    return (
      <div className="">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1" id="hospitalname">
            <b>{hospital.name}</b> in {hospital.city}
          </span>
          <a href="#" className="navbar-brand mb-0 h1 logored">
            hospital.community
          </a>
        </nav>
        <div className="content">
          <div className="panelFull">
            <span className="group">
              {needTypes.documentTypes.map((documentType, i) => {
                return (
                  <div key={i}>
                    <h3>{documentType.name}</h3>
                    <ul className="list-group linksList">
                      {this.state.links.map(link => {
                        if (link.kind === documentType.id) {
                          return (
                            <LinksResult
                              key={link.id}
                              id={link.id}
                              url={link.url}
                              text={link.text}
                              published={link.published}
                              mod={this.props.userData.role === "mod"}
                              approvePost={this.approvePost}
                              deletePost={this.deletePost}
                            />
                          );
                        } else {
                          return "";
                        }
                      })}
                    </ul>
                    <div className="linkSubmissionContainer">
                      <form
                        className="linkSubmitGroup"
                        onSubmit={this.handleLinkSubmit}
                      >
                        <div className="submitLink">Have something to add?</div>
                        <input
                          className="linkTitle form-control"
                          id="linkTitle"
                          placeholder="i.e. Google Spreadsheet for Equipment"
                          value={this.state.linkSubmitTextValue}
                          onChange={this.handleLinkSubmitTextChange}
                        />
                        <input
                          className="linkSubmit form-control"
                          id="linkSubmit"
                          placeholder="https://..."
                          value={this.state.linkSubmitValue}
                          onChange={this.handleLinkSubmitChange}
                        />
                        <button
                          className="btn btn-primary linkSubmitBtn"
                          onClick={this.handleLinkSubmit}
                        >
                          Submit
                        </button>
                      </form>
                      {this.state.confirmation ? (
                        <div id="confirmationText" class="confirmationText">
                          {this.state.lastLinkSubmitted} submitted for review
                          (we'll be quick)!
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.error ? (
                        <div class="errorText">{this.state.error}</div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
            </span>
          </div>
          <div className="panel">
            <h3>Needs</h3>
            <span className="group" id="needslist">
              {needTypes.needTypes.map((needType, i) => {
                return (
                  <div key={i}>
                    <h3 className="group-label">{needType.name}</h3>
                    <ul className="list-group">
                      {this.state.needs.map((need, i) => {
                        if (need.kind === needType.id) {
                          return (
                            <li className="list-group-item needoffer" key={i}>
                              <div>
                                <b>{need.subject}</b>
                              </div>
                              <div>{need.comments}</div>
                            </li>
                          );
                        } else {
                          return "";
                        }
                      })}
                    </ul>
                    {/*<button className="addbutton btn btn-secondary" onClick="">
                      Add
                    </button>*/}
                  </div>
                );
              })}
            </span>
          </div>
          <div className="panel">
            <h3>Offers for Help</h3>
            <span className="group">
              {needTypes.offerTypes.map((offerType, i) => {
                return (
                  <div key={i}>
                    <h3 className="group-label">{offerType.name}</h3>
                    <ul className="list-group"></ul>
                    {/*<button className="addbutton btn btn-secondary">Add</button>*/}
                  </div>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Hospital);
