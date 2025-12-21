// src/controllers/chapterController.js
const Chapter = require("../models/chapter");

exports.createChapter = async (req, res) => {
  try {
    const chapter = await Chapter.create(req.body);
    res.status(201).json(chapter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChaptersBySubject = async (req, res) => {
  try {
    const chapters = await Chapter.find({
      subject: req.params.subjectId,
      isPublished: true,
    }).sort("order");

    res.json(chapters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
