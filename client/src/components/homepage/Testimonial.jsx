import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import data from "../../testi.json";
import Author from "../../../src/assets/images/author-1.jpg";

export class Testimonial extends Component {
  render() {
    return (
      <div>
        <section id="testimonial" className="testimonial-area">
          <AliceCarousel autoPlay autoPlayInterval="3000">
            {data.map((da) => {
              return (
                <div className="container">
                  <div className="row justify-content-between">
                    <div className="col-xl-5 col-lg-6">
                      <div className="testimonial-left-content mt-45">
                        <h6 className="sub-title">Testimonials</h6>
                        <h4 className="title">
                          What Clients Says <br /> About Us
                        </h4>
                        <ul className="testimonial-line">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                        <p className="text">
                          Duis et metus et massa tempus lacinia. className
                          aptent taciti sociosqu ad litora torquent per conubia
                          nostra, per inceptos himenaeos. Maecenas ultricies,
                          orci molestie blandit interdum. <br /> <br /> ipsum
                          ante pellentesque nisl, eget mollis turpis quam nec
                          eros. ultricies, orci molestie blandit interdum.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="testimonial-right-content mt-50">
                        <div className="quota">
                          <i className="lni lni-quotation"></i>
                        </div>
                        <div className="testimonial-content-wrapper testimonial-active">
                          <div className="single-testimonial">
                            <div className="testimonial-text">
                              <p className="text">{da.description}</p>
                            </div>
                            <div className="testimonial-author d-sm-flex justify-content-between">
                              <div className="author-info d-flex align-items-center">
                                <div className="author-image">
                                  <img src={Author} alt="author" />
                                </div>
                                <div className="author-name media-body">
                                  <h5 className="name">{da.name}</h5>
                                  <span className="sub-title">
                                    {da.designation}
                                  </span>
                                </div>
                              </div>
                              <div className="author-review">
                                <ul className="star">
                                  <li>
                                    <i className="lni lni-star-filled"></i>
                                  </li>
                                  <li>
                                    <i className="lni lni-star-filled"></i>
                                  </li>
                                  <li>
                                    <i className="lni lni-star-filled"></i>
                                  </li>
                                  <li>
                                    <i className="lni lni-star-filled"></i>
                                  </li>
                                  <li>
                                    <i className="lni lni-star-filled"></i>
                                  </li>
                                </ul>
                                <span className="review">( 7 Reviews )</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </AliceCarousel>
        </section>
      </div>
    );
  }
}

export default Testimonial;
