import React from "react";
import DropSiteNeed from "./DropSiteNeed";

class DropSiteNeedGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.needs.map((need, i) => {
          return (
            <DropSiteNeed
              key={i}
              backend={this.props.backend}
              need={need}
              handleRemoveRequest={this.props.handleRemoveRequest}
            />
          );
        })}
      </div>
    );
  }
}

export default DropSiteNeedGroup;
