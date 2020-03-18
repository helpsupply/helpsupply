import React from "react";

class Hospital extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(event) {}

  handleSubmit(event) {}

  componentDidUpdate() {}

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Hospital ID: {this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default Hospital;
