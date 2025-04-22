import express from "express";

const router = express.Router();
import {
    addDataStat,
    getDataStat
} from "../controllers/dataStat.js";

router.route("/").post(addDataStat).get(getDataStat);


// router.route("/my-groups/").get(getMyGroup);

export default router;
