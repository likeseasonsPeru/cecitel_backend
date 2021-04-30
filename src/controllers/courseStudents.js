const { courseModel } = require("../models");
const { removeFile } = require("../utils/index");
module.exports = {
  createOneByIdUser: async (req, res) => {
    try {
      const student = req.params.id;
      let course = await courseModel.findById(req.body.course);
      if (course) {
        let assistance = [];

        if (course.numLessons) {
          for (let i = 0; i < course.numLessons; i++) {
            assistance.push({
              order: i + 1
            });
          }
        }
        let newStudent = {
          student,
          assistance
        };

        course.students.push(newStudent);

        await course.save();
        return res.status(201).json({
          status: true,
          msg: "Agregado correctamente",
          data: req.user
        });
      } else
        return res
          .status(422)
          .json({ status: false, msg: "No se encontro curso con este id" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  updateOneByIdUser: async (req, res) => {
    try {
      const { /* student, */ score } = req.body;
      let updateQuery = {};
      /* if (student) Object.assign(updateQuery, { "students.$.student": student }); */
      if (score) Object.assign(updateQuery, { "students.$.score": score });
      courseModel.findOneAndUpdate(
        { "students.student": req.user._id },
        updateQuery,
        (err, post) => {
          if (err)
            return res.status(500).json({
              status: false,
              msg: "Ocurrio un error",
              err: err.message
            });
          else
            return res.status(200).json({
              status: true,
              msg: "Modificado correctamente",
              data: req.user
            });
        }
      );
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  removeOne: async (req, res) => {
    courseModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { students: { student: req.body.student } } },
      (err, post) => {
        if (err)
          return res.status(500).json({
            status: false,
            msg: "Ocurrio un error",
            err: err.message
          });
        else
          return res.status(200).json({
            status: true,
            msg: "Eliminado correctamente"
          });
      }
    );
  },

  //**************  Controller for another controllers   **************** */

  createOneByCourseId: async (userId, course) => {
    try {
      /* const course = await courseModel.findById(courseId); */
      if (course) {
        let assistance = [];
        if (course.numLessons && course.category == 'Semiprecencial') {
          for (let i = 0; i < course.numLessons; i++) {
            assistance.push({
              order: i + 1
            });
          }
        }
        let newStudent = {
          student: userId,
          assistance
        };
        course.students.push(newStudent);
        await course.save();
      }
    } catch (err) {
      console.log(err);
    }
  }
};
