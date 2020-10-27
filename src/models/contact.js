const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const teacherSchema = new Schema(
  {
    names: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("teacher", teacherSchema);
