import express from "express";
import {
  getUsers,
  getUserById,
  updateUserStatus,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id/status", updateUserStatus);

export default router;