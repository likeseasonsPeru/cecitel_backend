const jwt = require("jsonwebtoken");
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const { jwtSecret } = require("../config");
const { removeImage } = require("../utils");
const { teacherModel, courseModel } = require("../models");

module.exports = {
  // Debe agregarse ala hora de la compra del curso, despues de la verificacion
  addingOne: async (req, res, next) => {
    try {
      const { idTeacher, idCourse, idStudent } = req.body;
      const teacher = await teacherModel.findById(idTeacher);
      req.status = { status: false };
      if (teacher) {
        let i = teacher.courses.findIndex(t => t._id == idCourse);
        if (i !== -1) {
          let courseFound = teacher.courses[i];
          let assistance = [];
          if (courseFound.numLessons) {
            for (let j = 1; j <= courseFound.numLessons; j++) {
              assistance = [...assistance, { order: j }];
            }
          }
          courseFound.students.push({ idStudent, assistance });
          await teacher.save();
          req.status.status = true;
          next();
        }
      }
    } catch (err) {
      req.status = { ...req.status, ...err };
    }
  },

  //
  updateAssistanceList: async (req, res) => {
    try {
      const { idTeacher, idCourse, students } = req.body;
      const teacher = await teacherModel.findById(idTeacher);
      if (teacher) {
        let i = teacher.courses.findIndex(t => t._id == idCourse);
        if (i !== -1) {
          let courseFound = teacher.courses[i];
          courseFound.students = students;
          await teacher.save();
        }
        return res.status(200).json({
          status: true,
          msg: "Modificado correctamente",
          data: teacher
        });
      } else {
        return res
          .status(202)
          .json({ status: false, msg: "No se encontro profesor con este id" });
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  }
};
