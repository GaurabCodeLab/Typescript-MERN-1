const Person = require("../model/person");
const express = require("express");
const personAuth = require("../middleware/personAuth");

const router = express.Router();

router.get("/view", personAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const personDetails = await Person.findById(loggedInUser._id);
    res
      .status(200)
      .json({
        message: "person details fetched successfully",
        data: personDetails,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting person details: " + error });
  }
});

module.exports = { personRouter: router };
