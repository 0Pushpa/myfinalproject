import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Skeleton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../NewGroupInterface";


const Showparticipants = ({ title, users, isLoading }) => {
  const user = useSelector((state) => state.user);
  const context = useContext(SocketContext);
  return (
    <Box>
      <Typography
        variant="body2"
        gutterBottom
        style={{
          paddingLeft: "6px",
          color: "rgb(91, 91, 91)",
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "0.82rem",
          paddingTop: "20px",
        }}
      >
        {title} - {users.length}
      </Typography>
      <List dense>
  {isLoading ? (
    <ListItem>
      <ListItemAvatar>
        <Skeleton variant="circular" width={40} height={40} />
      </ListItemAvatar>
      <Skeleton variant="rectangular" width={"100%"} height={40} />
    </ListItem>
  ) : (
    <>
      {users.map((value, index) => {
        const labelId = `checkbox-list-secondary-label-${value?._id || index}`;
        const isCurrentUser = value._id === user?.details?._id;

        return (
          <ListItem key={index} button>
            {value?.name ? (
              <>
                <ListItemAvatar>
                  <Avatar
                    alt={value?.name?.[0]?.toUpperCase()}
                    src={`/static/images/avatar/${index + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText
                  style={{ textTransform: "capitalize" }}
                  id={labelId}
                  primary={`${value.name} ${isCurrentUser ? "(You)" : ""}`}
                />
                {title !== "Admin" && context.isAdmin && (
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="options">
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </>
            ) : (
              //  Replace <ListItem> with Box or div here
              <Box display="flex" alignItems="center" width="100%">
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <Skeleton variant="rectangular" width={"100%"} height={40} />
              </Box>
            )}
          </ListItem>
        );
      })}
    </>
  )}
</List>

      <Divider style={{ backgroundColor: "rgba(44, 29, 29, 0.2)" }} />
    </Box>
  );
};

export default Showparticipants;
