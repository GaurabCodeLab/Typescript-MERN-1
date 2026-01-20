const express = require("express");
const User = require("../model/user");
const personAuth = require("../middleware/personAuth");

const router = express.Router();

router.get("/", personAuth, async (req, res) => {
  try {
    const usersList = await User.find({});
    return res
      .status(200)
      .json({ message: "user list fetched successfully", data: usersList });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting users list: " + error.message });
  }
});

router.get("/:id", personAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.status(200).json({ message: "user fetched successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting user data: " + error.message });
  }
});

router.delete("/:id", personAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res
      .status(200)
      .json({ message: "user deleted successfully", data: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleting user: " + error.message });
  }
});

router.post("/create", personAuth, async (req, res) => {
  try {
    const newUser = req.body;
    const validFields = [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "gender",
      "hobbies",
      "book",
    ];
    const isValidBody = Object.keys(newUser).every((value) =>
      validFields.includes(value),
    );
    if (!isValidBody) {
      return res.status(400).json({ message: "Invalid body fields" });
    }
    const userDetails = await User.create(newUser);
    res
      .status(201)
      .json({ message: "user created successfully", data: userDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating user: " + error.message });
  }
});

router.patch("/:id", personAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    const validFields = [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "gender",
      "hobbies",
      "book",
    ];
    const isValidBody = Object.keys(updatedUser).every((value) =>
      validFields.includes(value),
    );
    if (!isValidBody) {
      return res.status(400).json({ message: "Invalid body fields" });
    }

    const updatedUserDetails = await User.findOneAndUpdate(
      { _id: id },
      updatedUser,
      { new: true },
    );
    if (!updatedUserDetails) {
      return res.status(404).json({ message: "user not found" });
    }
    res
      .status(200)
      .json({ message: "user updated successfully", data: updatedUserDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in updating user: " + error.message });
  }
});

module.exports = { userRouter: router };
