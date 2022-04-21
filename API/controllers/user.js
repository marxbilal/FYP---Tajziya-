import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const JWT_SECRET =
  "abcdefghuwbhvirh()*&^39@#%&48ut&#)93^$o42oth&@)^%239tvny329c23";

export const createNewUser = async (req, res) => {
  try {
    let hash = await bcrypt.hash(req.body.password, 10);
    if (req.body.email == null || req.body.username == null) {
      return res
        .status(400)
        .json({ header: { message: "Missing Information" } });
    }
    const response = await User.create({
      email: req.body.email,
      password: hash,
      username: req.body.username,
    });
    res.status(200).json({ header: { message: "Signup Successfull" } });
  } catch (error) {
    res.status(500).json({
      header: { message: error.message },
      body: {},
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const getdata = await User.findOne({ username: req.body.username });
    if (!getdata) {
      return res.status(400).json({
        header: { error: 4, message: "InvalidCredentials" },
        body: {},
      });
    } else {
      bcrypt.compare(req.body.password, getdata.password, (err, response) => {
        if (err) return res.json(err);
        if (!response)
          return res.status(418).json({
            header: {
              error: 4,
              message: "InvalidCredentials",
            },
            body: {},
          });

        const token = jwt.sign(
          {
            id: getdata._id,
            username: req.body.username,
          },
          JWT_SECRET
        );

        return res.status(200).json({
          header: { error: 0 },
          body: {
            message: "successfully logged in",
            userType: getdata.userType,
            token: token,
          },
        });
      });
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    // step 1: get token and password from client
    const token = req.body.token;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    // step 2: get password from database of the user through token
    //    part (a) get username from token
    const user = jwt.verify(token, JWT_SECRET);
    //    part (b) get password from username
    const userPassword = await User.findOne(
      { username: user.username },
      { password: 1 }
    );

    // step 3: compare client password with password from database
    bcrypt.compare(
      oldPassword,
      userPassword.password,
      async (err, response) => {
        if (err) return res.json(err);

        // step 4: if incorrect return invalidCredentials, else change password with new passowrd
        if (!response)
          return res.status(400).json({
            header: {
              error: "5",
              message: "invalid credentials",
            },
            body: {},
          });
        const hashed = await bcrypt.hash(newPassword, 10);
        const upd = await User.updateOne(
          { _id: userPassword._id },
          { $set: { password: hashed } }
        );
        return res.status(200).json({
          header: {
            error: "0",
            message: "Successfully Changed Password",
          },
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      header: {
        error: "1",
        message: error.message,
      },
    });
  }
};
