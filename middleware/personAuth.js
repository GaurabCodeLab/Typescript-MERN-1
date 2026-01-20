const jwt = require("jsonwebtoken");
const Person = require("../model/person");

const personAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(404).json({ message: "Token is missing" });
    }
    const decodedObj = jwt.verify(token, "Raja1634@");
    if (!decodedObj) {
      return res.status(401).json({ message: "Token is invalid or expired" });
    }
    const personDetails = await Person.findById(decodedObj.id);
    req.user = personDetails;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error in validating person: " + error });
  }
};

module.exports = personAuth;
