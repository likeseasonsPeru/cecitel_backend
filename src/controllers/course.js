const { courseModel } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    const courses = await courseModel.find();
    res.json(courses);
  },
  createOne: async (req, res) => {
    const { name } = req.body;
    const filename = req.file_name;

    try {
      if (filename) {
        const newCourse = new courseModel({ name, videoUrl: filename });
        const course = await newCourse.save();
        res.json({ status: true, course });
      } else {
        res.json({ status: false, err: "Hubo un error al guardar el video" });
      }
    } catch (err) {
      res.json({ status: false, err: err.message });
    }
  }
};
