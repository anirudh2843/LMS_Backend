const express = require("express");
const userAuth = require("../middleWares/auth");
const authorizeRoles = require("../middleWares/authorizeRoles");
const User = require("../models/user");

const router = express.Router();

// GET /api/students/:id/dashboard
router.get(
  "/:id/dashboard",
  userAuth,
  authorizeRoles("student", "teacher", "admin"),
  async (req, res) => {
    try {
      const { id } = req.params;

      // If the requester is a student, ensure they can only access their own dashboard
      if (req.user.role === "student" && req.user._id.toString() !== id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const student = await User.findById(id).select("-password");

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Build dashboard payload. Extend with real aggregates as needed.
      const dashboard = {
        profile: {
          id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          emailId: student.emailId,
          photoUrl: student.photoUrl,
          role: student.role,
          createdAt: student.createdAt,
        },
        stats: {
          enrolledCourses: 0,
          completedCourses: 0,
          notifications: 0,
        },
      };

      return res.json({ dashboard });
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
