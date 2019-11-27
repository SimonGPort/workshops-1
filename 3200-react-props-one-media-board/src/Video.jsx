import React, { Component } from "react";

class Video extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.header}</h1>
        <iframe
          src={"https://player.vimeo.com/video/" + this.props.videoId}
          width="640"
          height="360"
          frameBorder="0"
        />
        <h3>{this.props.footer}</h3>
      </div>
    );
  }
}
export default Video;
