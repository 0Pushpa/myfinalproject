import React, { Component } from "react";
import video1 from "./vid/pro.mp4";

class VideoP extends Component {
  render() {
    return (
      <div>
        <video playsinline="" autoplay="true" muted loop>
          <source src={video1} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default VideoP;
