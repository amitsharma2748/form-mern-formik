const Form = require("../models/formModel");
exports.postform = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dateOfBirth,
      age,
    } = req.body;
    const formData = await Form.create({
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dateOfBirth,
      age,
    });

    return res.status(200).json({
      success: true,
      formData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
exports.getData = async (req, res, next) => {
  try {
    const formData = await Form.findById(req.params.id);

    res.status(200).json({
      success: true,
      formData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
