import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { GetAllUsersService, AddUserToGroupService } from "../../../../services/GroupService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddMemberModal = ({ open, handleClose, groupId, onUserAdded, groupUsers = [] }) => {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state?.user?.details);

  useEffect(() => {
    if (open) fetchUsers();
  }, [open]);

  const fetchUsers = async () => {
    const data = await GetAllUsersService();
    const filtered = data.filter((u) => u._id !== user?._id);
    setUsers(filtered);
  };

  const handleAdd = async (userId) => {
    const res = await AddUserToGroupService({ GroupID: groupId, UserID: userId });
    if (res?.status === 201) {
      toast.success("User added to group 🎉");
      onUserAdded?.();
      handleClose();
      setTimeout(() => window.location.reload(), 1000);
    } else if (res?.message?.includes("already")) {
      toast.error("Failed to add user");
    }
  };
  const getRandomColor = (seed) => {
    const colors = [
      "#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f",
      "#90be6d", "#43aa8b", "#577590", "#277da1", "#9b5de5",
      "#f15bb5", "#00bbf9", "#00f5d4", "#4cc9f0", "#4895ef"
    ];
    const index = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };
  

  const groupUserIds = groupUsers.map((user) => user._id);
  const filteredUsers = users.filter((user) => !groupUserIds.includes(user._id));

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: "#fff",
          margin: "10% auto",
          width: "450px",
          borderRadius: "12px",
          boxShadow: 6,
          outline: "none", // ✅ removes the modal border
        }}
      >
        <Typography variant="h6" mb={2} fontWeight={600}>
          Invite Users to Group
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {filteredUsers.length === 0 ? (
          <Typography color="textSecondary">No users left to invite.</Typography>
        ) : (
          <List>
            {filteredUsers.map((user) => (
              <ListItem key={user._id} divider>
                <ListItemAvatar>
                <Avatar sx={{ bgcolor: getRandomColor(user._id), color: "#fff" }}>
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>

                </ListItemAvatar>

                <ListItemText primary={user.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => handleAdd(user._id)}
                  >
                    <PersonAddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddMemberModal;
