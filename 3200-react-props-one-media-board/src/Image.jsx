import React, { Component } from "react";

class Image extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.caption}</h3>
        <img src={this.props.url} />
      </div>
    );
  }
}

export default Image;
