import React from 'react';
import * as hospital_index from '../data/hospital_index';
import { withRouter } from 'react-router-dom';

import { Emails } from 'constants/Emails';
import { Routes } from 'constants/Routes';

import DropSiteNeedGroupAdmin from './DropSiteNeedGroupAdmin';
import NewRequestForm from './NewRequestForm';
import EditDropSiteForm from './EditDropSiteForm';
import HelpFooter from './HelpFooter';

class DropSiteAdmin extends React.Component {
  constructor(props) {
    super(props);
    const { backend, ...rest } = this.props;
    this.state = rest;
    this.handleRemoveRequest = this.handleRemoveRequest.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
  }

  handleNewRequest(requestObj) {
    let oldList = this.state.needs;
    oldList.push(requestObj);
    this.setState({
      needs: oldList,
    });
    window.scrollTo(0, 0);
  }

  handleRemoveRequest(requestId) {
    let oldList = this.state.needs;
    let newList = oldList.filter(function (obj) {
      return obj.id !== requestId;
    });
    this.setState({
      needs: newList,
    });
  }

  handleDeleteSupply(supplyId) {
    this.props.backend.deleteSupply(supplyId);
    let oldList = this.state.supply;
    let newList = oldList.filter(function (obj) {
      return obj.id !== supplyId;
    });
    this.setState({
      supply: newList,
    });
  }

  componentDidUpdate() {}

  render() {
    // this code is for the future when some dropsites may not map to an exisitng hospital in the hospital_index
    let hospital = hospital_index.index.id_index[this.props.match.params.id];
    let hospitalText = '';
    if (typeof hospital === 'undefined') {
      hospitalText = (
        <div className="servingText">
          (serving {this.state.dropSiteHospital})
        </div>
      );
    } else {
      hospitalText = (
        <div className="servingText">(serving {hospital.name})</div>
      );
    }

    return (
      <div className="">
        {this.state.verified === false && this.state.badDomain === false && (
          <div className="alert alert-warning alertFixed" role="alert">
            <div className="spinner-border alertSpinner" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="alertText">
              Verifying your credentials (should be a few minutes). You'll be
              able to edit/add once verified.
            </div>
          </div>
        )}
        {this.state.verified === false && this.state.badDomain === true && (
          <div className="alert alert-danger alertFixed" role="alert">
            <div className="alertText">
              Your email doesn't look like it's from a healthcare provider.
              Please{' '}
              <a
                href={Routes.LOGOUT}
                style={{
                  color: '#721c24',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                log out
              </a>{' '}
              and try your work email or contact{' '}
              <a href={`mailto:${Emails.HELP}`}>{Emails.HELP}</a>.
            </div>
          </div>
        )}
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1" id="hospitalname">
            <div className="dropSiteIdText">
              <b>Drop-off Location: {this.state.dropSiteId}</b>
            </div>{' '}
            {hospitalText}
          </span>
          <a href={Routes.HOME} className="navbar-brand mb-0 h1 logored">
            help.supply
          </a>
        </nav>
        <div className="content">
          <div className="panelFull">
            <div className="hospitalNeedsTopBar">
              <div className="hospitalNeedsLeft">
                <div className="dropSiteTitle">
                  <h3 className="mb-3 dropSiteName">
                    {this.state.dropSiteName}
                  </h3>
                  <span className="servingText">
                    Drop-off Location: {this.state.dropSiteId}
                  </span>
                </div>
                <div className="dropSiteDescription">
                  <p>{this.state.dropSiteDescription}</p>
                  {this.state.dropSitePhone && (
                    <div>
                      <p>
                        <b>Contact:</b> {this.state.dropSitePhone}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="hospitalNeedNewSubmit">
                <div className="helperText">Supplies will be delivered to:</div>
                <div className="addressText">
                  {this.state.dropSiteAddress}
                  <br />
                  {this.state.dropSiteZip}
                </div>
              </div>
            </div>
            <span className="group" id="needslist">
              <DropSiteNeedGroupAdmin
                verified={this.state.verified}
                backend={this.props.backend}
                needs={this.state.needs}
                handleRemoveRequest={this.handleRemoveRequest}
              />
            </span>
          </div>
          <div className="panel">
            <div className="hospitalNeedsTopBarAdmin">
              <div className="hospitalNeedsLeft">
                <h3 className="mb-3">Create New Request</h3>
              </div>
            </div>
            <NewRequestForm
              verified={this.state.verified}
              dropSiteId={this.props.match.params.id}
              backend={this.props.backend}
              handleAddRequest={this.handleAddRequest}
              handleNewRequest={this.handleNewRequest}
            />
          </div>
          <div className="panel">
            <div className="hospitalNeedsTopBarAdmin">
              <div className="hospitalNeedsLeft">
                <h3 className="mb-3">Edit Location Info</h3>
              </div>
            </div>
            <EditDropSiteForm
              verified={this.state.verified}
              dropSiteId={this.props.match.params.id}
              dropSiteName={this.state.dropSiteName}
              dropSiteDescription={this.state.dropSiteDescription}
              dropSiteAddress={this.state.dropSiteAddress}
              dropSiteZip={this.state.dropSiteZip}
              dropSitePhone={this.state.dropSitePhone}
              backend={this.props.backend}
              handleEditDropSite={this.handleEditDropSite}
            />
          </div>
          <div className="panelFull">
            <h4 className="mb-3 dropSiteName">Submitted donations</h4>
            <table className="table table-striped staffTable table-bordered">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Delivery Time</th>
                  <th>Comments</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.supply.map((supply, i) => {
                  return (
                    <tr key={i}>
                      <th>
                        {supply.requestId
                          .substr(supply.requestId.length - 5)
                          .toUpperCase()}
                      </th>
                      <th>{supply.requestTitle}</th>
                      <th>{supply.supplyQuantity}</th>
                      <th>{supply.supplyDeliveryTime}</th>
                      <th>{supply.supplyComments}</th>
                      <th>{supply.supplyPhone}</th>
                      <th>
                        {this.state.verified === true && (
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => {
                              this.handleDeleteSupply(supply.id);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <HelpFooter />
      </div>
    );
  }
}

export default withRouter(DropSiteAdmin);
