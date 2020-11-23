const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, default: null, required: true },
    email: { type: String, unique: true, required: true },
    dni: {type: String, required: true},
    password: { type: String, required: true },
    category: { type: String, default: "user" },
    image: { type: String, default: null },
    purchases: [{}],
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
            urls: [],
            date: {
              type: Date,
              default: null
            },
            status: String
          }
        ],
        assistance: {
          type: Object,
          default: null
        },
        startDate: Date,
        endDate: Date,
        teacher: Object,
        score: {
          type: Number,
          default: null
        },
        completed: {
          type: Boolean,
          default: false
        },
        certificate: {
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
