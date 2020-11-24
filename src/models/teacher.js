const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const teacherSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    position: { type: String, default: null },
    image: { type: String, default: null },
    description: { type: String, default: null },
    courses: [
      {
        /* courseid: String,
        category: String,
        name: String,
        image: {
          type: String,
          default: null
        },
        time: String,   // horario si es que hubiera , 7:00 a 9:00  */
        course: {type: Schema.ObjectId, ref: "course"},
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
        startDate: {
          type: String,
          default: null
        },
        endDate: {
          type: String,
          default: null
        },
        numLessons: {   // Cantidad de lecciones 
          type: Number,
          default: null  
        },  
        currentLesson: {
          type: Number,
          default: 0
        },
        students: [
          {
            studentId: String,
            name: String,
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
