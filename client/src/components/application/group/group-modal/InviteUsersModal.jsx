import React from "react";
import { Modal } from "react-bootstrap";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  FormControl,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import AddIcon from "@mui/icons-material/PlusOne";

import { BsCheck2 } from "react-icons/bs";
// import AddIcon from "@material-ui/icons/PlusOneOutlined";
import { AiOutlineCheck } from "react-icons/ai";
import ReactTagInput from "@pathofdev/react-tag-input";
import { IoIosAdd } from "react-icons/io";
import Searchbar from "../../../elements/Searchbar";
import Navbarimg from "../../../../assets/images/portfolio/navimg.jpg";
import { GetUsersService } from "../../../../services/UserService";
import NameLogo from "../../../elements/NameLogo";
import Showparticipants from "../menu-components/ShowParticipants";
import { SendInvite } from "../../../../services/GroupService";
// import { store } from "react-notifications-component";
// import SocketContext from "../GroupInterface";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import Pills from "../../../elements/Pills";
// import Pills from "components/elements/Pills";
import { toast } from "react-toastify";

function InviteUsersModal(props) {
  const notify = (title, message, type) => {
    // store.addNotification({
    //   title: title,
    //   message: message,
    //   type: type,
    //   insert: "top",
    //   container: "top-right",
    //   animationIn: ["animate__animated", "animate__fadeIn"],
    //   animationOut: ["animate__animated", "animate__fadeOut"],
    //   dismiss: {
    //     duration: 6000,
    //     onScreen: true,
    //   },
    // });
  };
  const [email, setEmail] = React.useState("");

  const [emails, setEmails] = React.useState([]);
  const [userDetails, setUserDetails] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [unfilteredUsers, setUnfilteredUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState([]);
  const params = useParams();

  const user = useSelector((state) => state?.user?.details?.name);
  const userId = useSelector((state) => state?.user?.details?._id);

  const getUsers = async () => {
    setIsLoading(true);
    const res = await GetUsersService();
    if (res?.data?.users) {
      const userList = res?.data?.users.filter((user) => user._id !== userId);
      setUsers(userList);
      setUnfilteredUsers(userList);
    }
    setIsLoading(false);
  };

  const sendInvite = async () => {
    if (emails.length > 0) {
      const res = await SendInvite({
        userDetails,
        groupId: params.id,
        sentBy: user,
      });
      if (res?.data?.status === "success") {
        props.socket.emit("notification", emails);
        notify("Success", "Invite Sent Successfully", "success");
        props.handleClose();
        setEmails([]);
      } else {
        notify(
          "Validation Error",
          res.message ? res.message : "Unexpected error",
          "danger"
        );
      }
    } else {
      notify("Error", " Enter at least 1 email", "danger");
    }
  };

  const filterUser = (searched) => {
    const filtered = unfilteredUsers.filter((user) =>
      user.name.toLowerCase().includes(searched.toLowerCase())
    );
    setUsers(filtered);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const addEmail = (e) => {
    e.preventDefault();
    setEmails([...emails, email]);
    setEmail("");
  };

  return (
    <>
      <Box component="div">
        <Modal
          show={props.show}
          onHide={props.handleClose}
          className="contact-add-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Invite People</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Box component="div" paddingBottom={1}>
              {/* <ReactTagInput
                tags={emails}
                placeholder={emails.length > 0 ? "." : "No emails added"}
              /> */}
              {/* <form onSubmit={addEmail}>
                <TextField
                  type="email"
                  fullWidth
                  variant="outlined"
                  label="Add Email"
                  value={email}
                  placeholder="Type email here"
                  onChange={(e) => {
                    return setEmail(e.target.value);
                  }}
                  style={{
                    background: "#fff",
                  }}
                />
              </form> */}
            </Box>
            <Box component="div" class="search-container">
              <Searchbar onSearch={filterUser} />
            </Box>
            <Pills chipData={emails} setChipData={setEmails} />

            <Box component="div" className="contact-modal-list">
              <List dense>
                {isLoading ? (
                  <ListItem>
                    <ListItemAvatar>
                      <Skeleton variant="circle" width={40} height={40} />
                    </ListItemAvatar>
                    <Skeleton variant="rect" width={"100%"} height={40} />
                  </ListItem>
                ) : (
                  <>
                    {users.map((value, index) => {
                      const labelId = `checkbox-list-secondary-label-${value}`;
                      return (
                        <ListItem title="Click to add" key={index} button>
                          {value?.name ? (
                            <>
                              <ListItemAvatar>
                                <Avatar
                                  alt={`${value?.name
                                    ?.split("")[0]
                                    .toUpperCase()}`}
                                  src={`/static/images/avatar/${value + 1}.jpg`}
                                />
                              </ListItemAvatar>

                              <ListItemText
                                style={{ textTransform: "capitalize" }}
                                id={labelId}
                                primary={`${
                                  value?.name || `User ${index + 1}`
                                }`}
                              />
                              <ListItemSecondaryAction>
                                {emails.includes(value.email) ? (
                                  <Box
                                    edge="end"
                                    aria-label="check"
                                    style={{
                                      color: "rgb(15, 190, 34)",
                                      fontSize: "1.4rem",
                                    }}
                                  >
                                    <BsCheck2 />
                                  </Box>
                                ) : (
                                  <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => {
                                      setUserDetails([
                                        ...userDetails,
                                        {
                                          id: value._id,
                                          email: value.email,
                                        },
                                      ]);
                                      setEmails([...emails, value.email]);
                                    }}
                                  >
                                    <IoIosAdd />
                                  </IconButton>
                                )}
                              </ListItemSecondaryAction>
                            </>
                          ) : (
                            <ListItem>
                              <ListItemAvatar>
                                <Skeleton
                                  variant="circle"
                                  width={40}
                                  height={40}
                                />
                              </ListItemAvatar>
                              <Skeleton
                                variant="rect"
                                width={"100%"}
                                height={40}
                              />
                            </ListItem>
                          )}
                        </ListItem>
                      );
                    })}
                  </>
                )}
              </List>
              {/* <ul>
                {users.map((user) => (
                  <li>
                    <Box component="div" className="contact-modal-flex">
                      <Box component="div" className="contact-modal-flex1">
                        <Box
                          component="span"
                          className="contact-modal-flex-user"
                        >
                          <img alt="my-img" src={Navbarimg} />
                          <NameLogo group={user.name} />
                        </Box>
                      </Box>
                      <Box component="div" className="contact-modal-flex2">
                        <h3 className="contact-modal-flex2-h3">{user.name}</h3>
                      </Box>
                      <Box component="div" className="contact-modal-flex3">
                        <Box
                          component="span"
                          className="contact-modal-flexaddicon"
                        >
                          <IoIosAdd />
                        </Box>
                      </Box>
                    </Box>
                  </li>
                ))}
              </ul> */}
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              style={{
                backgroundColor: "rgba(0, 170, 239, 0.9)",
                color: "#fff",
              }}
              onClick={sendInvite}
            >
              Send Invite
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </>
  );
}

export default InviteUsersModal;
