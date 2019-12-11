import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {
  render() {
    return (
      <div>
        <h3>Items bought</h3>
        <ul>
          {this.props.itemsBought.map(item => (
            <li>
              <Link to={"/item/" + item.id}>{item.description}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Profile;
