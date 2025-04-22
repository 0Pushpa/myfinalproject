// Updated Room.jsx
import React, { useEffect, useRef, useState, useContext } from "react";
import Peer from "simple-peer";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { SocketContext } from "../NewGroupInterface";
import Video from "./Video";
import { Box } from "@mui/material";
import { AiOutlineAudioMuted, AiOutlineAudio } from "react-icons/ai";
import { FiVideo, FiVideoOff } from "react-icons/fi";
import Participants from "../call-interface/participants/Participants";
import VideoLoader from "../../../Loader/VideoLoader";

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const StyledVideo = styled.video`
  width: 100%;
  overflow: hidden;
  z-index: 99;
`;

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const [userUpdate, setUserUpdate] = useState([]);
  const socketRef = useRef();
  const peersRef = useRef([]);
  const params = useParams();
  const context = useContext(SocketContext);
  const roomID = params.id;

  const videoConstraints = {
    minAspectRatio: 1.333,
    minFrameRate: 60,
    height: window.innerHeight / 1.8,
    width: window.innerWidth / 2,
  };

  useEffect(() => {
    socketRef.current = context.socket;
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        props.userVideo.current.srcObject = stream;

        socketRef.current.emit("join room", {
          roomID,
          uid: context.user.details._id,
          name: context.user.details.name,
        });

        socketRef.current.on("total users", ({ usersInThisRoom }) => {
          const peers = [];
          usersInThisRoom.forEach((user) => {
            const peer = createPeer(user.socketId, socketRef.current.id, stream);
            peersRef.current.push({ peerID: user.socketId, peer });
            peers.push({ peerID: user.socketId, peer });
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({ peerID: payload.callerID, peer });
          setPeers((prevPeers) => [...prevPeers, { peerID: payload.callerID, peer }]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
        
          if (item && item.peer && !item.peer.destroyed) {
            item.peer.signal(payload.signal);
          } else {
            console.warn("⚠️ Tried signaling a destroyed or missing peer:", payload.id);
          }
        });
        

        socketRef.current.on("user left", (id) => {
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) peerObj.peer.destroy();
          peersRef.current = peersRef.current.filter(p => p.peerID !== id);
          setPeers([...peersRef.current]);
        });

        socketRef.current.on("change", (payload) => setUserUpdate(payload));
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        uid: context.user.details._id,
        name: context.user.details.name,
      });
    });
    peer.on("stream", (remoteStream) => {
      // remote stream is handled in <Video /> component
    });
    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });
    peer.signal(incomingSignal);
    return peer;
  }

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center">
        <VideoLoader />
        <StyledVideo
          muted
          ref={props.userVideo}
          autoPlay
          playsInline
          style={{ height: peers.length > 0 ? "50vh" : "auto", objectFit: "contain" }}
        />
        {!props.videoFlag && <Participants participant={{ userId: context.user.details._id, userName: context.user.details.name }} />}
      </Box>
      {peers.map((peerObj, idx) => (
        <Video key={idx} peer={peerObj.peer} />
      ))}
    </Container>
  );
};

export default Room;