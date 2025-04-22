import React from "react";
import DateFormatter from "../../../../../../utils/DateFormatter";
// import DateFormatter from "utils/DateFormatter";

const SentMessage = (props) => {
  const sentRef = React.useRef();

  return (
    <div
      className="d-flex justify-content-end sent-msg"
      style={{ marginBottom: "1.6rem" }}
      key={props.i}
    >
      <div className="msg_cotainer_send" ref={sentRef}>
        {props.message.message}
        <span className="msg_time_send">
          {DateFormatter(props.message.sent_at)}
        </span>
      </div>
    </div>
  );
};

export default SentMessage;
