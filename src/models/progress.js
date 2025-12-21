// src/models/progress.js
const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
