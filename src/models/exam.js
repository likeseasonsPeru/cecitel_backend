const mongoose = require("mongoose");
const { Schema } = mongoose;

const examSchema = new Schema(
  {
    course: { type: Schema.ObjectId, ref: "course" },
    contain: [
      {
        question: String,
        opcionA: String,
        opcionB: String,
        opcionC: String,
        opcionD: String,
        rpta: String //  A, B, C, D
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("exam", examSchema);
