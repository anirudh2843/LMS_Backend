// src/controllers/progressController.js
const Progress = require("../models/progress");

exports.markLectureComplete = async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      {
        student: req.user._id,
        lecture: req.body.lectureId,
      },
      {
        completed: true,
        completedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
