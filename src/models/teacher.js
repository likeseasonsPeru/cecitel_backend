const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const teacherSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    position: { type: String, default: null },
    image: { type: String, default: null },
    description: { type: String, default: null },
    courses: [
      {
        courseid: String,
        category: String,
        title: String,
        image: {
          type: String,
          default: null
        },
        time: String,
        tasks: [
          {
            title: String,
            date: {
              type: Date,
              default: Date.now()
            },
            total: Number,
            current: {
              type: Number,
              default: 0
            },
            files: [],
          }
        ],
        startDate: Date,
        endDate: Date,
        numLessons: Number,
        currentLesson: {
          type: Number,
          default: 0
        },
        students: [
          {
            studentId: String,
            name: String,
            surname: String,
            dni: String,
            score: Number,  
            assistance: [     
              {
                order: Number,
                present: {
                  type: Boolean,
                  default: false
                },
              }
            ]
          }
        ],
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
);

teacherSchema.plugin(uniqueValidator);
module.exports = mongoose.model("teacher", teacherSchema);
