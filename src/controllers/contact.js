const { contactModel } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    const contacts = await contactModel.find();
    return res.status(200).json({
      status: true,
      data: contacts
    });
  },

  createOne: async (req, res) => {
    try {
      const { names, email, phone, time, message } = req.body;
      const newContact = new contactModel({
        names,
        email,
        phone,
        time,
        message
      });
      const contact = await newContact.save();
      return res.status(201).json({
        status: true,
        msg: "Agregado correctamente",
        data: contact
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        msg: "Ocurrio un error",
        err: err.message
      });
    }
  }
};
