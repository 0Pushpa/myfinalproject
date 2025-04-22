import Group from "../models/Group.js";
import User from "../models/User.js";
import Message from "../models/Message.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getAllMessage = async (req, res) => {
  const messages = await Message.find({
    ToID: req.query.groupId,
  })
    .sort({ createdAt: 1 })
    .limit(50);
  res.status(StatusCodes.OK).json({ messages, count: messages.length });
};

export const sendMessage = async (req, res) => {
  const message = await Message.create(req.body);
  if (!message) {
    throw new NotFoundError(`Problem sending message`);
  }
  return res.status(StatusCodes.OK).json({ message, status: "success" });
};
