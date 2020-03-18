import React from "react";

class LinksResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    function approvePost(that) {
      that.props.approvePost("documents", that.props.id);
    }

    function deletePost(that) {
      that.props.deletePost("documents", that.props.id);
    }

    let modView;
    if (this.props.mod) {
      modView = (
        <div className="status">
          {this.props.published ? (
            <div>
              <div className="statusPublished">Published</div>
              <div className="modActions">
                <button
                  onClick={() => deletePost(this)}
                  className="modActionBtn"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="statusPending">Pending Review</div>
              <div className="modActions">
                <button
                  onClick={() => approvePost(this)}
                  className="modActionBtn"
                >
                  Approve
                </button>
                <button
                  onClick={() => deletePost(this)}
                  className="modActionBtn"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <li className="linksListItem">
        <div className="linksListLink">
          <a id={this.props.id} href={this.props.url}>
            <b>{this.props.text}</b>
          </a>
        </div>
        {modView}
      </li>
    );
  }
}

export default LinksResult;
