const { userModel } = require("../models");
module.exports = {
  createOne: async (req, res) => {
    try {
      let user = await userModel.findById(req.params.id);
      if (user) {
        user.courses.push(req.body);
        await user.save();
        return res.status(201).json({
          status: true,
          msg: "Se agrego correctamente",
          data: user
        });
      } else
        return res
          .status(202)
          .json({ status: false, msg: "No se encontro usuario con este id" });
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
      let user = await userModel.findById(req.params.id);
      const { idCourse, course, startDate, endDate, teacher } = req.body;
      if (user) {
        let i = user.courses.findIndex(c => c._id == idCourse);
        if (i !== -1) {
          let courseFound = user.courses[i];
          if (course) courseFound.course = course;
          if (startDate) courseFound.startDate = startDate;
          if (endDate) courseFound.endDate = endDate;
          if (teacher) courseFound.teacher = teacher;
          await user.save();
        }
        return res.status(200).json({
          status: true,
          msg: "Modificado correctamente",
          data: user
        });
      } else
        return res
          .status(202)
          .json({ status: false, msg: "No se encontro usuario con este id" });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  removeOne: async (req, res) => {
    try {
      let user = await userModel.findById(req.params.id);
      if (user) {
        const { idCourse } = req.body;
        let i = user.courses.findIndex(c => c._id == idCourse);
        i !== -1 && user.courses.splice(i, 1);
        await user.save();
        return res.status(200).json({
          status: true,
          msg: "Eliminado correctamente"
        });
      } else
        return res
          .status(202)
          .json({ status: false, msg: "No se encontro usuario con este id" });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  }
};
