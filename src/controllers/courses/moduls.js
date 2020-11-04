const { courseModel } = require("../../models");

module.exports = {
  createOne: async (req, res) => {
    try {
      const { title, duration } = req.body;
      let course = await courseModel.findById(req.params.id);
      course.modules = [...{ title, duration }, ...course.modules];
      await course.save();
      return res
        .status(201)
        .json({ status: true, msg: "Se agrego correctamente", data: course });
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
      const { title, duration } = req.body;
      let course = await courseModel.findById(req.params.id);
      let i = course.modules.findIndex(c => c._id == moduleId);
      let msg = ''
      if (i !== -1){
        if (title) course.modules[i].title = title;
        if (duration) course.modules[i].duration = duration;
        await course.save();
      } else {
        
      }
      return res
        .status(200)
        .json({ status: true, msg: "Se modifico correctamente", data: course });
      
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  },

  removeOne: async (req, res) => {
    try {
      const course = await courseModel.findById(req.params.id);
      const { moduleId } = req.body;
      let i = course.modules.findIndex(c => c._id == moduleId);
      i !== -1 && course.modules.splice(i, 1);
      await course.save();
      return res
        .status(200)
        .json({ status: true, msg: "Se elimino correctamente", data:  });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  }
};
