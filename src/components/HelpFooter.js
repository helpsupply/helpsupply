import React from "react";

class HelpFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="helpFooter">
        <div>
          Stuck? <a href="mailto:help@help.supply">help@help.supply</a>
        </div>
      </div>
    );
  }
}

export default HelpFooter;
