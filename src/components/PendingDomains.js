import React from "react";


class PendingDomains extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDomain: '',
      domains: [],
      notificationsEnabled: "Notification" in window && Notification.permission == 'granted',
    };
    this.addDomain = this.addDomain.bind(this);
    this.handleApproveDomain = this.handleApproveDomain.bind(this);
    this.handleDenyDomain = this.handleDenyDomain.bind(this);
    this.handleNewDomainChange = this.handleNewDomainChange.bind(this);
    this.getDomainsCallback = this.getDomainsCallback.bind(this);
    this.enableNotifications = this.enableNotifications.bind(this);
  }

  handleApproveDomain(domain) {
    this.props.backend.setDomainIsValid(domain, true).catch((e) => alert(e));
  }

  handleDenyDomain(domain) {
    this.props.backend.setDomainIsValid(domain, false).catch((e) => alert(e));
  }

  addDomain(event) {
    event.preventDefault()
    this.props.backend.setDomainIsValid(this.state.newDomain, true).then(() =>
      alert("added " + this.state.newDomain) 
    ).catch((e) => alert(e));
  }

  handleNewDomainChange(event) {
    this.setState({ newDomain: event.target.value });
  }

  enableNotifications(event) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    else if (Notification.permission === "granted") {
      var notification = new Notification("Hi! We'll notify when new domains are added!");
      this.setState({notificationsEnabled: true});
    }
  
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          var notification = new Notification("Hi! We'll notify when new domains are added!");
          this.setState({notificationsEnabled: true});
        }
      });
    }
  }

  getDomainsCallback(data) {
    console.log(data)
    this.setState(
      {
        domains: data
      },
    );
  }

  componentDidUpdate() {}

  componentDidMount() {
    this.props.backend.getDomains(true, this.getDomainsCallback)
  }

  render() {
    return (
      <div>
        <div className="panelFull">
          <h3 className="logored">Pending Domains</h3>
          <table className="table table-striped staffTable table-bordered">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.domains.map((domain, i) => {
                return (
                  <tr key={i}>
                    <th>{domain}</th>
                    <th>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.handleApproveDomain(domain);
                        }}
                      >
                        Approve
                        </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.handleDenyDomain(domain);
                        }}
                      >
                        Deny
                        </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <form className="form-inline" onSubmit={this.addDomain}>
            <div className="form-group mb-2">
              <label htmlFor="staticEmail2" className="sr-only">Add a domain</label>
              <input
                className="form-control"
                id="domainName"
                placeholder="Add a domain"
                value={this.state.newDomain}
                onChange={this.handleNewDomainChange}
              />
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <label htmlFor="inputPassword2" className="sr-only">Submit</label>
              <button
                className="btn btn-primary linkSubmitBtn"
                onClick={this.addDomain}
              >
               Add 
              </button>&nbsp;
            </div>
          </form>
              {!this.state.notificationsEnabled ?
              <button
                className="btn btn-primary linkSubmitBtn"
                onClick={this.enableNotifications}
              >
               Enable Notifications 
              </button>
              :''}
        </div>
      </div>
    );
  }
}

export default PendingDomains;