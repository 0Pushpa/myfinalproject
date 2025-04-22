import React, { Component } from "react";
import About from "../../assets/images/portfolio/faq.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import data from "../../faq.json";

export class Frequentlyasked extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [],
    };
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus(index) {
    let data = [];
    this.state.status.map((stat, i) => {
      if (i === index) {
        return data.push(!stat);
      } else {
        return data.push(stat);
      }
    });
    this.setState({
      status: data,
    });
  }
  componentWillMount() {
    for (let i = 0; i < data.length; i++) {
      this.state.status.push(false);
    }
    console.log("status");
    console.log(this.state.status);
  }
  render() {
    return (
      <div>
        <section id="about" className="about-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="faq-content mt-45">
                  <div className="about-title">
                    <h6 className="sub-title">A Little More About Us</h6>
                    <h4 className="title">
                      Frequently Asked Questions <br /> About Our Site
                    </h4>
                  </div>
                  <div className="about-accordion">
                    <div className="accordion" id="accordionExample">
                      {data.map((da, index) => {
                        return (
                          <div className="card">
                            <div className="faq-card">
                              <div className="card-header faq1" id="headingOne">
                                {da.question}
                              </div>
                              <span className="faq2" onClick={this.openFaq}>
                                {this.state.status[index] ? (
                                  <ExpandMoreIcon
                                    onClick={() => this.changeStatus(index)}
                                  />
                                ) : (
                                  <ExpandLessIcon
                                    onClick={() => this.changeStatus(index)}
                                  />
                                )}
                              </span>
                            </div>

                            <div
                              class={
                                this.state.status[index]
                                  ? "showgroup"
                                  : "hidegroup"
                              }
                              id="collapseOne"
                              aria-labelledby="headingOne"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <p className="text">{da.answer}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="about-image faq-image mt-50">
                  <img src={About} alt="about" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Frequentlyasked;
