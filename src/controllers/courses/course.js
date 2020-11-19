const { courseModel } = require("../../models");

module.exports = {
  getAll: async (req, res) => {
    const courses = await courseModel.find();
    res.status(200).json({
      status: true,
      data: courses
    });
  },

  createOne: async (req, res) => {
    try {
      const {
        name,
        category,
        review,
        materials,
        objectives,
        duration,
        difficulty,
        price,
        limit,
        certificate
      } = req.body;
      const newCourse = new courseModel({
        name,
        category,
        review,
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
        certificate:
          certificate == "Gratuito" || certificate == "De pago"
            ? certificate
            : null
      });
      const course = await newCourse.save();
      res
        .status(201)
        .json({ status: true, msg: "Se agrego adecuadamente", data: course });
    } catch (err) {
      res
        .status(500)
        .json({ status: false, msg: "Ocurrio un error", err: err.message });
    }
  },

  getOne: async (req, res) => {
    const course = await courseModel.findById(req.params.id);
    if (course) return res.status(200).json({ status: true, course });
    else
      return res.status(202).json({
        status: false,
        msg: "No se encontro curso con este id"
      });
  },

  modifyTeacherByCourseID: async (req, res) => {
    const course = await courseModel.findById(req.params.id);
    if (course) {
      try {
        const { name, surname, description, position } = req.body;
        course.teacher = {
          name,
          surname,
          description,
          position,
          image: req.file_name
            ? `${req.file_name}`
            : course.teacher
            ? course.teacher.image
            : null
        };

        await course.save();
        return res.status(201).json({
          status: true,
          msg: "Se agrego adecuadamente",
          data: course
        });
      } catch (err) {
        return res
          .status(500)
          .json({ status: false, msg: "Ocurrio un error", err: err.message });
      }
    } else {
      return res
        .status(202)
        .json({ status: false, msg: "No se encontro curso con este id" });
    }
  },

  updateOne: async (req, res) => {
    const {
      name,
      category,
      review,
      materials,
      objectives,
      duration,
      difficulty,
      price,
      limit
    } = req.body;
    try {
      const course = await courseModel.findById(req.params.id);
      if (course) {
        if (name) course.name = name;
        if (category) course.category = category;
        if (review) course.review = category;
        if (materials) course.materials = materials;
        if (objectives) course.objectives = objectives;
        if (duration) course.duration = duration;
        if (difficulty) course.difficulty = difficulty;
        if (price) course.price = price;
        if (limit) course.limit = limit;

        const courseSaved = await course.save();
        res.status(200).json({
          status: true,
          msg: "Se modifico correctamente",
          data: courseSaved
        });
      } else {
        return res.status(202).json({
          status: false,
          msg: "No se encontro curso con este id"
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Hubo un error al intentar modificar el curso",
        err: err.message
      });
    }
  },

  removeOne: async (req, res) => {
    courseModel.findByIdAndRemove(req.params.id, async (err, post) => {
      if (err)
        return res.status(500).json({
          status: false,
          msg: "No se elimino ningun curso",
          err: err.message
        });
      else {
        res.status(200).json({ status: true, msg: "Se elimino correctamente" });
      }
    });
  },

  getByFilter: async (req, res) => {
    const { category, duration, difficulty, certificate } = req.body;
    let Query = {};
    category && Object.assign(Query, { category });
    duration && Object.assign(Query, { "duration.hours": duration });
    difficulty && Object.assign(Query, { "difficulty.level": difficulty });
    certificate && Object.assign(Query, { certificate });
    const courses = await courseModel.find(Query);
    res.json(courses);
  }
};
