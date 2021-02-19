const { examModel } = require("../models");
const { courseModel } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    const exams = await examModel.find();
    return res.status(200).json({ status: true, data: exams });
  },

  getOne: async (req, res) => {
    try {
      const exam = await examModel.findById(req.params.id);
      if (exam) return res.status(200).json({ status: true, data: exam });
      return res.status(422).json({
        status: false,
        msg: "No se encontro exam con este id"
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  createOne: async (req, res) => {
    try {
      const { course, contain } = req.body;
      if (course) {
        const courseFound = await courseModel.findById(course);
        if (courseFound && contain) {
          const newExam = new examModel({
            course,
            contain
          });
          const exam = await newExam.save();
          return res.status(201).json({
            status: true,
            msg: "Agregado correctamente",
            data: exam
          });
        }
      }
      return res.status(422).json({
        status: false,
        msg: "Faltan datos para la creacion"
      });
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
      const { course, contain } = req.body;
      let updateQuery = {};
      course && Object.assign(updateQuery, { course });
      contain && Object.assign(updateQuery, { contain });
      examModel.findByIdAndUpdate(req.params.id, updateQuery, (err, post) => {
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
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  removeOne: async (req, res) => {
    examModel.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        return res.status(500).json({
          status: false,
          msg: "Ocurrio un error",
          err: err.message
        });
      } else {
        return res
          .status(200)
          .json({ status: true, msg: "Eliminado correctamente" });
      }
    });
  }
};
