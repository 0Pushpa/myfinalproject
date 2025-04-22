import React from "react";
import Searchbar from "./Searchbar";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { data } from "./ChatData";
import CreateGroup from "./create-group/CreateGroupModal";
import AddButton from "../../elements/AddButton";

export default function GroupList() {
  const [showModal, setShowModal] = React.useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addGroup = () => {};
  return (
    <>
      <div className="channel-creation">
        <div className="chat-listing_h3">
          <div className="chat_listing_flex1">
            <h3>Groups</h3>
          </div>
          <div className="chat_listing_flex2">
            <Searchbar color="#edf0f5" />
          </div>
        </div>
        <div className="last_chat_display">
          <div className="l_chat">
            <div className="l_chat_flex1">
              <h3>Recent Group Chats</h3>
            </div>
            <div className="l_chat_flex2">
              <div className="l_chat_flex2_wrap" style={{ display: "flex" }}>
                <div className="span" onClick={toggleModal}>
                  <AddButton />
                </div>
                <div className="span2">
                  <HiOutlineDotsVertical />
                </div>
              </div>
            </div>
          </div>
          <div className="chat__listing_main">
            {data.map((chat) => {
              return (
                <div className="c_listing_map">
                  <div className="c_listing_map_flex1">
                    <span>
                      <img src={chat.image} alt="people"></img>
                    </span>
                  </div>
                  <div className="c_listing_map_flex2">
                    <h3 className="top_title">{chat.title}</h3>
                  </div>
                  <div className="c_listing_map_flex3">
                    <h3>{chat.time}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <CreateGroup
        show={showModal}
        handleClose={toggleModal}
        addGroup={addGroup}
      />
    </>
  );
}
