import express from "express";
import { sendMessage, getMyMessages } from "../controller/MessageController.js";

const router = express.Router();

router.post("/:sender_id/:receiver_id", sendMessage);
router.get("/:sender_id/:receiver_id", getMyMessages);

export default router;

