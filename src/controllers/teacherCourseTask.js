const jwt = require("jsonwebtoken");
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const { jwtSecret } = require("../config");
const { removeFile } = require("../utils");
const { teacherModel, courseModel } = require("../models");

module.exports = {
  createOne: async (req, res) => {
    try {
      const { idCourse, title, date } = req.body;
      const teacher = await teacherModel.findById(req.params.id);
      if (teacher) {
        let i = teacher.courses.findIndex(t => t._id == idCourse);
        console.log(i);
        if (i !== -1) {
          let courseFound = teacher.courses[i];
          console.log(courseFound);
          courseFound.tasks.push({
            title,
            date,
            files: req.file_names ? req.file_names : []
          });
          await teacher.save();
          return res.status(201).json({
            status: true,
            msg: "Agregado correctamente",
            data: teacher
          });
        } else {
          req.file_names && removeFile(req.file_names);
          return res.status(202).json({
            status: false,
            msg: "No se encontro un curso con este id"
          });
        }
      } else {
        req.file_names && removeFile(req.file_names);
        return res.status(202).json({
          status: false,
          msg: "No se encontro profesor con este id"
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  removeOne: async (req, res) => {
    const { idCourse, idTask } = req.body;
    const teacher = await teacherModel.findById(req.params.id);
    if (teacher) {
      let i = teacher.courses.findIndex(t => t._id == idCourse);
      if (i !== -1) {
        let courseFound = teacher.courses[i];
        let e = courseFound.tasks.findIndex(t => t._id == idTask);
        e !== -1 &&
          removeFile(courseFound.tasks[e].files) &&
          courseFound.tasks.splice(e, 1);
        await teacher.save()
        return res.status(200).json({
          status: (e !== -1),
          msg: e !== -1 ? "Eliminado correctamente" : "No hay tarea con este id"
        });
      }
    } else
      return res.status(202).json({
        status: false,
        msg: "No se encontro un profesor con este id"
      });
  }
};
