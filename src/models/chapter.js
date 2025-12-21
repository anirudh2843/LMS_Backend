// src/models/chapter.js
const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    order: {
      type: Number, // Chapter sequence
      required: true,
    },
    description: String,

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
