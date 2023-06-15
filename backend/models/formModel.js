const mongoose = require("mongoose");
const validator = require("validator");
const formSchema = new mongoose.Schema({
  firstName: {
    type: "string",
    required: [true, "please enter a Name"],
    validate: {
      validator: function (value) {
        return !validator.isNumeric(value);
      },
      message: "Value must be a valid first Name.",
    },
  },
  lastName: {
    type: "string",
    required: [true, "please enter a Name"],
    validate: {
      validator: function (value) {
        return !validator.isNumeric(value);
      },
      message: "Value must be a valid last Name.",
    },
  },
  email: {
    type: "string",
    required: [true, "please enter a Email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email address"],
  },
  country: {
    type: "string",
    required: [true, "please enter a country"],
  },
  state: {
    type: "string",
    required: [true, "please enter a state"],
  },
  city: {
    type: "string",
    required: [true, "please enter a city"],
  },
  gender: {
    type: "string",
    required: [, "please enter a gender"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "please enter a dateOfBirth"],
  },
  age: {
    type: Number,
    required: [true, "please enter a age"],
    validate: {
      validator: function (value) {
        return value > 14;
      },
      message: "Age must be greater than 14.",
    },
  },
});

module.exports = mongoose.model("form", formSchema);
