const { teacherModel, courseModel } = require("../models");

module.exports = {
  createOne: async (req, res) => {
    try {
      let teacher = await teacherModel.findById(req.params.id);
      if (teacher) {
        teacher.courses.push(req.body);
        await teacher.save();
        return res.status(201).json({
          status: true,
          msg: "Se agrego correctamente",
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
  },

  updateOne: async (req, res) => {
    try {
      let teacher = await teacherModel.findById(req.params.id);
      const {idCourse, course, startDate, endDate, numLessons} = req.body;
      if (teacher) {
        let i = teacher.courses.findIndex(t => t._id == idCourse);
        if (i !== -1) {
          let teacherFound = teacher.courses[i];
          if (course) teacherFound.course = course;
          if (startDate) teacherFound.startDate = startDate;
          if (endDate) teacherFound.endDate = endDate;
          if (numLessons) teacherFound.numLessons = numLessons;
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
    }catch (err){
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  removeOne: async (req, res) => {
    try {
      let teacher = await teacherModel.findById(req.params.id);
      if (teacher) {
        const { idCourse } = req.body;
        let i = teacher.courses.findIndex(t => t._id == idCourse);
        i !== -1 && teacher.courses.splice(i, 1);
        await teacher.save();
        return res
          .status(200)
          .json({
            status: true,
            msg: "Eliminado correctamente",
          });
      } else {
        return res
          .status(202)
          .json({ status: false, msg: "No se encontro profesor con este id" });
      }
    } catch (err){
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  }
};
