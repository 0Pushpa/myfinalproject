import Group from "../models/Group.js";
import User from "../models/User.js";
import GroupUser from "../models/GroupUser.js";
import Notification from "../models/Notification.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import GroupSector from "../models/GroupSector.js";

export const getAllGroups = async (req, res) => {
  // const groups = await Group.find({ createdBy: req.user.userId }).sort('createdAt')
  const groups = await Group.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ groups, count: groups.length });
};
export const getGroup = async (req, res) => {
  const {
    params: { id: groupId },
  } = req;

  console.log("🔍 Looking up group:", groupId);

  if (!groupId) {
    return res.status(400).json({ message: "Group ID is missing" });
  }

  const group = await Group.findOne({ _id: groupId });

  if (!group) {
    console.log("❌ Group not found for ID:", groupId);
    return res.status(404).json({ message: `No group with id ${groupId}` });
  }

  const totalUsers = await GroupUser.find({
    GroupID: group._id,
  })
    .populate("UserID")
    .populate("GroupID");

  console.log(" Group found:", group.name);
  return res.status(StatusCodes.OK).json({ group, totalUsers });
};


export const getMyGroup = async (req, res) => {
  const { userId } = req.body;

  const group = await Group.find({
    createdBy: userId,
  });
  if (!group) {
    throw new NotFoundError(`No group with id ${groupId}`);
  }
  res.status(StatusCodes.OK).json({ group });
};

export const myAccessedGroup = async (req, res) => {
  const { userId } = req.body;

  const groups = await GroupUser.find({
    UserID: userId,
  }).populate("GroupID");

  res.status(StatusCodes.OK).json({ groups });
};

export const createGroup = async (req, res) => {
  const group = await Group.create(req.body);
  const groupUser = await GroupUser.create({
    GroupID: group._id,
    UserID: group.createdBy,
    role: "admin",
  });
  res.status(StatusCodes.OK).json({ group, groupUser });
};

export const updateGroup = async (req, res) => {
  const {
    params: { id: groupId },
  } = req;

  const group = await Group.updateOne(
    {
      _id: groupId,
    },
    {
      $set: {
        name: req.body.name,
      },
    }
  );
  if (!group) {
    throw new NotFoundError(`No group with id ${groupId}`);
  }
  return res.status(StatusCodes.OK).json({ status: "success" });
};

export const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;

    const group = await Group.findByIdAndDelete(groupId); //  fixed method + correct param

    if (!group) {
      throw new NotFoundError(`No group with id ${groupId}`);
    }

    await GroupUser.deleteMany({ GroupID: groupId }); //  remove group users
    console.log("🗑️ Group deleted:", group);
    res.status(StatusCodes.OK).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server error during deletion",
    });
  }
};

// module.exports = {
//   createGroup,
//   deleteGroup,
//   getAllGroups,
//   updateGroup,
//   getGroup,
// }

export const isAccessibleGroup = async (req, res) => {
  const { userId, groupId } = req.body;
  const GroupExists = await Group.findOne({ _id: groupId });
  if (!GroupExists) {
    return res.status(StatusCodes.OK).json({ status: "fail" });
  }
  const check = await GroupUser.findOne({ UserID: userId, GroupID: groupId });
  if (check) {
    return res.status(StatusCodes.OK).json({ status: "success" });
  }
  return res.status(StatusCodes.OK).json({ status: "fail" });
};

export const inviteUser = async (req, res) => {
  const { userDetails, groupId, sentBy } = req.body;
  try {
    const group = await Group.findOne({ _id: groupId });
    userDetails.forEach(async (detail) => {
      const notifications = await Notification.create({
        UserID: detail.id,
        message: `You have been invited to join <strong>${group.name}</strong> by <strong>${sentBy}</strong>`,
        type: "confirmation",
        url: `/slate/groups/${groupId}/${detail.id}`,
        status: 0,
      });
    });
    return res.status(StatusCodes.OK).json({ status: "success" });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ status: "failed" });
  }
};

export const leaveGroup = async (req, res) => {
  const { userId, groupId } = req.body;

  const group = await GroupUser.find({
    GroupID: groupId,
    UserID: userId,
  })
    .remove()
    .exec();
  return res.status(StatusCodes.OK).json({ status: "success" });
};
