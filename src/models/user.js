const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true
    },
    password: String
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("user", userSchema);
