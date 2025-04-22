import { Box, Typography, IconButton, Button } from "@mui/material";
// import AddButton from "components/elements/AddButton";
import React, {useState} from "react";
import Contactimg1 from "../../../assets/team.png";
// import Room from "../../../application/socket/SocketContext";
import Backbutton from "../../elements/BackButton";
import Showparticipants from "./menu-components/ShowParticipants";
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Skeleton from '@mui/material/Skeleton';

  
import { BiLogOut } from "react-icons/bi";
import { ChatService, GetUsersInGroupService, LeaveGroupService } from "../../../services/GroupService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainSocketContext } from "../Frontendmain";
import AddButton from "../../elements/AddButton";
import ChevronRight from "@mui/icons-material/ChevronRight";
import AddMemberModal from "./group-modal/AddMemberModal";

const GroupSideMenu = ({
  showModal,
  users,
  fromDrawer,
  toggleDrawer,
  group,
  creator,
  isLoading,
  totalUsers,
  isAdmin,
}) => {
  const history = useNavigate();
  const params = useParams();
  const user = useSelector((state) => state.user);
  const context = React.useContext(MainSocketContext);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const toggleInviteModal = () => setShowInviteModal((prev) => !prev);
  const [groupMembers, setGroupMembers] = useState(users); // default comes from props

  const fetchGroupMembers = async () => {
    const res = await GetUsersInGroupService(group._id);
    setGroupMembers(res.group_users); // This triggers re-render
  };
  
  const leaveGroup = async () => {
    const res = await LeaveGroupService({
      userId: user?.details?._id,
      groupId: params.id,
    });
    console.log(res,"for group leave")
    if (res?.status === 400) {
      const res = await ChatService({
        FromID: user?.details?._id,
        ToID: params.id,
        userName: user?.details?.name,
        message: `${user?.details?.name} have joined the group`,
        messageType: "notification",
        status: true,
      });
      if (res?.status === 200) {
        context.socket.emit("left alert in chat", {
          message: `${user?.details?.name} have left the group`,
          by: user?.details?.name,
          uid: user?.details?._id,
          groupId: params.id,
          sent_at: new Date().toLocaleString(),
          type: "notification",
        });
        history("/slate/groups");
      }
    }
  };
  return (
    <Box component="div" className="channel-creation">
      <Box component="div" className="channel-creation-nav">
        <Box component="div" flex="2">
          {fromDrawer ? (
            <IconButton onClick={toggleDrawer}>
              <ChevronRight />
            </IconButton>
          ) : (
            <Backbutton />
          )}
        </Box>
        <Box display="flex" component="div" flex="2" justifyContent="flex-end">
          {group?.name && fromDrawer ? (
            <IconButton onClick={leaveGroup}>
              <BiLogOut />
            </IconButton>
          ) : (
            group?.name &&
            !isAdmin && (
              <IconButton
                style={{
                  borderRadius: "5px",
                  padding: "8px",
                  paddingRight: "0",
                  float: "right",
                  color: "#de1414",
                  fontSize: "0.82rem",
                }}
                size="sm"
                onClick={leaveGroup}
              >
                <BiLogOut />

                <Box paddingLeft={"4px"}>Leave Group</Box>
              </IconButton>
            )
          )}
        </Box>
      </Box>
      <Box component="div" className="create-channel-group">
        {group?.name ? (
          <img
            alt="cimage"
            src={Contactimg1}
            className="create-channel-group-img"
          />
        ) : (
          <Skeleton variant="rect" width={50} height={50} />
        )}

        <Box style={{ textTransform: "capitalize" }}>
          {group?.name ? (
            <h3 style={{fontWeight:"bold"}}>{group.name}</h3>
          ) : (
            <Skeleton
              style={{ margin: "0px 0px 5px 10px" }}
              variant="rect"
              width={220}
              height={24}
            />
          )}
          {group?.name ? (
            <span>
              {totalUsers} {totalUsers < 2 ? "participant" : "participants"}
            </span>
          ) : (
            <Skeleton
              style={{ marginLeft: "10px" }}
              variant="rect"
              width={220}
              height={18}
            />
          )}
        </Box>
      </Box>
      <Box component="div" className="channel-name-display">
        {/* <Divider /> */}
      <Box display="flex" justifyContent="space-between" paddingTop="10px">
   <Box display="flex" style={{padding:"5px"}} gridGap={8} onClick={toggleInviteModal}>
    <AddButton />
    <Box
      marginTop="-2px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ cursor: "pointer" }}
    >
      <Typography variant="body2">Add Members</Typography>
    </Box>
  </Box>
</Box>

        <AddMemberModal
        open={showInviteModal}
        handleClose={toggleInviteModal}
        groupId={group?._id}
        groupUsers={users}
        onUserAdded={fetchGroupMembers}
      />
        <Showparticipants
          isLoading={isLoading}
          title="Admin"
          users={[creator]}
        />
        <Showparticipants isLoading={isLoading} title="Members" users={users} />
      </Box>
    </Box>
  );
};

export default GroupSideMenu;
