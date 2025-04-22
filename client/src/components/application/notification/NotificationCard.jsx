import React, { useEffect } from "react";
import styled from "styled-components";
import { GrCircleAlert } from "react-icons/gr";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
// import ErrorIcon from "@mui-material/icons/Error";
import DateFormatter from "../../../utils/DateFormatter";
import {
  AcceptNotificationsService,
  RejectNotificationsService,
} from "../../../services/NotificationService";
import { MainSocketContext } from "../Frontendmain";
import { ChatService } from "services/GroupService";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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

const ActionMessage = styled.div`
  color: #575757;
  font-size: 0.8rem;
  padding: 5px 0;
  min-width: 200px;
`;

export default function Notification(props) {
  const [decision, setDecision] = React.useState(
    props.data.remark || "pending"
  );

  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const history = useNavigate();

  const context = React.useContext(MainSocketContext);

  const handleButtonClick = async (decision) => {
    setLoading(true);

    let res;
    const data = {
      notificationId: props.data._id,
      userId: props.data.UserID._id,
      groupId: props.data.url.split("/")[3],
    };

    if (decision === "accepted") {
      res = await AcceptNotificationsService(data);
    } else {
      res = await RejectNotificationsService(data);
    }
    if (res?.data?.status === "success") {
      setDecision(decision);

      if (decision === "accepted") {
        setLoading(false);
        const res = await ChatService({
          FromID: props.data.UserID._id,
          ToID: props.data.url.split("/")[3],
          userName: props.data.UserID.name,
          message: `${props.data.UserID.name} have joined the group`,
          messageType: "notification",
          status: true,
        });
        if (res?.status === 200) {
          context.socket.emit("joined alert in chat", {
            message: `${props.data.UserID.name} have joined the group`,
            by: props.data.UserID.name,
            uid: props.data.UserID._id,
            groupId: props.data.url.split("/")[3],
            sent_at: new Date().toLocaleString(),
            messageType: "notification",
          });
          history(props.data.url);
        }
      }
    }
  };
  return (
    <MainDiv component="div">
      <Box component="span" className="notification_svg">
        <AlertIcon />
      </Box>
      <H2>
        <div dangerouslySetInnerHTML={{ __html: props.data.message }}></div>
      </H2>
      {/* <Mention>{props.data.groupname}</Mention> */}
      <Box component="span" paddingLeft={2}>
        {props.data.icon}
      </Box>
      <Stack direction="row" spacing={2} marginLeft={2} marginTop={1}>
        {props.data.type === "confirmation" && decision === "pending" ? (
          <>
            <Buttons
              onClick={() => {
                setActive(0);
                handleButtonClick("accepted");
              }}
              variant="contained"
              style={{ background: "#00aaef" }}
            >
              {active === 0 && loading ? (
                <CircularProgress
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "#fff",
                  }}
                />
              ) : (
                "Accept"
              )}
            </Buttons>

            <Buttons
              variant="outlined"
              color="error"
              onClick={() => {
                setActive(1);
                handleButtonClick("rejected");
              }}
            >
              {active === 1 && loading ? (
                <CircularProgress
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "#fff",
                  }}
                />
              ) : (
                "Reject"
              )}
            </Buttons>
          </>
        ) : (
          <>
            {decision === "accepted" ? (
              <ActionMessage>Invitation Accepted</ActionMessage>
            ) : (
              <ActionMessage>Invitation Rejected</ActionMessage>
            )}
          </>
        )}
        <Time component="div">
          <H1>{DateFormatter(props.data.createdAt)}</H1>
        </Time>
      </Stack>
    </MainDiv>
  );
}
