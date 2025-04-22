import React, { useState } from "react";
import {
  FiActivity,
  FiFilePlus,
  FiMessageCircle,
  FiUsers,
} from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Updated for React Router v6
import { NavLink } from "react-router-dom";
import Navbarimg from "../../../assets/images/portfolio/navimg.jpg";
import { logoutUser } from "../../../redux/action/Index";
import { Box, Tooltip } from "@mui/material"; // Updated import for MUI v5
import "../FrontendMain.scss"

const SidebarMobile = () => {
  const [slide, setSlide] = useState(false);
  const slider = () => {
    setSlide(!slide);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Updated hook for React Router v6
  const user = useSelector((state) => state.user);

  const logout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    navigate("/"); // Updated navigation for React Router v6
  };

  return (
    <>
     <Box
  className={`frontend-sidebar-mobile ${slide ? "hide-sidebar" : ""}`}
  sx={{
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    bgcolor: "background.paper",
    zIndex: 1000,
    boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)",
  }}
>

        {/* Slider Arrow */}
        <Box
          className="sidebar-slider-arrow"
          onClick={slider}
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: slide ? "-20px" : "10px",
            cursor: "pointer",
            zIndex: 999,
          }}
        >
          {slide ? <RiArrowRightSLine size={24} /> : <RiArrowLeftSLine size={24} />}
        </Box>

        {/* Navigation Menu */}
        <Box
          sx={{
            maxWidth: "80%",
            margin: "0 auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Tooltip title="Activity">
            <NavLink
              to="/slate"
              style={({ isActive }) => ({
                color: isActive ? "#00aaef" : "#575757",
                textDecoration: "none",
                padding: "0.5em 0",
                borderRadius: "7px",
                transition: "background-color 0.3s",
                backgroundColor: isActive ? "#f1f3f8" : "transparent",
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "2.2em",
                  aspectRatio: "1",
                  fontSize: "1.3rem",
                  color: "#575757",
                  "&:hover": {
                    backgroundColor: "#f1f3f8",
                    borderRadius: "7px",
                  },
                }}
              >
                <FiActivity />
              </Box>
            </NavLink>
          </Tooltip>

          <Tooltip title="Files">
            <NavLink
              to="/slate/contacts"
              style={({ isActive }) => ({
                color: isActive ? "#00aaef" : "#575757",
                textDecoration: "none",
                padding: "0.5em 0",
                borderRadius: "7px",
                transition: "background-color 0.3s",
                backgroundColor: isActive ? "#f1f3f8" : "transparent",
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "2.2em",
                  aspectRatio: "1",
                  fontSize: "1.3rem",
                  color: "#575757",
                  "&:hover": {
                    backgroundColor: "#f1f3f8",
                    borderRadius: "7px",
                  },
                }}
              >
                <FiFilePlus />
              </Box>
            </NavLink>
          </Tooltip>

          <Tooltip title="Groups">
            <NavLink
              to="/slate/groups"
              style={({ isActive }) => ({
                color: isActive ? "#00aaef" : "#575757",
                textDecoration: "none",
                padding: "0.5em 0",
                borderRadius: "7px",
                transition: "background-color 0.3s",
                backgroundColor: isActive ? "#f1f3f8" : "transparent",
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "2.2em",
                  aspectRatio: "1",
                  fontSize: "1.3rem",
                  color: "#575757",
                  "&:hover": {
                    backgroundColor: "#f1f3f8",
                    borderRadius: "7px",
                  },
                }}
              >
                <FiUsers />
              </Box>
            </NavLink>
          </Tooltip>

          {/* User Profile and Logout */}
          <Tooltip title={user?.details?.name}>
            <Box
              onClick={logout}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                padding: "0.5em 0",
                borderRadius: "7px",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#f1f3f8",
                },
              }}
            >
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
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default SidebarMobile;