const { taskModel } = require("../models");
const { courseModel } = require("../models");
const { removeFile } = require("../utils/index");

const { getCurrentDate } = require("../utils");

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
            url: filename ? filename[0].name : null,
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

  updateOne: async (req, res) => {
    try {
      const { title, date } = req.body;
      let updateQuery = {};
      title && Object.assign(updateQuery, { title });
      date && Object.assign(updateQuery, { date });
      req.file_names &&
        Object.assign(updateQuery, { url: req.file_names[0].name });

      taskModel.findByIdAndUpdate(req.params.id, updateQuery, (err, post) => {
        if (err)
          return res.status(500).json({
            status: false,
            msg: "Ocurrio un error",
            err: err.message
          });
        else {
          post && req.file_names && removeFile(post.url);
          return res.status(200).json({
            status: true,
            msg: "Modificado correctamente",
            data: post
          });
        }
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
    const { student } = req.body;
    const filename = req.file_names;
    
    taskModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        "students.$[element].url": filename ? filename[0].name : null,
        "students.$[element].filename": filename
          ? filename[0].originalname
          : null,
        "students.$[element].date": filename ? getCurrentDate() : null,
        "students.$[element].status": filename ? "Entregado" : "Pendiente"
      },
      {
        arrayFilters: [{ "element.student": student }],
        returnNewDocument: true
      },
      (err, post) => {
        if (err)
          return res.status(500).json({
            status: false,
            msg: "Ocurrio un error",
            err: err.message
          });
        else {
          if (filename && post && student) {
            let i = post.students.findIndex(c => (c.student == student));
            i !== -1 && removeFile(post.students[i].url);
          }
          return res.status(200).json({
            status: true,
            msg: "Modificado correctamente",
            data: post
          });
        }
      }
    );
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
