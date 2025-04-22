import React, { Component } from "react";
import Create from "../../assets/images/portfolio/img1.png";
import Host from "../../assets/images/portfolio/host1.png";
import Share from "../../assets/images/portfolio/share.png";

export class Ourassistance extends Component {
  render() {
    return (
      <div>
        <section id="services" className="features-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-10">
                <div className="section-title text-center pb-10">
                  <h3 className="title">How does Slate work?</h3>
                  <p className="text">Create, Share and Learn</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-7 col-sm-9">
                <div className="single-features mt-40">
                  <div className="create">
                    <div className="features-text">
                      <h4 className="features-title">
                        <a href="https://www.facebook.com">Create</a>
                      </h4>
                    </div>
                    <div className="features-icon">
                      <img className="shape" src={Create} alt="create" />
                    </div>
                    <div className="features-content">
                      <p className="text">
                        Create account and have access to application
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-7 col-sm-9">
                <div className="single-features mt-40">
                  <div className="create">
                    <div className="features-text">
                      <h4 className="features-title">
                        <a href="https://www.facebook.com">Host And Share</a>
                      </h4>
                    </div>
                    <div className="features-icon">
                      <img className="shape" src={Host} alt="create" />
                    </div>
                    <div className="features-content">
                      <p className="text">Create groups and host meetings</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-7 col-sm-9">
                <div className="single-features mt-40">
                  <div className="create">
                    <div className="features-text">
                      <h4 className="features-title">
                        <a href="https://www.facebook.com">Whiteboard</a>
                      </h4>
                    </div>
                    <div className="features-icon">
                      <img className="shape" src={Share} alt="create" />
                    </div>
                    <div className="features-content">
                      <p className="text">Draw and teach in whiteboard</p>
                    </div>
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

export default Ourassistance;
