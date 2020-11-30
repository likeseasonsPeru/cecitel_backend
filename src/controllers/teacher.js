const jwt = require("jsonwebtoken");
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const { jwtSecret } = require("../config");
const { removeImage } = require("../utils");
const { teacherModel, courseModel } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    const courses = await teacherModel.find({}, { courses: 0 });
    res.json({ status: true, data: courses });
  },

  // Registro de profesores
  createOne: async (req, res) => {
    const { name, email, password, position, description } = req.body;

    try {
      const encryptedPassword = await encryptPassword(password);
      const filename = req.file_names;
      const newTeacher = new teacherModel({
        name,
        email,
        password: encryptedPassword,
        position,
        description,
        image: filename ? filename[0] : null
      });
      newTeacher.save((err, postTeacher) => {
        if (err)
          return res.status(202).json({
            status: false,
            msg: "Ya existe un profesor con este email"
          });
        else return res.status(201).json({ status: true, data: postTeacher });
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: "Ocurrio un error al intentar logearse",
        error: err.message
      });
    }
  },

  getOne: async (req, res) => {
    try {
      const teacher = await teacherModel
        .findById(req.params.id)
        .populate({ path: "courses.course", select: "-modules -teacher, -_id" });
      if (teacher) return res.json({ status: true, data: teacher });
      else
        return res.status(202).json({
          status: false,
          msg: "No se encontro profesor con este id"
        });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ingresa un id valido",
        err: err.message
      });
    }
  },

  updateOne: async (req, res) => {
    try {
      const teacher = await teacherModel.findById(req.params.id);
      if (teacher) {
        const { name, email, password, position, description } = req.body;
        const filename = req.file_names;

        if (name) teacher.name = name;
        if (email) teacher.email = email;
        if (password) teacher.password = await encryptPassword(password);
        if (position) teacher.position = position;
        if (description) teacher.description = description;
        if (filename) {
          removeImage(teacher.image);
          teacher.image = filename[0];
        }

        teacher.save((err, postTeacher) => {
          if (err) {
            return res.status(202).json({
              status: false,
              msg: "Ya existe un profesor con este email"
            });
          } else
            return res
              .status(200)
              .json({
                status: true,
                msg: "Modificado correctamente",
                data: postTeacher
              });
        });
      } else {
        return res.status(202).json({
          status: false,
          msg: "No se encontro profesor con este id"
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Hubo un error",
        err: err.message
      });
    }
  },

  removeOne: async (req, res) => {
    teacherModel.findByIdAndRemove(req.params.id, async (err, teacher) => {
      if (err) {
        res.status(500).json({
          status: false,
          msg: "No se elimino ningun profesor",
          err: err.message
        });
      } else {
        teacher && removeImage(teacher.image);
        res.status(200).json({ status: true, msg: "Eliminado correctamente" });
      }
    });
  }
};
