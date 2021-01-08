const mongoose = require("mongoose")
const {Schema} = mongoose

const examSchema = new Schema({
    course: { type: Schema.ObjectId, ref: "course" },
    contain: [
        {
            question: String,
            opcionA: String,
            opcionB: String,
            opcionC: String,
            rpta: String
        }
    ]
})