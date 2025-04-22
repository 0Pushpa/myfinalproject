import React, { createContext, useEffect, useRef, useState, useContext } from "react";
import { Box, IconButton, SwipeableDrawer } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CallIcon from "@mui/icons-material/Call";
import { FiVideo } from "react-icons/fi";
import { AiOutlineFileText } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsChatSquareDots } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Peer from "simple-peer";
import Page from "../../page";
import Backbutton from "../../elements/BackButton";
import Chat from "./call-interface/chat";
import CallInterface from "./call-interface/CallInterface";
import GroupSideMenu from "./GroupSideMenu";
import FileUploader from "./file-uploader/Files";
import FilesDisplay from "./file-uploader/FilesDisplay";

import {
  IndividualGroupService,
  VerifyUsersAccessibilityService,
} from "../../../services/GroupService";
import {
  DownloadReportFileService,
  GetReportsService,
} from "../../../services/AttendenceService";
import { MainSocketContext } from "../Frontendmain";

export const SocketContext = createContext();

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const NewGroupInterface = () => {
  const params = useParams();
  const query = useQuery();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { socket } = useContext(MainSocketContext);

  const [show, setShow] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [stream, setStream] = useState();
  const [caller, setCaller] = useState();
  const [isCaller, setIsCaller] = useState(false);
  const [group, setGroup] = useState({});
  const [creator, setCreator] = useState({});
  const [usersInCall, setUsersInCall] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showView, setShowView] = useState("chat");
  const [report, setReport] = useState([]);

  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    if (query.get("call")) {
      setOpenCall(true);
    }
  }, [query]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("currentUsers");

    socket.on("all users", ({ users }) => setUsersInCall(users));
    socket.on("call users", (payload) => {
      if (payload.uid !== user.details._id) {
        dispatch({ type: "INCOMING_CALL", payload });
      }
    });
    socket.on("incoming-call", (data) => {
      setCaller(data);
      const joinedUser = data.users.some((u) => u.uid === user.details._id);
      if (data.data.from !== user.details._id && !joinedUser) toggleCallModal();
    });
    socket.on("update members", (payload) => {
      setTotalUsers((prev) => prev + 1);
      setUsers((prev) => [...prev, { _id: payload.uid, name: payload.by }]);
    });
    socket.on("remove members", (payload) => {
      setTotalUsers((prev) => prev - 1);
      setUsers((prev) => prev.filter((user) => user._id !== payload.uid));
    });
  }, [socket, user.details._id]);

  useEffect(() => {
    console.log("👀 Navigated to group ID:", params.id);
    checkAccessAndFetch();
  }, [params]);

  useEffect(() => {
    if (socket && user?.details && params?.id) {
      socket.emit("join room", {
        roomID: params.id,
        uid: user.details._id,
        name: user.details.name,
      });
    }
  }, [socket, user?.details, params?.id]);

  const checkAccessAndFetch = async () => {
    console.log("🔐 Checking access for group:", params.id);
    const res = await VerifyUsersAccessibilityService({
      userId: user?.details?._id,
      groupId: params.id,
    });
    console.log("🛂 Accessibility check result:", res);

    if (res?.status === "success") {
      console.log(" Access granted");
      await getGroupInfo();
    } else {
      console.warn("❌ Access denied. Navigating to 404");
      // navigate("/404");
    }
  };

  const getGroupInfo = async () => {
    console.log("📡 Fetching group info for ID:", params.id);
    setIsLoading(true);
    const res = await IndividualGroupService(params.id);
    console.log("📦 Group info response:", res);
    if (res?.group) {
      setGroup(res.group);
      const members = res.totalUsers
        .filter((u) => u.UserID && u.UserID._id !== res.group.createdBy)
        .map((u) => u.UserID);
      setCreator(
        res.totalUsers.find((u) => u.UserID._id === res.group.createdBy).UserID
      );
      if (res.group.createdBy === user.details._id) {
        setIsAdmin(true);
      }
      setUsers(members);
      setTotalUsers(res.totalUsers.length);
    } else {
      console.log("This is the getgroupn info erooororrr");
      navigate("/404");
    }
    setIsLoading(false);
  };

  const toggleCallModal = async () => {
    setCallModal(true);
    setTimeout(() => setCallModal(false), 100000);
  };

  const setMyStream = async () => {
    if (!socket) return;
  
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(currentStream);
  
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: currentStream,
      });
  
      peer.on("signal", (data) => {
        socket.emit("group-call", {
          groupToCall: params.id,
          from: user.details._id,
          name: user.details.name,
          signalData: data,
        });
      });
  
      peer.on("stream", (remoteStream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = remoteStream;
        }
      });
  
      socket.on("callAccepted", (signal) => {
        peer.signal(signal);
      });
  
      connectionRef.current = peer;
    } catch (err) {
      console.error("🚨 Error accessing media devices:", err);
    }
  };
  
  useEffect(() => {
    if (isCaller) {
      setMyStream();
    }
  }, [isCaller]); // Remove dependency on stream
  

  const startCall = () => setOpenCall(true);
  const toggleCall = () => setOpenCall((prev) => !prev);
  const toggleDrawer = () => setShowDrawer((prev) => !prev);
  const showModal = () => setShow((prev) => !prev);

  const getReports = async () => {
    const res = await GetReportsService(params.id);
    if (res?.status === 200) {
      const data = res?.data?.reports.map((el) => ({ ...el, name: el.file_name }));
      setReport(data);
    }
  };

  const downloadReport = async (name) => {
    await DownloadReportFileService(name);
  };

  useEffect(() => {
    if (showView === "attendance") getReports();
  }, [showView]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        user,
        toggleCall,
        callModal,
        toggleCallModal,
        connectionRef,
        userVideo,
        stream,
        caller,
        isAdmin,
        groupId: params.id,
      }}
    >
      <Page title={`${group.name || ""} | Slate`}>
        <Box className="channel-creation-flex">
          <GroupSideMenu
            fromDrawer={false}
            showModal={showModal}
            users={users}
            group={group}
            creator={creator}
            totalUsers={totalUsers}
            isAdmin={isAdmin}
          />

          <Box className="channel-chat-main" component="div">
            <Box className="channel-right-nav"component="div">
              <Box className="channel-general-nav"component="div">
                <Box className="chat-back-btn">
                  <Backbutton path="slate/groups" />
                </Box>
                {["chat", "file", "attendance"].map((view) => {
                  const icons = {
                    chat: <BsChatSquareDots 
                    style={{
                      marginRight: "5px",
                      fontSize: "14px",
                    }}
                    
                    />, file: <AiOutlineFileText />, attendance: <HiOutlineDocumentReport />,
                  };
                  return (
                    <Box key={view} pl={2} display="flex" alignItems="center">
                      <IconButton
                        sx={{
                          fontSize: "1rem",
                          borderRadius: "15px",
                          padding: "8px 10px",
                          backgroundColor:
                            showView === view ? "rgba(0, 0, 0, 0.04)" : "#edf0f5",
                        }}
                        onClick={() => setShowView(view)}
                      >
                        {icons[view]} {view.charAt(0).toUpperCase() + view.slice(1)}
                      </IconButton>
                    </Box>
                  );
                })}
              </Box>
              {console.log(usersInCall,"usersincalllllllllll")}

              {usersInCall.length > 0 ? (
                <Box component="div" className="channel-videochat-nav" onClick={startCall} display="flex">
                  <span className="channel-videochat-icon">
                    <CallIcon />
                  </span>
                  <h3 className="channel-videochat-text">Join Meeting</h3>
                </Box>
              ) : (
                <Box component="div" className="channel-videochat-nav" display="flex" justifyContent="flex-end">
                  <Box display="flex" onClick={startCall}>
                    <span className="channel-videochat-icon">
                      <FiVideo />
                    </span>
                    <h3 className="channel-videochat-text">Start a meet</h3>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    ml={2}
                    sx={{ color: "#0c8776" }}
                    className="info-drawer"
                    onClick={toggleDrawer}
                    zIndex={2}
                  >
                    <InfoOutlinedIcon />
                  </Box>
                </Box>
              )}
            </Box>

            <Box component="div" className="chat-wrapper">
              {showView === "chat" && <Chat />}
              {showView === "file" && <FileUploader />}
              {showView === "attendance" && (
                <FilesDisplay files={report} from="attendance" downloadFile={downloadReport} />
              )}
            </Box>
          </Box>

          {openCall && <CallInterface show={openCall} toggleCall={toggleCall} />}
        </Box>

        <SwipeableDrawer
          className="custom-drawer"
          anchor="right"
          open={showDrawer}
          sx={{ width: "50%" }}
          onClose={() => setShowDrawer(false)}
          onOpen={() => setShowDrawer(true)}
        >
          <GroupSideMenu
            fromDrawer
            toggleDrawer={toggleDrawer}
            showModal={showModal}
            group={group}
            users={users}
            creator={creator}
            isLoading={isLoading}
            totalUsers={totalUsers}
          />
        </SwipeableDrawer>
      </Page>
    </SocketContext.Provider>
  );
};

export default NewGroupInterface;
