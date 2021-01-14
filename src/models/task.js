const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    course: { type: Schema.ObjectId, ref: "course" },
    teacher: { type: Schema.ObjectId, ref: "teacher" },
    title: String,
    url: {
      type: String,
      default: null
    },
    date: String,   // formato yyyy-mm-dd
    total: Number,
    current: {
      type: Number,
      default: 0
    },
    students: [
      {
        student: { type: Schema.ObjectId, ref: "user"},
        url: {
          type: String,
          default: null
        },
        filename: {
          type: String,
          default: null
        },
        date: {
          type: Date,
          default: null
        },
        status: {
          type: String,
          default: "Pendiente"
        }
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
);

taskSchema.plugin(uniqueValidator);
module.exports = mongoose.model("task", taskSchema);
