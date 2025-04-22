import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { HiPhoneMissedCall } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NameLogo from "./NameLogo";
import { styled } from "@mui/system";

// Define styles using the styled API
const ModalPaper = styled("div")(({ theme }) => ({
  position: "absolute",
  width: 210,
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

const CallButton = styled("div")(({ color }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  padding: "12px",
  backgroundColor: color,
  cursor: "pointer",
}));

export default function CallingModal({
  toggleCallModal,
  caller,
  groupId,
}) {
  const [groupDetails, setGroupDetails] = useState({});
  const groups = useSelector((state) => state.groups?.data);
  const navigate = useNavigate();

  useEffect(() => {
    if (groups) {
      const group = groups?.find((group) => group?.GroupID?._id !== groupId);
      setGroupDetails(group);
    }
  }, [groups, groupId]);

  const handleAnswerCall = () => {
    toggleCallModal();
    navigate(`/slate/groups/${groupId}?call=true`);
  };

  const handleRejectCall = () => {
    toggleCallModal();
  };

  return (
    <Modal
      open={true}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <ModalPaper>
        <div className="call-modal-wrapper">
          <div className="caller-img">
            <NameLogo group={groupDetails?.GroupID?.name || "Group"} />
          </div>
          <div className="caller-desc">
            <p>Incoming call from {caller && caller}</p>
          </div>
          <div className="call-actions">
            <ul>
              <li>
                <CallButton color="red" onClick={handleRejectCall}>
                  <HiPhoneMissedCall />
                </CallButton>
              </li>
              <li>
                <CallButton color="green" onClick={handleAnswerCall}>
                  <MdCall />
                </CallButton>
              </li>
            </ul>
          </div>
        </div>
      </ModalPaper>
    </Modal>
  );
}
