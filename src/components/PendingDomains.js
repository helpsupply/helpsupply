import React from "react";


class PendingDomains extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDomain: '',
      domains: []
    };
    this.addDomain = this.addDomain.bind(this);
    this.handleApproveDomain = this.handleApproveDomain.bind(this);
    this.handleDenyDomain = this.handleDenyDomain.bind(this);
    this.handleNewDomainChange = this.handleNewDomainChange.bind(this);
    this.getDomainsCallback = this.getDomainsCallback.bind(this);
  }

  handleApproveDomain(domain) {
    this.props.backend.setDomainIsValid(domain, true)
  }

  handleDenyDomain(domain) {
    this.props.backend.setDomainIsValid(domain, false)
  }

  addDomain(event) {
    event.preventDefault()
    this.props.backend.setDomainIsValid(this.state.newDomain, true)
  }

  handleNewDomainChange(event) {
    this.setState({ newDomain: event.target.value });
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
    this.props.backend.getDomains(false, this.getDomainsCallback)
  }

  render() {
    console.log(this.state.domains)
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PendingDomains;