import GroupUser from "../models/GroupUser.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

export const getAllUsersInGroup = async (req, res) => {
  const { groupId } = req.params;
  const group_users = await GroupUser.find({ GroupID: groupId }).populate("UserID", "name email");
  res.status(StatusCodes.OK).json({ group_users, count: group_users.length });
};


export const addUserToGroup = async (req, res) => {
  const { GroupID, UserID } = req.body;
  const alreadyExists = await GroupUser.findOne({ GroupID, UserID });
  if (alreadyExists) {
    throw new BadRequestError("User already in group");
  }

  const user_in_group = await GroupUser.create({ GroupID, UserID, role: "user", status: true });
  res.status(StatusCodes.CREATED).json({ user_in_group });
};


export const deleteUserFromGroup = async (req, res) => {
  const { groupId, userId } = req.params;
  const user_in_group = await GroupUser.findOneAndDelete({ GroupID: groupId, UserID: userId });

  if (!user_in_group) {
    throw new NotFoundError(`No user in group with id ${userId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "User removed" });
};
