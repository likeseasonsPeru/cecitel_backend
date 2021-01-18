const mongoose = require("mongoose");
const { Schema } = mongoose;

const contacSchema = new Schema(
  {
    names: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    time: {type: String },
    message: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("contact", contacSchema);
