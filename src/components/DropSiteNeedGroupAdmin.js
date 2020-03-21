import React from "react";
import DropSiteNeedAdmin from "./DropSiteNeedAdmin";

class DropSiteNeedGroupAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.needs.map((need, i) => {
          return (
            <DropSiteNeedAdmin
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

export default DropSiteNeedGroupAdmin;
