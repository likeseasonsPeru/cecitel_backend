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
      let teacher = await teacherModel.findOne({"courses._id": req.params.id});
      const { course, startDate, endDate, numLessons} = req.body;
      if (teacher) {
        let i = teacher.courses.findIndex(t => t._id == req.params.id);
        if (i !== -1) {
          let courseFound = teacher.courses[i];
          if (course) courseFound.course = course;
          if (startDate) courseFound.startDate = startDate;
          if (endDate) courseFound.endDate = endDate;
          if (numLessons) courseFound.numLessons = numLessons;
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
          .json({ status: false, msg: "No se encontro un curso de profesor con este id" });
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
      let teacher = await teacherModel.findOne({"courses._id": req.params.id});
      if (teacher) {
        let i = teacher.courses.findIndex(t => t._id == req.params.id);
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
