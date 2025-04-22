import express from "express";
// import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Routes Working");
});

export default router;
