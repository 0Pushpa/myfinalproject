import React, { useEffect } from "react";
import styled from "styled-components";
import { GrCircleAlert } from "react-icons/gr";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
// import ErrorIcon from "@mui-material/icons/Error";
import NotificationCard from "./NotificationCard";
import NotFound from "components/not-found/not-found";
import { Divider } from "@mui/material";

const NotificationWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 15px);
`;
const NotificationCover = styled.div`
  width: 45%;
  height: 100vh;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;
  padding: 10px;
  @media (max-width: 968px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const H3 = styled.h3`
  font-size: 1.3rem;
  padding: 10px;
  font-weight: lighter;
  color: #00aaef;
  border-bottom: 2px solid #7cd2f;
`;
const H2 = styled.h3`
  font-size: 0.9rem;
  font-weight: lighter;
  display: inline-block;
  padding-left: 10px;
`;
const AlertIcon = styled(GrCircleAlert)`
  color: green;
`;
const MainDiv = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: #f1f3f8;
  margin: 5px;
`;
const Buttons = styled(Button)`
  width: 90px;
  height: 30px;
  font-size: 0.8rem;
`;
const Time = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;
const H1 = styled.h3`
  font-size: 0.7rem;
  font-weight: 300;
  color: #a3a3a3;
`;
const Mention = styled.span`
  font-style: italic;
  font-weight: lighter;
  font-size: 0.95rem;
`;

export default function Notification(props) {
  return (
    <div>
      <NotificationWrapper>
        <NotificationCover>
          <H3 component="h3">Notifications</H3>
          <Divider />
          {(!props.data || props.data.length < 1) && (
            <Box textAlign={"center"} color={"#575757"} paddingTop={"10px"}>
              <NotFound item="notifications" />
            </Box>
          )}
          {props.data && props.data.map((d) => <NotificationCard data={d} />)}
        </NotificationCover>
      </NotificationWrapper>
    </div>
  );
}
