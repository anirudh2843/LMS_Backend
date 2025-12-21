// src/controllers/submissionController.js
const Submission = require("../models/assignmentSubmission");

exports.submitAssignment = async (req, res) => {
  try {
    const submission = await Submission.create({
      assignment: req.body.assignmentId,
      student: req.user._id,
      answerText: req.body.answerText,
      fileUrl: req.body.fileUrl,
    });

    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.gradeAssignment = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.submissionId,
      {
        marksObtained: req.body.marks,
        feedback: req.body.feedback,
        status: "graded",
      },
      { new: true }
    );

    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
