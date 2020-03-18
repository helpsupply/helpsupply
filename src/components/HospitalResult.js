import React from "react";

class HospitalResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let selectedClass = "list-group-item result";
    if (this.props.selectedResult) {
      selectedClass = "list-group-item result selected";
    }

    function selectHospital(that) {
      that.props.handleSelectHospital(that.props.id);
    }

    function gotoHospital(that) {
      that.props.handleRedirect();
    }

    return (
      <li
        key={this.props.id}
        className={selectedClass}
        onMouseEnter={() => selectHospital(this)}
        onClick={() => gotoHospital(this)}
      >
        <b>{this.props.hospital.name}</b> in {this.props.hospital.city}
      </li>
    );
  }
}

export default HospitalResult;
