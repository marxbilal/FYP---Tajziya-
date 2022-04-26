import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

const JWT_SECRET =
  "abcdefghuwbhvirh()*&^39@#%&48ut&#)93^$o42oth&@)^%239tvny329c23";

router.post("/users", async (req, res) => {
  const token = req.body.token;
  const user = jwt.verify(token, JWT_SECRET);

  const admin = await User.findOne(
    { username: user.username },
    { admin: 1 }
  ).then((admin) => {
    return admin.toObject();
  });

  if (admin.admin) {
    const users = await User.find({}, { __v: 0, password: 0 });
    res.status(200).json(users);
  } else {
    res.status(401).json({
      header: {
        error: "1",
        message: "Unauthorized access",
      },
    });
  }
});

export default router;
