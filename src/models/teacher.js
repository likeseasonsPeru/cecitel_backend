const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const teacherSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    category: { type: String, default: "user" },
    position: { type: String, default: null },
    image: { type: String, default: null },
    description: { type: String, default: null }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

teacherSchema.plugin(uniqueValidator);
module.exports = mongoose.model("teacher", teacherSchema);
