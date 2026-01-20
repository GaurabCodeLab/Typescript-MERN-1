const mongoose = require("mongoose");
const validator = require("validator");

const { Schema, models, model } = mongoose;

const personSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "provide correct email",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Person = models.Person || model("Person", personSchema);

module.exports = Person;
