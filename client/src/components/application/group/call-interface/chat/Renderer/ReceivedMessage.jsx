import { Avatar } from "@mui/material";
import React from "react";
import DateFormatter from "../../../../../../utils/DateFormatter";
// import DateFormatter from "utils/DateFormatter";

const ReceivedMessage = ({ i, messages, message }) => {
  return (
    <div className="d-flex justify-content-start mb-4 received-msg" key={i}>
      <div className="img_cont_msg">
        {i === messages.length - 1 && (
          <Avatar
            alt={`${message?.by?.split("")[0].toUpperCase()}`}
            src={`/static/images/avatar/${message + 1}.jpg`}
          />
        )}
        {i < messages.length - 1
          ? messages.slice(0).reverse()[i + 1].by !== message.by && (
              <Avatar
                alt={`${message?.by?.split("")[0].toUpperCase()}`}
                src={`/static/images/avatar/${message + 1}.jpg`}
              />
            )
          : ""}
      </div>
      <div className="msg_cotainer">
        {i < messages.length - 1
          ? messages.slice(0).reverse()[i + 1].by !== message.by && (
              <p className="sent__by">{message.by}</p>
            )
          : ""}
        {message.message}
        <span className="msg_time">{DateFormatter(message.sent_at)}</span>
      </div>
    </div>
  );
};

export default ReceivedMessage;
