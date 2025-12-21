const express = require("express");
const router = express.Router();

const auth = require("../middleWares/auth");
const authorizeRoles = require("../middleWares/authorizeRoles");

const { markLectureComplete } = require("../controllers/progressController");

// ✅ Correct route
router.post("/complete", auth, authorizeRoles("student"), markLectureComplete);

module.exports = router;
