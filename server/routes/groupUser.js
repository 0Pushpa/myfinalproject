import express from "express";
import {
  getAllUsersInGroup,
  addUserToGroup,
  deleteUserFromGroup,
} from "../controllers/groupUser.js";

const router = express.Router();

// Create new group user
router.route("/").post(addUserToGroup);

// Get all users in a group or delete a specific user from a group
router.route("/:groupId").get(getAllUsersInGroup);
router.route("/:groupId/:userId").delete(deleteUserFromGroup);

export default router;
