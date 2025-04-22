import React, { createContext, useEffect, useState, useCallback } from "react";
import { Box, Grid } from "@mui/material";
import { HiUserGroup } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Searchbar from "../../elements/Searchbar";
import Page from "../../page";
import GroupCard from "./components/GroupCard";
import CreateGroup from "./group-modal/CreateGroupModal";
import { MainSocketContext } from "../Frontendmain";
import NotFound from "../../not-found/not-found";
import {
  AddGroupService,
  DeleteGroupService,
  GetMyAccessedGroupService,
} from "../../../services/GroupService";
import { toast } from "react-toastify";

export const GroupContext = createContext({});

const GroupList = () => {
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);

  const dispatch = useDispatch();
  const groupList = useSelector((state) => state?.groups?.data || []);
  const user = useSelector((state) => state?.user?.details?._id);
  const { socket } = React.useContext(MainSocketContext);

  //  Fetch user's groups
  const getGroups = useCallback(async () => {
    if (!user) return;
    const res = await GetMyAccessedGroupService({ userId: user });
    const rawGroups = res?.groups || [];

    const filtered = rawGroups.filter((g) => g?.GroupID);
    const normalized = filtered.map((g) =>
      g?.GroupID ? g : { GroupID: g, UserID: user }
    );

    dispatch({ type: "GET_GROUPS", payload: normalized });
  }, [user, dispatch]);

  useEffect(() => {
    if (user) getGroups();
  }, [user, getGroups]);

  useEffect(() => {
    const validGroups = groupList.filter((g) => g?.GroupID);
    setGroups(validGroups);
  }, [groupList]);

  useEffect(() => {
    if (!socket) return;
  
    socket.on("group was deleted", getGroups);
    return () => socket.off("group was deleted", getGroups);
  }, [getGroups, socket]);
  

  const deleteGroup = async (id) => {
    const res = await DeleteGroupService(id);
    console.log("🧪 Delete response:", res);
  
    if (res?.message == "Deleted successfully") {
      toast.success("Group deleted!");
  
      //  Remove group from local state (not Redux)
      setGroups((prev) => prev.filter((g) => g?.GroupID?._id !== id));
  
      // 🔊 Emit for other clients if needed
      socket.emit("group deleted", { groupId: id });
    } else {
      console.warn("❌ Group delete failed. Response was:", res);
    }
  };
  
  

  const addGroup = async () => {
    if (!groupName.trim()) return;
    const res = await AddGroupService({ name: groupName, createdBy: user });
    if (res?.group) {
      toast.success("Group created!");
      toggleModal();
      setGroupName("");
      await getGroups();
    }
  };

  const toggleModal = () => setShowModal((prev) => !prev);
  const handleChange = (e) => setGroupName(e.target.value);

  const filterGroup = (e, search) => {
    const filtered = groupList.filter((item) =>
      item?.GroupID?.name?.toLowerCase().includes(search?.toLowerCase())
    );
    setGroups(filtered);
  };

  return (
    <GroupContext.Provider
      value={{
        showModal,
        groupname: groupName,
        toggleModal,
        handleChange,
        addGroup,
      }}
    >
      <Page title="Groups | Slate">
        <Box padding="10px 25px">
          <Box className="group-nav" marginBottom="2px">
            <Box className="group-nav1">
              <Box component="span" className="group-nav-title" />
            </Box>
            <Box className="group-nav2">
              <Searchbar onSearch={filterGroup} />
            </Box>
            <Box className="group-nav3">
              <Box
                className="group-nav-addall"
                onClick={toggleModal}
                sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              >
                <Box component="span" className="group-nav-add">
                  <HiUserGroup />
                </Box>
                <h3 className="group-nav-add-h3">Create group</h3>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={2} className="group-interface-cover row">
            {groups?.length < 1 ? (
              <Box textAlign="center" paddingTop="20px" color="#575757">
                <NotFound item="groups" />
              </Box>
            ) : (
              groups.map((ad, index) => (
                <Grid item xs={12} sm={6} md={4} key={ad?.GroupID?._id || index}>
                  <GroupCard
                    index={index}
                    ad={ad}
                    deleteGroup={deleteGroup}
                    getGroups={getGroups}
                  />
                </Grid>
              ))
            )}
          </Grid>

          <CreateGroup
            isEdit={false}
            show={showModal}
            handleClose={toggleModal}
            service={addGroup}
            groupName={groupName}
            handleChange={handleChange}
          />
        </Box>
      </Page>
    </GroupContext.Provider>
  );
};

export default GroupList;
