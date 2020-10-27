const { courseModel } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    const courses = await courseModel.find();
    res.json(courses);
  },
  createOne: async (req, res) => {
    const {
      name,
      category,
      review,
      teacher,
      materials,
      objectives,
      duration,
      difficulty,
      price,
      limit
    } = req.body;
    try {
      const newCourse = new courseModel({
        name,
        category,
        review,
        teacher,
        materials,
        objectives,
        duration,
        difficulty,
        price,
        limit
      });
      const course = await newCourse.save();
      res.status(201).json({ status: true, course });
    } catch (err) {
      res.status(500).json({ status: false, err: err.message });
    }
  },
  getOne: async (req, res) => {
    const course = await courseModel.findById(req.params.id);
    if (course) return res.json({ status: true, course });
    else
      return res.json({
        status: false,
        msg: "No se encontro curso con este id"
      });
  },
  updateOne: async (req, res) => {
    const {
      name,
      category,
      review,
      teacher,
      materials,
      objectives,
      duration,
      difficulty,
      price,
      limit
    } = req.body;
    const course = await courseModel.findById(req.params.id);
    if (course) {
      if (name) course.name = name;
      if (category) course.category = category;
      if (review) course.review = category;
      if (teacher) course.teacher = teacher;
      if (materials) course.materials = materials;
      if (objectives) course.objectives = objectives;
      if (duration) course.duration = duration;
      if (difficulty) course.difficulty = difficulty;
      if (price) course.price = price;
      if (limit) course.limit = limit;
      try {
        const courseSaved = await course.save();
        res.status(200).json({ status: true, course: courseSaved });
      } catch (err) {
        res.status(500).json({ status: false, err: err.message });
      }
    } else {
      return res.json({
        status: false,
        msg: "No se encontro curso con este id"
      });
    }
  },
  removeOne: async (req, res) => {
    courseModel.findByIdAndRemove(req.params.id, async (err, post) => {
      if (err)
        return res.json({
          status: false,
          msg: "No se elimino ningun curso",
          err: err.message
        });
      else {
        res.status(200).json({ status: true, course: post });
      }
    });
  }
};
