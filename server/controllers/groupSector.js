import GroupSector from "../models/GroupSector.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getAllSectorsInGroup = async (req, res) => {
  const group_sectors = await GroupSector.find({ _id: req.groupId}).sort("createdAt");
  res.status(StatusCodes.OK).json({ group_sectors, count: group_sectors.length });
};


export const addSectorToGroup = async (req, res) => {
  const sectors_in_group = await GroupSector.create(req.body);
  res.status(StatusCodes.OK).json({ sectors_in_group });
};


export const deleteSectorFromGroup = async (req, res) => {

  const sectors_in_group = await GroupSector.findByIdAndRemove({
    sectorsId: req.sectorId,
    groupId: req.groupId,

  });
  if (!sectors_in_group) {
    throw new NotFoundError(`No sectors_in_group with id ${req.sectorsId}`);
  }
  res.status(StatusCodes.OK).send();
};
