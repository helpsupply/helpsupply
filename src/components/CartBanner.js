import React from 'react';

class CartBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cartBanner">
        <div className="cartBannerContainer">
          <div className="cartText">
            {this.props.number} package(s) added to your donation.
          </div>
          <button
            type="button"
            onClick={this.props.handleCartScroll}
            className="btn btn-outline-success"
          >
            Review Donation
          </button>
        </div>
      </div>
    );
  }
}

export default CartBanner;
