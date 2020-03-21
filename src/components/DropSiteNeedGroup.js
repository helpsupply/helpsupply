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
              dropSiteAddress={this.props.dropSiteAddress}
              dropSiteZip={this.props.dropSiteZip}
              backend={this.props.backend}
              need={need}
              handleRemoveRequest={this.props.handleRemoveRequest}
              handleNewSupply={this.props.handleNewSupply}
            />
          );
        })}
      </div>
    );
  }
}

export default DropSiteNeedGroup;
