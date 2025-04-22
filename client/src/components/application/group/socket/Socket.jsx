import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useParams } from "react-router";
import { apiEndpoint } from "../../../../constant/endpoint";
import { SocketContext } from "../../../application/group/GroupInterface";
import _ from "lodash";

const Box = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Socket = () => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const peersRef = useRef([]);
  const params = useParams();
  const roomID = params.id;

  const context = useContext(SocketContext);

  useEffect(() => {
    let allPeers = [];
    let callers = [];
    socketRef.current = io.connect(apiEndpoint + "/", {
      query: {
        roomName: params.id,
      },
    });
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: false })
      .then((stream) => {
        context.userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", {
          roomID,
          uid: context.user.details._id,
          name: context.user.details.name,
        });
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            if (userID.user !== context.user.details._id) {
              const peer = createPeer(
                userID.socketId,
                socketRef.current.id,
                stream,
                params.id
              );
              const refAlreadyExists = peersRef.current.some(
                (p) => p.peerID === userID.socketId
              );
              if (!refAlreadyExists) {
                peersRef.current.push({
                  peerID: userID.socketId,
                  peer,
                });
              }

              peers.push(peer);
            }
          });
          // console.log("mathi peers", peers);
          // console.log("mathi peersRef", peersRef.current);
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peerAlreadyExist = peersRef.current.some(p => p.peerID === payload.callerID);
          if (!peerAlreadyExist) {
            const peer = addPeer(payload.signal, payload.callerID, stream, params.id);
        
            const newPeer = {
              peerID: payload.callerID,
              peer,
            };
        
            peersRef.current.push(newPeer);
        
            // 🔥 Update state
            setPeers(prev => [...prev, peer]);
          }
        });
        

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream, gid) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    console.log("create ma");

    peer.on("signal", (signal) => {
      // console.log("Sending");
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        gid,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream, gid) {
    console.log("add ma");

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID, gid });
    });

    console.log("incoming", incomingSignal);
    console.log("add called", callerID);

    peer.signal(incomingSignal);
    return peer;
  }

  return (
    <div
      className="video-wrapper"
      style={{
        position: "relative",
        border:"10px solid red",
        gridTemplateColumns:
          peers.length > 0 ? "repeat(2,1fr)" : "repeat(1,1fr)",
      }}
    >
      {console.log("peers---", peers)}
      {/* <div
        className="call__participants__wrapper"
        
      > */}
      <StyledVideo muted ref={context.userVideo} autoPlay playsInline />

      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
      {/* </div> */}
    </div>
  );
};

export default Socket;
