import React, { useState } from "react";
import { Box, Tooltip, Menu, MenuItem, styled } from "@mui/material"; // Updated import for MUI v5
import { BiStats } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Updated hook for React Router v6
import { NavLink } from "react-router-dom";
import gsap from "gsap";

import Navbarimg from "../../../assets/images/portfolio/navimg.jpg";
import logo from "../../../assets/logo/slate.PNG";
import { logoutUser } from "../../../redux/action/Index";

const Sidebar = () => {
  const [slide, setSlide] = useState(false);
  const slider = () => {
    setSlide(!slide);
  };

  const logoRef = React.useRef();

  React.useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      {
        x: -500,
        opacity: 0,
        transition: "0.6s ease-in-out",
      },
      {
        opacity: 1,
        x: -5,
      }
    );
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Updated hook for React Router v6
  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.user.details.role);

  const logout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    navigate("/"); // Updated navigation for React Router v6
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const notification = useSelector((state) => state.notification);

  return (
    <>
      <Box
        className={`frontend-sidebar ${slide ? "hide-sidebar" : ""}`}
        component="div"
      >
        <Box
          className="sidebar"
          component="div"
          width="5.5em"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          bgcolor="background.paper"
        >
          {/* Logo */}
          <Box component="div" className="navbar-icons-wrapper">
            <NavLink to="/slate" exact className="NavLink100">
              <Tooltip title="Slate">
                <Box
                  component="img"
                  src={logo}
                  alt="logo"
                  sx={{
                    width: "40px",
                    height: "40px",
                    margin: "10px 0",
                    objectFit:"contain"
                  }}
                />
              </Tooltip>
            </NavLink>
          </Box>

          {/* Navigation Links */}
          <Box component="ul" sx={{ listStyle: "none", padding: 0, marginTop: 3}}>
            <Box component="li">
              <NavLink
                to="/slate/groups"
                className={({ isActive }) =>
                  isActive ? "active-nav" : "NavLink100"
                }
              >
                <Tooltip title="Groups">
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "2.2em",
                      aspectRatio: "1",
                      fontSize: "1.2rem",
                      color: "#575757",
                      "&:hover": {
                        backgroundColor: "#f1f3f8",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <FiUsers />
                  </Box>
                </Tooltip>
              </NavLink>
            </Box>

            <Box component="li">
              <NavLink
                to="/slate/schedule"
                className={({ isActive }) =>
                  isActive ? "active-nav" : "NavLink100"
                }
              >
                <Tooltip title="Calendar">
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "2.2em",
                      aspectRatio: "1",
                      fontSize: "1.2rem",
                      color: "#575757",
                      "&:hover": {
                        backgroundColor: "#f1f3f8",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <FaRegCalendarAlt />
                  </Box>
                </Tooltip>
              </NavLink>
            </Box>

            <Box component="li">
              <NavLink
                to="/slate/assignment"
                className={({ isActive }) =>
                  isActive ? "active-nav" : "NavLink100"
                }
              >
                <Tooltip title="Assignment">
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "2.2em",
                      aspectRatio: "1",
                      fontSize: "1.2rem",
                      color: "#575757",
                      "&:hover": {
                        backgroundColor: "#f1f3f8",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <BiStats />
                  </Box>
                </Tooltip>
              </NavLink>
            </Box>

            {/* {role !== "admin" && (
              <Box component="li">
                <NavLink
                  to="/slate/notification"
                  className={({ isActive }) =>
                    isActive ? "active-nav" : "NavLink100"
                  }
                >
                  <Tooltip title="Notification">
                    <Box
                      component="span"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "2.2em",
                        aspectRatio: "1",
                        fontSize: "1.3rem",
                        color: "#575757",
                        position: "relative",
                        "&:hover": {
                          backgroundColor: "#f1f3f8",
                          borderRadius: "7px",
                        },
                      }}
                    >
                      Notification Icon
                      <FiUsers />
                      {notification.unreadNotifications > 0 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            backgroundColor: "red",
                            color: "#fff",
                            borderRadius: "50%",
                            width: "16px",
                            height: "16px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "0.7rem",
                          }}
                        >
                          {notification.unreadNotifications}
                        </Box>
                      )}
                    </Box>
                  </Tooltip>
                </NavLink>
              </Box>
            )} */}
          </Box>

          {/* User Profile */}
          <Box
            component="div"
            sx={{
              marginTop: "auto",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <Tooltip title={user?.details?.name}>
              <Box
                component="img"
                src={Navbarimg}
                alt="user"
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  boxShadow: "0 0px 5px 2px rgba(118, 116, 116, 0.15)",
                }}
              />
            </Tooltip>
          </Box>

          {/* Profile Menu */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;