const mongooose = require("mongoose");
const { Schema } = mongooose;

const hashSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "user" }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongooose.model("hash", hashSchema);
