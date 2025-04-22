// Video.jsx
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledVideo = styled.video`
  width: 100%;
  height: 50vh;
  object-fit: contain;
  transform: scaleX(-1);
`;

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    if (!peer) return;

    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });

    return () => {
      peer.removeAllListeners("stream");
    };
  }, [peer]);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

export default Video;
