const { taskModel } = require("../models");
const { courseModel } = require("../models");
module.exports = {
  getAll: async (req, res) => {
    const tasks = await taskModel.find();
    return res.status(200).json({ status: true, data: tasks });
  },

  createOne: async (req, res) => {
    try {
      let { course, teacher, date, title } = req.body;
      if (course) {
        const courseFound = await courseModel.findById(course);
        if (courseFound) {
          const newTask = new taskModel({
            course,
            title,
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