import React from "react";
// import { store } from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/action/Index";
import { Carousel } from "./Carousel";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
// import { Frequentlyasked } from "./Frequentlyasked";
import "./Mainpage.css";
import Ourassistance from "./Ourassistance";
import Team from "./Team";
// import Testimonial from "./Testimonial";

const Mainpage = () => {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    // store.addNotification({
    //   title: "Success",
    //   message: "Logged Out Successfully",
    //   type: "success",
    //   insert: "bottom",
    //   container: "bottom-right",
    //   animationIn: ["animate__animated", "animate__fadeIn"],
    //   animationOut: ["animate__animated", "animate__fadeOut"],
    //   dismiss: {
    //     duration: 3000,
    //     onScreen: true,
    //   },
    // });
    console.log("logged out")
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div className="navbar-main">
        <section className="navbar-area">
          <div className="main-wrapper">
            <div className="row">
              <div className="col-lg-12">
                <nav className="navbar navbar-expand-lg">
                  <div
                    className="collapse navbar-collapse sub-menu-bar"
                    id="navbarTwo"
                  >
                    <ul
                      className="navbar-nav m-auto"
                      style={{ visibility: "hidden" }}
                    >
                      <li className="nav-item active">
                        <a className="page-scroll" href="#home">
                          home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="page-scroll" href="#team">
                          Team
                        </a>
                      </li>
                    </ul>
                  </div>
                  {state && state.details && state.isLoggedIn ? (
                    <div
                      className="navbar-btn d-sm-inline-block"
                      onClick={logout}
                    >
                      <ul>
                        <li>
                          <span className="solid">Logout</span>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link to="/signup">
                      <div className="navbar-btn d-sm-inline-block">
                        <ul>
                          <li>
                            <span className="solid">Sign Up</span>
                          </li>
                        </ul>
                      </div>
                    </Link>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Carousel />
      <Ourassistance />
      {/* <Frequentlyasked /> */}
      {/* <Testimonial /> */}
      {/* <Team /> */}
      {/* <Contact /> */}
      <Footer />
    </div>
  );
};

export default Mainpage;
