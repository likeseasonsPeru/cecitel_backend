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
      const { course, progress, score, completed, certificate } = req.body;
      let updateQuery = {};
      if (course) Object.assign(updateQuery, { "courses.$.course": course });
      if (progress)
        Object.assign(updateQuery, { "courses.$.progress": progress });
      if (score) Object.assign(updateQuery, { "courses.$.score": score });
      if (completed !== null)
        Object.assign(updateQuery, { "courses.$.completed": completed });
      if (certificate)
        Object.assign(updateQuery, { "courses.$.certificate": certificate });

      userModel.findOneAndUpdate(
        { "courses._id": req.params.id },
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
              msg: "Modificado correctamente"
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
    userModel.findOneAndUpdate(
      { "courses._id": req.params.id },
      { $pull: { courses: { _id: req.params.id } } },
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
  }
};
