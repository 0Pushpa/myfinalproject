import { RiSendPlaneFill } from "react-icons/ri";
import { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputEmoji from "react-input-emoji";
import { SocketContext } from "../../NewGroupInterface";
import { useParams } from "react-router-dom";
import SentMessage from "./Renderer/SentMessage";
import ReceivedMessage from "./Renderer/ReceivedMessage";
import {
  ChatService,
  GetChatService,
} from "../../../../../services/GroupService";

const Chat = () => {
  const dispatch = useDispatch();
  const context = useContext(SocketContext);
  const params = useParams();

  const [myMessage, setMyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const messages = useSelector((state) => state.messages.messages || []);
  const messagesEndRef = useRef(null);

  const getMessages = async () => {
    if (!context?.user?.details?._id) return; // Wait for user data
    setLoading(true);

    const res = await GetChatService(params.id);
    console.log("📦 Full raw response from API:", res);

    if (Array.isArray(res?.messages)) {
      const data = res.messages.map((el) => ({
        message: el.message,
        by: el.userName,
        uid: el.FromID,
        groupId: el.ToID,
        sent_at: new Date(el.createdAt).toLocaleString(),
        messageType: el.messageType,
        type:
          el.messageType === "notification"
            ? "notification"
            : context?.user?.details?._id === el.FromID
            ? "sent"
            : "received",
      }));

      console.log("🚀 Dispatching messages to Redux:", data);
      dispatch({ type: "GET_MESSAGES", payload: data });
    } else {
      console.warn("❌ Unexpected format. Expected `messages` array.");
    }

    setLoading(false);
  };

  const messageService = async () => {
    const res = await ChatService({
    
      FromID: context?.user?.details._id,
      ToID: params.id,
      userName: context?.user?.details.name,
      message: myMessage,
      messageType: "message",
      status: true,
    });
    console.log(res)

    if (res?.status === "success") {
      
      await getMessages();
      context?.socket?.emit("chat", {
        message: myMessage,
        by: context?.user?.details.name,
        uid: context?.user?.details._id,
        groupId: params.id,
        messageType: "message",
        sent_at: new Date().toLocaleString(),
      });
    }
  };

  const sendMessage = () => {
    if (myMessage.trim()) {
      messageService();
      setMyMessage("");
    }
  };

  useEffect(() => {
    if (context?.user?.details?._id && params.id) {
      getMessages();
    }
  }, [context?.user?.details?._id, params.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const socket = context.socket;
    if (!socket || !params.id || !context.user?.details) return;

    const joinRoom = () => {
      socket.emit("join room", {
        roomID: params.id,
        uid: context.user.details._id,
        name: context.user.details.name,
      });
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.once("connect", joinRoom);
    }

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [context.socket, context.user?.details, params.id]);

  useEffect(() => {
    const socket = context.socket;

    const handleChatSent = (data) => {
      const msg = {
        ...data,
        type:
          data.messageType === "notification"
            ? "notification"
            : context.user.details._id === data.uid
            ? "sent"
            : "received",
      };

      dispatch({ type: "SEND_MESSAGE", payload: msg });
    };

    socket?.on("chat-sent", handleChatSent);
    return () => socket?.off("chat-sent", handleChatSent);
  }, [context.socket, context.user.details._id]);

  useEffect(() => {
    if (myMessage) {
      context.socket.emit("type", {
        msg: myMessage,
        by: context.user?.details?.name,
        uid: context.user?.details?._id,
      });
    }
  }, [myMessage]);

  useEffect(() => {
    const socket = context.socket;
    const handleTyping = (data) => {
      if (data.uid !== context.user.details._id) setTyping(true);
    };
    const handleStopTyping = () => setTyping(false);

    socket?.on("someone-typing", handleTyping);
    socket?.on("stoped-typing", handleStopTyping);

    return () => {
      socket?.off("someone-typing", handleTyping);
      socket?.off("stoped-typing", handleStopTyping);
    };
  }, [context.socket, context.user.details._id]);

  return (
    <div className="chat__section">
      <div className="chat__interface">
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
            <div className="col-md-12 chat">
              <div className="card" style={{ position: "relative" }}>
                <div className="card-body msg_card_body">
                  {!loading &&
                    messages
                      .slice(0)
                      .reverse()
                      .map((message, i) =>
                        message.type === "sent" ? (
                          <SentMessage key={i} i={i} message={message} />
                        ) : message.type === "received" ? (
                          <ReceivedMessage
                            key={i}
                            i={i}
                            messages={messages}
                            message={message}
                          />
                        ) : (
                          <div
                            key={i}
                            className="d-flex justify-content-center"
                            style={{ fontSize: "0.85rem", color: "#575757" }}
                          >
                            {message.message}
                          </div>
                        )
                      )}
                  {typing && <p id="typing">Someone is typing...</p>}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="card-footer">
                <div className="input-group">
                  <InputEmoji
                    value={myMessage}
                    onChange={setMyMessage}
                    cleanOnEnter
                    onEnter={sendMessage}
                    placeholder="Type a message"
                  />
                  <div
                    className="input-group-append"
                    onClick={sendMessage}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="input-group-text send_btn">
                      <RiSendPlaneFill />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
