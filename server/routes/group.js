import express from "express";

const router = express.Router();
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getMyGroup,
  updateGroup,
  getGroup,
  inviteUser,
  myAccessedGroup,
  isAccessibleGroup,
  leaveGroup,
} from "../controllers/group.js";

router.route("/").post(createGroup).get(getAllGroups);

router.route("/:id").patch(updateGroup).get(getGroup).delete(deleteGroup);

router.route("/invite").post(inviteUser);

router.route("/accessible-groups").post(myAccessedGroup);

router.route("/my-groups").post(getMyGroup);

router.route("/accessibility").post(isAccessibleGroup);

router.route("/leave").post(leaveGroup);

export default router;
