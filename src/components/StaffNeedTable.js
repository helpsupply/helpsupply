import React from 'react';
import * as needTypes from '../data/needTypes';

class StaffNeedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let index = needTypes.needTypes.findIndex((x) => x.id === this.props.type);
    let fieldsArray = needTypes.needTypes[index].fields;

    return (
      <div>
        <table className="table table-striped staffTable table-bordered">
          <thead>
            <tr>
              {fieldsArray.map((field, i) => {
                return <th key={i}>{field.name}</th>;
              })}
              <th style={{ width: '150px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.needs.map((need, i) => {
              if (need.kind === this.props.type && need.status === 'open') {
                return (
                  <tr key={i}>
                    {fieldsArray.map((field, i) => {
                      return <th key={i}>{need[field.id]}</th>;
                    })}
                    <th style={{ width: '150px' }}>
                      <button className="btn btn-primary hospitalNeedsBtn">
                        Offer to help
                      </button>
                    </th>
                  </tr>
                );
              } else {
                return '';
              }
            })}
            {this.props.needs.map((need, i) => {
              if (need.kind === this.props.type && need.status === 'closed') {
                return (
                  <tr key={i}>
                    {fieldsArray.map((field, i) => {
                      return <th key={i}>{need[field.id]}</th>;
                    })}
                    <th style={{ width: '150px' }}>
                      <button
                        disabled
                        className="btn btn-outline-success noHover"
                      >
                        Fulfilled!
                      </button>
                    </th>
                  </tr>
                );
              } else {
                return '';
              }
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StaffNeedTable;
