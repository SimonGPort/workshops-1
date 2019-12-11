import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <Link to="/" className="nav-link">
          Go to home
        </Link>
        <div className="nav-right">
          <Link to="/sell" className="nav-link">
            Sell
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          <Link to="/cart" className="cart">
            <img src="/cart.svg" />
            <span>{this.props.cartSize}</span>
          </Link>
        </div>
      </div>
    );
  }
}
export default Navbar;
