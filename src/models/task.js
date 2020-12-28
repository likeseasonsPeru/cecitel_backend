const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  course: { type: Schema.ObjectId, ref: "course" },
  teacher: { type: Schema.ObjectId, ref: "teacher" },
  title: String,
  date: String,
  total: Number,
  current: {
      type: Number,
      default: 0,
  },
  students: [
    {
      student: { type: Schema.ObjectId, ref: "user" },
      url: {
        type: String,
        default: null
      },
      date: {
        type: String,
        default: null
      },
      status: {
        type: String,
        default: "Pendiente"
      }
    }
  ]
});

module.exports = mongoose.model("task", taskSchema);
