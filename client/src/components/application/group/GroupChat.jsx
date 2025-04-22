import React from "react";
import Contactimg1 from "../../../assets/images/portfolio/conatctimg1.jpg";
import { FiVideo } from "react-icons/fi";

const Groupchat = () => {
  return (
    <>
      <div className="channel-chat-main">
        <div className="channel-right-nav">
          <div className="channel-general-nav">
            <span className="c-g-n-imgspan">
              <img alt="cimage" src={Contactimg1} className="c-g-n-img"></img>
            </span>
            <span className="c-g-n-text">
              <ul>
                <li>General</li>
                <li>Posts</li>
                <li>Files</li>
              </ul>
            </span>
          </div>
          <div className="c-g-n-mid"></div>
          <div className="channel-videochat-nav">
            <span className="channel-videochat-icon">
              <FiVideo />
            </span>
            <h3 className="channel-videochat-text">Start a meet</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Groupchat;
