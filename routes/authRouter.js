const express = require("express");
const Person = require("../model/person");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/registration", async (req, res) => {
  try {
    const newPerson = req.body;
    const allowedFields = ["name", "email", "password"];
    const isValidFields = Object.keys(newPerson).every((value) =>
      allowedFields.includes(value),
    );
    if (!isValidFields) {
      return res.status(401).json({ message: "Invalid person data" });
    }
    const hashedPassword = await bcrypt.hash(newPerson.password, 10);
    console.log("hashed password", hashedPassword);
    const personDetails = await Person.create({
      ...newPerson,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "user created successfully", data: personDetails });
  } catch (error) {
    res.status(500).json({ message: "Error in creating user: " + error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "Missing required fields" });
    }
    const personDetails = await Person.findOne({ email });
    if (!personDetails) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(
      password,
      personDetails.password,
    );
    if (!isValidPassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
      { id: personDetails._id, email: personDetails.email },
      "Raja1634@",
      { expiresIn: "1h" },
    );
    res.cookie("token", token);
    res.status(200).json({ message: "login successful", data: personDetails });
  } catch (error) {
    res.status(500).json({ message: "Error in login person: " + error });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Erron in logout person: " + error });
  }
});

module.exports = { authRouter: router };
