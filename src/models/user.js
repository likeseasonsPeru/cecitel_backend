const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {type: String, required: true},
    surname: String,
    email: {
      type: String,
      unique: true
    },
    password: String,
    type: String,
  },
  {
    versionKey: false,
    timestamps: true
  }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("user", userSchema);
