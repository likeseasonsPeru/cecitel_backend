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
        const newCourse = new courseModel({ name, videoUrl: `${filename}` });
        const course = await newCourse.save();
        res.status(201).json({ status: true, course });
      } else {
        res.status(422).json({ status: false, err: "video file not found" });
      }
    } catch (err) {
      res.status(500).json({ status: false, err: err.message });
    }
  }
};
