const { userModel } = require("../models");
const { removeFile } = require("../utils");
module.exports = {
  createOne: async (req, res, next) => {
    try {
      let user = await userModel.findById(req.params.id);
      if (user) {
        user.courses.push(req.body);
        await user.save();
        req.user = user;
        next();
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

  updateOne: async (req, res, next) => {
    try {
      const { course, progress, score, completed, certificate } = req.body;
      let updateQuery = {};
      if (course) Object.assign(updateQuery, { "courses.$.course": course });
      if (progress)
        Object.assign(updateQuery, { "courses.$.progress": progress });
      if (score) Object.assign(updateQuery, { "courses.$.score": score });
      if (completed !== null)
        Object.assign(updateQuery, { "courses.$.completed": completed });

      if (req.file_names) {
        Object.assign(updateQuery, {
          "courses.$.certificate": req.file_names[0].name
        });
      }

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
          else {
            if (post && score) {
              req.user = post;
              // remove olf file
              if (req.file_names) {
                let i = post.courses.findIndex(c => c._id == req.params.id);
                i !== -1 && removeFile(post.courses[i].certificate);
              }
              next();
            } else
              return res.status(200).json({
                status: true,
                msg: "Modificado correctamente",
                data: post
              });
          }
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
    userModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { courses: { course: req.body.course } } },
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
