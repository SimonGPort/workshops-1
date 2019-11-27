import React, { Component } from "react";
class SoundWidget extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.caption}</h3>
        <audio controls>
          <source src={this.props.url} />
        </audio>
      </div>
    );
  }
}
export default SoundWidget;
