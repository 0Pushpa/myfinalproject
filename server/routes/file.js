import express from "express";
import multer from "multer";
const upload = multer({ dest: "some/path" });

const router = express.Router();
import {
  uploadFile,
  getFiles,
  downloadFile,
  removeFiles,
} from "../controllers/file.js";

router.route("/").post(uploadFile).get(getFiles);
router.route("/download").get(downloadFile);
router.route("/delete").post(removeFiles);

export default router;
