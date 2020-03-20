import React from "react";

class HospitalNeedGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.needs.map((need, i) => {
          if (need.kind === "equipment_need") {
            return (
              <div key={i} className="card hospitalNeedCard">
                <div className="card-body">
                  <h5 className="card-title">{need.subject}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <b>Qty: </b>
                    {need.qty}
                  </h6>
                  <p className="card-text">{need.comments}</p>
                  <button className="btn btn-primary hospitalNeedsBtn">
                    Contribute
                  </button>
                  <div className="hospitalNeedsLink">
                    <a href="#" className="card-link ml-3">
                      What kinds are accepted?
                    </a>
                  </div>
                </div>
              </div>
            );
          } else {
            return "";
          }
        })}
        {/*<button className="addbutton btn btn-secondary" onClick="">
                      Add
                    </button>*/}
      </div>
    );
  }
}

export default HospitalNeedGroup;
