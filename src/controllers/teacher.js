const jwt = require('jsonwebtoken');
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const { jwtSecret } = require('../config')
const { teacherModel } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    const courses = await teacherModel.find({},{courses: 0});
    res.json(courses);
  },


  // Registro de profesores
  createOne: async (req, res) => {
    const {
      name,
      surname,
      email,
      password,
      category,
      position,
      description
    } = req.body;
    const encryptPassword = await encryptPassword(password)
    const filename = req.file_name;
    try {
      const newTeacher = new teacherModel({
        name,
        surname,
        email,
        password: encryptedPassword,
        category,
        position,
        description,
        videoUrl: filename ? `${filename}` : null
      });
      const teacher = await newTeacher.save();
      res.status(201).json({ status: true, teacher });
    } catch (err) {
      res.status(500).json({ status: false, err: err.message });
    }
  },
  getOne: async (req, res) => {
    const teacher = await teacherModel.findById(req.params.id);
    if (teacher) return res.json({ status: true, teacher });
    else
      return res.json({
        status: false,
        msg: "No se encontro curso con este id"
      });
  }
};
