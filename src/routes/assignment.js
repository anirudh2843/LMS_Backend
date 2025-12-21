const express = require("express");
const router = express.Router();

const auth = require("../middleWares/auth");
const authorizeRoles = require("../middleWares/authorizeRoles");

const {
  createAssignment,
  getAssignmentsBySubject,
} = require("../controllers/assignmentController");

// Create assignment (Teacher)
router.post("/", auth, authorizeRoles("teacher"), createAssignment);

// Get assignments by subject (Student/Teacher)
router.get("/subject/:subjectId", auth, getAssignmentsBySubject);

module.exports = router;
