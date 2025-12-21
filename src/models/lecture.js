// src/models/lecture.js
const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    lectureType: {
      type: String,
      enum: ["video", "pdf", "quiz", "live"],
      required: true,
    },
    videoUrl: String,
    pdfUrl: String,
    duration: Number, // minutes

    isFreePreview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lecture", lectureSchema);
