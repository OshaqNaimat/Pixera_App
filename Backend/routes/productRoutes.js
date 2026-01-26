import express from "express";
import {
  sellPost,
  getProducts,
  relaventProducts,
} from "../controller/SellProduct.js";

const router = express.Router();

router.post("/:user_id", sellPost);
router.get("/", getProducts);
router.get("/:id", relaventProducts);

export default router;

