const express = require("express");
const router = express.Router();

const auth = require("../middleWares/auth");
const authorizeRoles = require("../middleWares/authorizeRoles");

const {
  createChapter,
  getChaptersBySubject,
} = require("../controllers/chapterController");

// Teacher creates chapter
router.post("/", auth, authorizeRoles("teacher"), createChapter);

// Get chapters by subject (Student/Teacher/Admin)
router.get("/subject/:subjectId", auth, getChaptersBySubject);

module.exports = router;
