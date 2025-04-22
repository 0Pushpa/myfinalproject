import express from "express";

const router = express.Router();
import { createSector, getAllSectors } from "../controllers/sector.js";

router.route("/").post(createSector).get(getAllSectors);

export default router;
