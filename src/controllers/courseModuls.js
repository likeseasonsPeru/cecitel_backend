const { courseModel } = require("../models");
const { removeFile } = require("../utils/index");
module.exports = {
  createOne: async (req, res) => {
    try {
      const { title, duration } = req.body;
      let course = await courseModel.findById(req.params.id);
      if (course) {
        //console.log("Los nombres de archivos son", req.file_names);
        course.modules.push({
          title,
          duration,
          files: req.file_names ? req.file_names.map(f => f.name) : []
        });
        await course.save();
        return res
          .status(201)
          .json({ status: true, msg: "Agregado correctamente", data: course });
      } else {
        // Elimina los archibos si se subieron
        req.file_names && removeFile(req.file_names.map(f => f.name));
        return res
          .status(202)
          .json({ status: false, msg: "No se encontro curso con este id" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  updateOne: async (req, res) => {
    try {
      const { title, duration } = req.body;
      let updateQuery = {};
      if (title) Object.assign(updateQuery, { "modules.$.title": title });
      if (duration)
        Object.assign(updateQuery, { "modules.$.duration": duration });
      if (req.file_names) {
        removeFile(moduleFound.files);
        Object.assign(updateQuery, {
          "modules.$.files": req.file_names.map(f => f.name)
        });
      }
      courseModel.findOneAndUpdate(
        { "modules._id": req.params.id },
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
              data: post
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
    try {
      const course = await courseModel.findOne({
        "modules._id": req.params.id
      });
      if (course) {
        let i = course.modules.findIndex(c => c._id == req.params.id);
        i !== -1 &&
          // elimina los archivos y luego elimina el modulo
          removeFile(course.modules[i].files) &&
          course.modules.splice(i, 1);
        await course.save();
        return res.status(200).json({
          status: true,
          msg: "Eliminado correctamente"
        });
      } else
        return res
          .status(202)
          .json({ status: false, msg: "No hay modulo con este id" });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  }
};
