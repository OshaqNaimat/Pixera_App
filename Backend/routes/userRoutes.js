import express from "express";
import {
  registeruser,
  loginUser,
  findUser,
  getAllUsers,
} from "../controller/UserController.js";

const router = express.Router();

router.post("/register", registeruser);
router.post("/login", loginUser);
router.get("/:id", findUser);
router.get("/", getAllUsers);

export default router;

