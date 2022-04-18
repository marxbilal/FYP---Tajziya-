import express from "express";

import {
  createNewUser,
  loginUser,
  changePassword,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signup", createNewUser);

router.post("/login", loginUser);

router.post("/changepassword", changePassword);

router.post("/logout", (req, res) => {});

export default router;
