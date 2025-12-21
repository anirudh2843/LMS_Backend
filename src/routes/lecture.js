const express = require("express");
const router = express.Router();

const auth = require("../middleWares/auth");
const authorizeRoles = require("../middleWares/authorizeRoles");

const {
  createLecture,
  getLecturesByChapter,
} = require("../controllers/lectureController");

// Teacher creates lecture
router.post("/", auth, authorizeRoles("teacher"), createLecture);

// Get lectures by chapter (Student/Teacher/Admin)
router.get("/chapter/:chapterId", auth, getLecturesByChapter);

module.exports = router;
