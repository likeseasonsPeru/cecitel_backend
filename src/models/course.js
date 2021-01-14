const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: null
    },
    category: {
      type: String,
      required: true
    },
    review: String,
    teacher: {
      type: Schema.ObjectId,
      ref: "teacher",
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
      // hours, months, timesxWeek
    },
    startDate: {  // solo para semiprecensiales y corpotarivos, webinars  ejm:  15 de Octubre
      type: String,
      default: null
    },
    endDate: {  // solo para semiprecensiales y corpotarivos, webinars  ejm:  15 de Octubre
      type: String,
      default: null
    },
    numLessons: {
      // Cantidad de lecciones
      type: Number,
      default: null
    },
    currentLesson: { // solo para semiprecensiales
      type: Number,
      default: 0
    },
    schedule: {   // solo para semiprecensiales y corpotarivos, webinars  ejm:  07:00 pm, a 09:00 pm
      type: String,
      default: null
    },
    difficulty: {
      type: Object,
      default: null
      //  level, description
    },
    modules: [
      // semiprecensiales
      {
        title: String,
        duration: Number,
        // Enlatados
        lessons: [
          {
            title: String,
            duration: {
              type: Number,
              default: null
            },
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
      // solo para semiprecensiales y corpotarivos, webinars
      type: Number,
      default: null
    },
    certificate:{     // viene con certificado 
      type: String,
      default: null
      // Gratuito, De pago, null
    },
    students: [
      {
        student: { type: Schema.ObjectId, ref: "user" },
        score: {
          type: Number,
          default: null
        },
        assistance: [     // se deben crear tantas asistance como numLessos
          {
            order: Number,
            present: {
              type: Boolean,
              default: false
            }
          }
        ]
      }
    ]

    
  },
  {
    versionKey: false,
    timestamps: true
  }
);

courseSchema.plugin(uniqueValidator);
module.exports = mongoose.model("course", courseSchema);
