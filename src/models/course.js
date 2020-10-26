const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    review: String,
    teacher: {
      type: Object,
      required: true
    },
    materials: {
      type: String,
      default: null
    },
    objectives: {
      type: String,
      default: null
    },
    duration: {
      type: Object,
      default: null
    },
    difficulty: {
      type: Object,
      default: null
    },
    modules: [
      // semiprecensiales
      {
        title: String,
        duration: Number,
        lessons: [
          {
            title: String,
            urlVideo: String
          }
        ],
        files: [],
      }
    ],
    price: Number,
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("course", courseSchema);
