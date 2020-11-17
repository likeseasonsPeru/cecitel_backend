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
      default: null
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
            duration: String,
            urlVideo: String,
          }
        ],
        files: [String]
      }
    ],
    price: { 
      type: Number, 
      required: true 
    },
    limit: {
      // para cursos semiprecensiales
      type: Number,
      default: null
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("course", courseSchema);
