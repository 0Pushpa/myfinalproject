import React, { useContext, useEffect, useState, useRef } from "react";
import { BsFillMicFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaVideo } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import "../../../../../assets/css/chat.css";
import DrawApp from "../drawing_board/DrawBoard";
import { SocketContext } from "../NewGroupInterface";
import Chat from "./Chat/Chat";
import Participants from "./Participants/Participants";
import Video from "./Video/Video";
import Peer from "simple-peer";
import VideoCall from "../../../../application/socket/SocketContext";
const CallInterface = ({ show, myVideo, settingStream, userVideo }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBoardOpen, setShowBoard] = useState(false);
  const [isVideoOpen, setVideoOpen] = useState(false);
  // const [operations, setOperations] = useState([]);

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

  const endCall = () => {
    context.socket.emit("user-leave", { groupId: params.id });
    context.toggleCall();
    context.connectionRef.current.destroy();
  };

  const openVideo = () => {
    setVideoOpen(!isVideoOpen);
  };

  const params = useParams();

  const [participants, setParticipants] = useState([]);

  context.socket.on("currentUsers", (data) => {
    setParticipants(data);
  });

  useEffect(() => {
    if (
      context.caller &&
      context.caller.data.from !== context.user.details._id
    ) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: context.stream,
      });

      peer.on("signal", (data) => {
        context.socket.emit("answerCall", { signal: data });
      });

      peer.on("stream", (currentStream) => {
        console.log(currentStream);
        console.log(userVideo);
        // userVideo.current.srcObject = currentStream;
      });

      peer.signal(context.caller.signal);

      context.connectionRef.current = peer;
    }
  }, [context.caller]);

  useEffect(() => {
    context.socket.emit("user-joined", {
      userName:
        context.user && context.user.details && context.user.details.name,
      userId: context.user && context.user.details && context.user.details._id,
      video: true,
      audio: true,
      groupId: params.id,
    });
  }, [context.socket, context.user, params]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((currentStream) => {
        // setStream(currentStream);
        // myVideo.current.srcObject = currentStream;
        settingStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    // socket.on("me", (id) => setMe(id));

    // socket.on("callUser", ({ from, name: callerName, signal }) => {
    //   setCall({ isReceivingCall: true, from, name: callerName, signal });
    // });
  }, [myVideo]);

  context.socket.on("board-opened", () => {
    setShowBoard(true);
  });

  return (
    <div className={`call__interface ${show && "show"}`} id="call__interface">
      {!isBoardOpen ? (
        <>
          <div className="call__component">
            <div className="call__section">
              <Participants users={participants} isVideoOpen={isVideoOpen}>
                <video
                  ref={myVideo}
                  style={{ width: "100%" }}
                  playsInline
                  muted
                  autoPlay
                  className="user__video"
                />
                <video
                  ref={userVideo}
                  style={{ width: "100%" }}
                  playsInline
                  muted
                  autoPlay
                  className="user__video__2"
                />
              </Participants>

              <div className="call__button__wrapper">
                <ul>
                  <li>
                    <div
                      className={`call__actions__icons small ${
                        isBoardOpen && "active"
                      }`}
                      onClick={showBoard}
                    >
                      <FaChalkboardTeacher />
                    </div>
                  </li>
                  <li>
                    <div className="call__actions__icons small">
                      <BsFillMicFill />
                    </div>
                  </li>
                  <li>
                    <div
                      className="call__actions__icons large "
                      onClick={endCall}
                    >
                      <MdCallEnd />
                    </div>
                  </li>
                  <li>
                    <div
                      className="call__actions__icons small"
                      onClick={openVideo}
                    >
                      <FaVideo />
                    </div>
                  </li>
                  <li>
                    <div
                      className={`call__actions__icons small ${
                        isChatOpen && "active"
                      }`}
                      onClick={openChat}
                    >
                      <SiGooglemessages />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/*Chat section */}
          {isChatOpen && <Chat />}
        </>
      ) : (
        <DrawApp context={context} />
      )}
    </div>
  );
};

export default CallInterface;
