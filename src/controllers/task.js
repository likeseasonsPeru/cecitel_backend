const { taskModel } = require("../models");
const { courseModel } = require("../models");
const crypto = require("crypto");

module.exports = {
  getAll: async (req, res) => {
    const tasks = await taskModel.find({}, { students: 0 });
    return res.status(200).json({ status: true, data: tasks });
  },

  getOne: async (req, res) => {
    try {
      const task = await taskModel.findById(req.params.id);
      if (task) return res.status(200).json({ status: true, data: task });
      else
        return res.status(202).json({
          status: false,
          msg: "No se encontro tarea con este id"
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
      let { course, teacher, date, title } = req.body;
      if (course) {
        const courseFound = await courseModel.findById(course);
        if (courseFound) {
          const filename = req.file_names;
          const newTask = new taskModel({
            course,
            title,
            url: filename ? filename[0] : null,
            teacher,
            date,
            students: courseFound.students,
            total: courseFound.students.lenght
          });
          const task = await newTask.save();
          return res.status(201).json({
            status: true,
            msg: "Agregado correctamente",
            data: task
          });
        }
      }
      return res.status(200).json({
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

  updateStudentTask: async (req, res) => {
    const filename = req.file_names;
    const task = await taskModel.findByIdAndUpdate(req.params.id, {url: filename ? filename[0] : null, });
  },

  removeOne: async (req, res) => {
    taskModel.findByIdAndRemove(req.params.id, async (err, task) => {
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
