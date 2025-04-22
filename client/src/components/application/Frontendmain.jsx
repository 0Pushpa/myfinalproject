import React, { useLayoutEffect, useEffect, useState } from "react";
import "./FrontendMain.scss";
import Sidebar from "./sidebar/Sidebar";
import SidebarMobile from "./sidebar/SidebarMobile";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { apiEndpoint } from "../../constant/endpoint";
import CallingModal from "../elements/CallingModal";
import gsap from "gsap";
import "../../assets/sass/Slate.scss";
export const MainSocketContext = React.createContext();

const Frontendmain = () => {
  const user = useSelector((state) => state.user);
  const groups = useSelector((state) => state.groups?.data);
  const location = useLocation();
  const dispatch = useDispatch();

  const [callModal, setCallModal] = useState(false);
  const [callInfo, setCallInfo] = useState({});
  const [socket, setSocket] = useState(null);

  // 👇 Socket connection effect
  useEffect(() => {
    if (user?.details?.email) {
      const roomName = window.location.pathname.split("/")[3] || "default-room";
      const email = user.details.email;

      const newSocket = io(apiEndpoint, {
        query: { roomName, email },
        transports: ["websocket"], // Force WebSocket, avoid polling
      });

      newSocket.on("connect", () => {
        console.log(" Socket connected");
        console.log("🔌 Socket ID:", newSocket.id);
      });

      newSocket.on("disconnect", () => {
        console.warn("⚠️ Socket disconnected");
      });

      newSocket.on("connect_error", (err) => {
        console.error("❌ Socket connection error:", err.message);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        console.log("🧹 Socket disconnected on unmount");
      };
    }
  }, [user?.details?.email]);

  // 👇 Handle call event from socket
  useEffect(() => {
    if (!socket) return;

    const handleCallUsers = ({ groupId, uid, name }) => {
      if (!groups) return;
      const isInGroup = groups.some((group) => group?.GroupID?._id === groupId);
      if (isInGroup && user?.details?._id !== uid) {
        setCallModal(true);
        setCallInfo({ groupId, uid, name });

        setTimeout(() => {
          setCallModal(false);
          setCallInfo({});
        }, 30000);
      }
    };

    socket.on("call users", handleCallUsers);

    return () => {
      socket.off("call users", handleCallUsers);
    };
  }, [socket, user?.details?._id, groups]);

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".group-wrapper", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5 });
    return () => tl.kill();
  }, [location]);

  const toggleModal = () => setCallModal((prev) => !prev);

  return (
    <MainSocketContext.Provider value={{ socket }}>
      <div className="frontend-flex">
        <Sidebar />
        <div className="group-wrapper">
          <div className="group-main">
            <React.Suspense fallback={<Loader />}>
              <Outlet />
            </React.Suspense>
          </div>
        </div>

        {window.innerWidth <= 768 &&
          !(location.pathname.split("/")[2] === "groups" && location.pathname.split("/")[3]) && (
            <SidebarMobile />
          )}
      </div>

      {callModal && (
        <CallingModal
          caller={callInfo.name}
          groupId={callInfo.groupId}
          toggleCallModal={toggleModal}
        />
      )}
    </MainSocketContext.Provider>
  );
};

export default Frontendmain;
