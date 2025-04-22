import Sector from "../models/Sector.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getAllSectors = async (req, res) => {
  const sectors = await Sector.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ sectors, count: sectors.length });
};
export const getSector = async (req, res) => {
  const {
    params: { id: sectorId },
  } = req;

  const sector = await Sector.findOne({
    _id: sectorId,
  });
  if (!sector) {
    throw new NotFoundError(`No sector with id ${sectorId}`);
  }

  res.status(StatusCodes.OK).json({ sector });
};


export const createSector = async (req, res) => {
  const sector = await Sector.create(req.body);
  res.status(StatusCodes.OK).json({ sector });
};

export const updateSector = async (req, res) => {
  const sector = await Sector.findByIdAndUpdate(
    { _id: sectorId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!sector) {
    throw new NotFoundError(`No sector with id ${sectorId}`);
  }
  res.status(StatusCodes.OK).json({ sector });
};

export const deleteSector = async (req, res) => {
  const {
    params: { id: sectorId },
  } = req;

  const sector = await Sector.findByIdAndRemove({
    _id: sectorId,
  });
  if (!sector) {
    throw new NotFoundError(`No sector with id ${sectorId}`);
  }
  res.status(StatusCodes.OK).send();
};
