import express from "express";

const router = express.Router();
import {
  sendMessage,
  getAllMessage,
} from "../controllers/chat.js";

router.route("/").post(sendMessage).get(getAllMessage);

export default router;
