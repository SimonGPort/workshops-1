import React, { Component } from "react";

class FamilyMember extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <p>{this.props.quote}</p>
      </div>
    );
  }
}

export default FamilyMember;
