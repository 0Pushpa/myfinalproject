import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Home from "../../assets/images/slider/1.png";
import data from "../../carousel.json";
import { Link } from "react-router-dom";
// import SidebarMain from "../frontend/SidebarMain";
export class Carousel extends Component {
  render() {
    return (
      <div>
        <section id="home" className="slider_area">
          <div
            id="carouselThree"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselThree"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#carouselThree" data-slide-to="1"></li>
              <li data-target="#carouselThree" data-slide-to="2"></li>
            </ol>

            <div className="carousel-inner" id="carousel-all">
              <AliceCarousel autoPlay autoPlayInterval="3000">
                {data.map((da) => {
                  return (
                    <div className="carousel-item active" id="main-carousel">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="slider-content">
                              <h1 className="title">{da.title}</h1>
                              <p className="text">
                                We blend insights and strategy to create digital
                                products for forward-thinking organisations.
                              </p>
                              <ul className="slider-btn rounded-buttons">
                                <Link
                                  to={
                                    localStorage.getItem("user-token")
                                      ? "/slate"
                                      : "signup"
                                  }
                                >
                                  <div>
                                    <li>
                                      <span className="main-btn rounded-one">
                                        GET STARTED
                                      </span>
                                    </li>
                                  </div>
                                </Link>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="slider-image-box d-none d-lg-flex align-items-end">
                        <div className="slider-image">
                          <img src={Home} alt="Hero" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </AliceCarousel>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Carousel;
