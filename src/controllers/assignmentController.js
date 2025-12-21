// src/controllers/assignmentController.js
const Assignment = require("../models/assignment");

exports.createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create({
      ...req.body,
      teacher: req.user._id,
    });

    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAssignmentsBySubject = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      subject: req.params.subjectId,
      isActive: true,
    });

    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
