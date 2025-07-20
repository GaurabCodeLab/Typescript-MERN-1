const mongoose = require("mongoose");
const validator = require("validator");

const { Schema, models, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Provide valid email address",
      },
    },
    mobile: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    hobbies: {
      type: [String],
      required: true,
    },
    book: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || model("user", userSchema);

module.exports = User;
