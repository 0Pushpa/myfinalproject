import React from "react";
// import Reveal from "react-reveal/Reveal";
import "./InitialPop.css";
// import { Fade } from 'react-awesome-reveal';

class FadeExample extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
        className="floating"
      >
        {/* <Fade effect="fadeInUp"> */}
          <div className="login_text " style={{ marginRight: "20px" }}>
            <button>Login </button>
          </div>
        {/* </Fade> */}
        <div className="t">
          <h1>OR</h1>
        </div>
        {/* <h1>OR,</h1> */}
        {/* <Fade effect="fadeInUp"> */}
          <div className="login_text" style={{ marginLeft: "20px" }}>
            <button>Register </button>
          </div>
        {/* </Fade> */}
      </div>
    );
  }
}

export default FadeExample;