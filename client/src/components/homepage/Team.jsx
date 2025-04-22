import React, { Component } from "react";
import Team222 from "../../assets/images/team-2222.jpg";

export class Team extends Component {
  render() {
    return (
      <div>
        <section id="team" className="team-area pt-120 pb-130">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-10">
                <div className="section-title text-center pb-30">
                  <h3 className="title">Meet The Team</h3>
                  <p className="text">
                    Stop wasting time and money designing and managing a website
                    that doesn’t get results. Happiness guaranteed!
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-sm-6">
                <div
                  className="team-style-eleven text-center mt-30 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <div className="team-image">
                    <img src={Team222} alt="Team" />
                  </div>
                  <div className="team-content">
                    <div className="team-social">
                      <ul className="social">
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-facebook-filled"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-twitter-original"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-linkedin-original"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h4 className="team-name">
                      <a href="https://www.facebook.com">Aman Maharjan</a>
                    </h4>
                    <span className="sub-title">Junior Developer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div
                  className="team-style-eleven text-center mt-30 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <div className="team-image">
                    <img src={Team222} alt="Team" />
                  </div>
                  <div className="team-content">
                    <div className="team-social">
                      <ul className="social">
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-facebook-filled"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-twitter-original"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-linkedin-original"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h4 className="team-name">
                      <a href="https://www.facebook.com">Pushpa Pandey</a>
                    </h4>
                    <span className="sub-title">Very Full Stack Developer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div
                  className="team-style-eleven text-center mt-30 wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <div className="team-image">
                    <img src={Team222} alt="Team" />
                  </div>
                  <div className="team-content">
                    <div className="team-social">
                      <ul className="social">
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-facebook-filled"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-twitter-original"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-linkedin-original"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="lni lni-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h4 className="team-name">
                      <a href="https://www.facebook.com">Upu Adhikari</a>
                    </h4>
                    <span className="sub-title">Great UI Designer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Team;
