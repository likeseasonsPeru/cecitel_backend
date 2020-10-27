const { teacherModel } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    const courses = await teacherModel.find();
    res.json(courses);
  },
  createOne: async (req, res) => {
    const {
      name,
      surname,
      email,
      password,
      category,
      position,
      description
    } = req.body;
    const filename = req.file_name;
    try {
      const newTeacher = new teacherModel({
        name,
        surname,
        email,
        password,
        category,
        position,
        description,
        videoUrl: filename ? `${filename}` : null
      });
      const teacher = await newTeacher.save();
      res.status(201).json({ status: true, teacher });
    } catch (err) {
      res.status(500).json({ status: false, err: err.message });
    }
  },
  getOne: async (req, res) => {
    const teacher = await teacherModel.findById(req.params.id);
    if (teacher) return res.json({ status: true, teacher });
    else
      return res.json({
        status: false,
        msg: "No se encontro curso con este id"
      });
  }
};
