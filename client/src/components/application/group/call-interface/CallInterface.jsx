import React, { useContext, useEffect, useState, useRef } from "react";
import { BsFillMicFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaVideo } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import "../../../../assets/css/chat.css";
import Room from "../socket/Socket1";
import DrawApp from "./drawing_board/DrawBoard";
import { SocketContext } from "../NewGroupInterface";
import { VideoCallContext } from "../VideoContext";
import { useNavigate } from "react-router-dom";
import Chat from "./chat";
import { AiOutlineAudioMuted, AiOutlineAudio } from "react-icons/ai";
import { FiVideo, FiVideoOff } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
// import "../../../application/FrontendMain.scss"

const CallInterface = ({ show, toggleCall }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBoardOpen, setShowBoard] = useState(false);
  // const [operations, setOperations] = useState([]);

  const [audioFlag, setAudioFlag] = useState(true);
  const [videoFlag, setVideoFlag] = useState(true);

  const [screenSharing, setScreenSharing] = useState(false);

  const userVideo = useRef();
  const history = useNavigate();

  const openAudio = () => {
    setAudioFlag(true);
  };
  const closeAudio = () => {
    setAudioFlag(false);
  };

  const openVideo = () => {
    setVideoFlag(true);
  };
  const closeVideo = () => {
    setVideoFlag(false);
  };

  const videoButtonRef = useRef();
  const audioButtonRef = useRef();

  const toggleVideo = () => {
    videoButtonRef.current.click();
  };

  const toggleAudio = () => {
    audioButtonRef.current.click();
  };

  const context = useContext(SocketContext);

  // const dispatch = useDispatch();

  const openChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const showBoard = () => {
    context.socket.emit("open-board", {
      username: context.user.details.name,
    });
    setShowBoard(!isChatOpen);
  };

  const closeBoard = () => {
    context.socket.emit("close-board", {
      username: context.user.details.name,
    });
    setShowBoard(false);
  };

  const endCall = () => {
    context.socket.emit("user-leave");
    context.socket.emit("users in call", {
      groupId: params.id,
    });
    let stream = userVideo.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    userVideo.current.srcObject = null;
    toggleCall();
    history(`/slate/groups/${params.id}`);
  };

  const params = useParams();

  const [participants, setParticipants] = useState([]);

  context.socket.on("currentUsers", (data) => {
    setParticipants(data);
  });

  useEffect(() => {
    context.socket.emit("user-joined", {
      userName:
        context.user && context.user.details && context.user.details.name,
      userId: context.user && context.user.details && context.user.details._id,
      groupId: params.id,
    });
  }, [context.socket, context.user, params]);

  context.socket.on("board-opened", () => {
    setShowBoard(true);
  });

  context.socket.on("board-closed", () => {
    setShowBoard(false);
  });

  // const toggleScreenSharing = () => {
  //   alert(!screenSharing);
  //   setScreenSharing(!screenSharing);
  // };

  return (
    <>
      <div className={`call__interface ${show && "show"}`} id="call__interface">
        <>
          <div className="call__component">
            <Room
              audioFlag={audioFlag}
              videoFlag={videoFlag}
              closeAudio={closeAudio}
              openAudio={openAudio}
              closeVideo={closeVideo}
              openVideo={openVideo}
              videoButtonRef={videoButtonRef}
              audioButtonRef={audioButtonRef}
              userVideo={userVideo}
              isBoardOpen={isBoardOpen}
              screenSharing={screenSharing}
            />

            {isBoardOpen && <DrawApp context={context} />}
            <div className="call__section">
              {/* <Participants
                  users={participants}
                  isVideoOpen={isVideoOpen}
                ></Participants> */}

              <div className="call__button__wrapper">
                <ul>
                  <li>
                    <Tooltip title="White Board">
                      <div
                        className={`call__actions__icons small ${
                          isBoardOpen && "active"
                        }`}
                        onClick={
                          isBoardOpen ? () => closeBoard() : () => showBoard()
                        }
                      >
                        <FaChalkboardTeacher />
                      </div>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip title="Audio">
                      <div
                        onClick={toggleAudio}
                        className="call__actions__icons small"
                      >
                        {audioFlag ? (
                          <AiOutlineAudio />
                        ) : (
                          <AiOutlineAudioMuted />
                        )}
                      </div>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip title="End Call">
                      <div
                        className="call__actions__icons large "
                        onClick={endCall}
                      >
                        <MdCallEnd />
                      </div>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip title="Video">
                      <div
                        className="call__actions__icons small"
                        onClick={toggleVideo}
                      >
                        {videoFlag ? <FiVideo /> : <FiVideoOff />}
                      </div>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip title="Chat">
                      <div
                        className={`call__actions__icons small ${
                          isChatOpen && "active"
                        }`}
                        onClick={openChat}
                      >
                        <SiGooglemessages />
                      </div>
                    </Tooltip>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/*Chat section */}
          {isChatOpen && <Chat />}
        </>
      </div>
    </>
  );
};

export default CallInterface;
