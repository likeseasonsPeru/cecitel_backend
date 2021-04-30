const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, default: null, required: true },
    email: { type: String, unique: true, required: true },
    dni: { type: String, required: true },
    password: { type: String, required: true },
    category: { type: String, default: "user" },
    image: { type: String, default: null },
    purchases: [
      {
        courses: [{ type: Schema.ObjectId, ref: "course" }],
        payment_type: {type: String, default: "Tarjeta"}, // Tarjeta o Transferencia
        total: Number,
        image: { type: String, default: null },
        approved: { type: Boolean, default: false },
        cancelled: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    courses: [
      {
        course: { type: Schema.ObjectId, ref: "course" },
        // courseName: {}  para guardar nombre del curso (adicionalemente)
        progress: {
          // Solo para enlatados, indicara el numero de la progresion, debera tener el numero de videos
          type: Number,
          default: null
        },
        score: {
          type: Number,
          default: null
        },
        completed: {
          type: Boolean,
          default: false
        },
        certificate: {
          // url
          type: String,
          default: null
        }
      }
    ],
    favorites: [String] // ids
  },
  {
    versionKey: false,
    timestamps: true
  }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("user", userSchema);
