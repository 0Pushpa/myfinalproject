import React, { Component } from "react";
import Logo from "../../assets/logo/logo.png";
import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiTwitterLine,
} from "react-icons/ri";

export class Footer extends Component {
  render() {
    return (
      <div>
        <section className="footer-area footer-dark">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="footer-logo text-center">
                  <span className="mt-30">
                    <img
                      src={Logo}
                      alt="Logo"
                      style={{ filter: "invert(152%)" }}
                    />
                  </span>
                </div>
                <ul className="social text-center mt-60">
                  <li>
                    <a href="https://facebook.com/">
                      <RiFacebookCircleLine />
                    </a>
                  </li>

                  <li>
                    <a href="https://instagram.com/">
                      <RiInstagramLine />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/">
                      <RiTwitterLine />
                    </a>
                  </li>
                </ul>
                <div className="footer-support text-center">
                  <span className="number">+977-9841647064</span>
                  <span className="mail">slate@gmail.com</span>
                </div>
                <div className="copyright text-center mt-35">
                  <p className="text">
                    Designed by <span> Team Slate</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Footer;
