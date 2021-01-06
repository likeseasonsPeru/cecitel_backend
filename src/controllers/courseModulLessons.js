const { courseModel } = require("../models");

module.exports = {
  createOneByModulId: async (req, res) => {
    courseModel.findOneAndUpdate(
      { "modules._id": req.params.id },
      { $push: { "modules.$.lessons": req.body } },
      (err, course) => {
        if (err)
          return res.status(500).json({
            status: false,
            msg: "Ocurrio un error",
            err: err.message
          });
        else
          return res.status(200).json({
            status: true,
            msg: "Se agrego correctamente",
            data: course
          });
      }
    );
  },

  updateOneByModulId: async (req, res) => {
    const { title, duration, urlVideo } = req.body;
    let updateQuery = {};
    if (title)
      Object.assign(updateQuery, { "modules.$[l].lessons.$[e].title": title });
    if (duration)
      Object.assign(updateQuery, {
        "modules.$[l].lessons.$[e].duration": duration
      });
    if (urlVideo) {
      Object.assign(updateQuery, {
        "modules.$[l].lessons.$[e].urlVideo": urlVideo
      });
    }
    courseModel.findOneAndUpdate(
      { "modules._id": req.params.id },
      { $set: updateQuery },
      {
        arrayFilters: [{ "l._id": req.params.id }, { "e._id": req.body._id }],
        returnNewDocument: true
      },
      (err, course) => {
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
            data: course
          });
      }
    );
  },

  removeOneByModulId: async (req, res) => {
    console.log(req.body._id);
    courseModel.findOneAndUpdate(
      { "modules._id": req.params.id },
      {
        $pull: { "modules.$.lessons": { _id: req.body._id } }
      },
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
