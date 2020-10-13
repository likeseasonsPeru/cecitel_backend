const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    videoUrl: String
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("course", courseSchema);
