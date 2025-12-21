// src/controllers/lectureController.js
const Lecture = require("../models/lecture");

exports.createLecture = async (req, res) => {
  try {
    const lecture = await Lecture.create(req.body);
    res.status(201).json(lecture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLecturesByChapter = async (req, res) => {
  try {
    const lectures = await Lecture.find({
      chapter: req.params.chapterId,
    });

    res.json(lectures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
