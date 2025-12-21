// src/controllers/subjectController.js
const Subject = require("../models/subject");

exports.createSubject = async (req, res) => {
  try {
    const { name, classLevel, description } = req.body;

    const subject = await Subject.create({
      name,
      classLevel,
      description,
      teacher: req.user._id,
    });

    res.status(201).json({ success: true, subject });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSubjectsByClass = async (req, res) => {
  try {
    const subjects = await Subject.find({
      classLevel: req.params.classLevel,
      isActive: true,
    }).populate("teacher", "name email");

    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
