const express = require("express");
const router = express.Router();

const auth = require("../middleWares/auth");
const authorizeRoles = require("../middleWares/authorizeRoles");

const {
  createSubject,
  getSubjectsByClass,
} = require("../controllers/subjectController");

// Create subject (Admin / Teacher)
router.post("/", auth, authorizeRoles("admin", "teacher"), createSubject);

// Get subjects by class (Student / Teacher / Admin)
router.get(
  "/class/:classLevel",
  auth,
  authorizeRoles("student", "teacher", "admin"),
  getSubjectsByClass
);

module.exports = router;
