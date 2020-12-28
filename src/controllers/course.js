const { courseModel } = require("../models");
const { removeImage } = require("../utils/index");

module.exports = {
  getAll: async (req, res) => {
    const courses = await courseModel.find({}, { modules: 0 });
    res.status(200).json({
      status: true,
      data: courses
    });
  },

  createOne: async (req, res) => {
    try {
      let {
        name,
        category,
        review,
        teacher,
        materials,
        objectives,
        duration,
        difficulty,
        price,
        limit,
        certificate,
        schedule,
        startDate
      } = req.body;
      const filename = req.file_names;
      duration = duration
        ? duration.hours
          ? duration
          : JSON.parse(duration)
        : null;
      difficulty = difficulty
        ? difficulty.level
          ? difficulty
          : JSON.parse(difficulty)
        : null;
      const newCourse = new courseModel({
        name,
        category,
        review,
        teacher,
        materials,
        objectives,
        duration: duration
          ? {
              hours: duration.hours,
              months: duration.months,
              timesxWeek: duration.timesxWeek
            }
          : null,
        difficulty: difficulty
          ? { level: difficulty.level, description: difficulty.description }
          : null,
        price,
        limit,
        schedule,
        startDate,
        certificate:
          certificate == "Gratuito" || certificate == "De pago"
            ? certificate
            : null,
        image: filename ? filename[0] : null
      });
      const course = await newCourse.save();
      res
        .status(201)
        .json({ status: true, msg: "Agregado correctamente", data: course });
    } catch (err) {
      req.file_names && removeImage(req.file_names);
      res
        .status(500)
        .json({ status: false, msg: "Ocurrio un error", err: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const course = await courseModel
        .findById(req.params.id)
        .populate({ path: "teacher", select: "-courses" });
      if (course) return res.status(200).json({ status: true, course });
      else
        return res.status(202).json({
          status: false,
          msg: "No se encontro curso con este id"
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
      limit,
      schedule,
      startDate
    } = req.body;
    const filename = req.file_names;
    try {
      const course = await courseModel.findById(req.params.id);
      if (course) {
        if (name) course.name = name;
        if (category) course.category = category;
        if (review) course.review = category;
        if (teacher) course.teacher = teacher;
        if (materials) course.materials = materials;
        if (objectives) course.objectives = objectives;
        if (duration)
          course.duration = duration.hours ? duration : JSON.parse(duration);
        if (difficulty)
          course.difficulty = difficulty.level
            ? difficulty
            : JSON.parse(difficulty);
        if (price) course.price = price;
        if (limit) course.limit = limit;
        if (schedule) course.schedule = schedule;
        if (startDate) course.startDate = startDate;
        if (filename) {
          removeImage(course.image);
          course.image = filename[0];
        }

        await course.save();
        res.status(200).json({
          status: true,
          msg: "Modificado correctamente",
          data: course
        });
      } else {
        filename && removeImage(filename);
        return res.status(202).json({
          status: false,
          msg: "No se encontro curso con este id"
        });
      }
    } catch (err) {
      filename && removeImage(filename);
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  removeOne: async (req, res) => {
    courseModel.findByIdAndRemove(req.params.id, async (err, course) => {
      if (err)
        return res.status(500).json({
          status: false,
          msg: "Ocurrio un error",
          err: err.message
        });
      else {
        course && removeImage(course.image);
        return res
          .status(200)
          .json({ status: true, msg: "Eliminado correctamente" });
      }
    });
  },

  getByFilter: async (req, res) => {
    try {
      const { category, duration, difficulty, certificate } = req.body;
      let Query = {};
      category && Object.assign(Query, { category });
      duration && Object.assign(Query, { "duration.hours": duration });
      difficulty && Object.assign(Query, { "difficulty.level": difficulty });
      certificate && Object.assign(Query, { certificate });
      const courses = await courseModel.find(Query);
      res.json(courses);
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  }
};
