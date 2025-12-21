const express = require("express");
const userAuth = require("../middleWares/auth");
const authorizeRoles = require("../middleWares/authorizeRoles");
const User = require("../models/user");
const Class = require("../models/class");

const router = express.Router();

router.get(
  "/dashboard",
  userAuth,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const totalStudents = await User.countDocuments({ role: "student" });
      const totalTeachers = await User.countDocuments({ role: "teacher" });

      res.json({
        message: "Admin Dashboard",
        stats: {
          students: totalStudents,
          teachers: totalTeachers,
        },
        admin: req.user,
      });
    } catch (err) {
      console.error("Admin dashboard error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/teachers", userAuth, authorizeRoles("admin"), async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("-password");

    res.json({
      count: teachers.length,
      teachers,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put(
  "/teachers/:id/approve",
  userAuth,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const teacher = await User.findById(req.params.id);

      if (!teacher || teacher.role !== "teacher") {
        return res.status(404).json({ message: "Teacher not found" });
      }

      teacher.status = "approved";
      await teacher.save();

      res.json({
        message: "Teacher approved successfully",
        teacher,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/classes", userAuth, authorizeRoles("admin"), async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("classTeacher", "firstName lastName emailId")
      .populate("students", "firstName lastName");

    res.json({
      count: classes.length,
      classes,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put(
  "/classes/:id/teacher",
  userAuth,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { teacherId } = req.body;

      const teacher = await User.findById(teacherId);
      if (!teacher || teacher.role !== "teacher") {
        return res.status(404).json({ message: "Teacher not found" });
      }

      const classData = await Class.findById(req.params.id);
      if (!classData) {
        return res.status(404).json({ message: "Class not found" });
      }

      classData.classTeacher = teacherId;
      await classData.save();

      res.json({
        message: "Teacher assigned successfully",
        class: classData,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.put(
  "/classes/:id/student",
  userAuth,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { studentId } = req.body;

      const student = await User.findById(studentId);
      if (!student || student.role !== "student") {
        return res.status(404).json({ message: "Student not found" });
      }

      const classData = await Class.findById(req.params.id);
      if (!classData) {
        return res.status(404).json({ message: "Class not found" });
      }

      if (classData.students.includes(studentId)) {
        return res.status(400).json({ message: "Student already added" });
      }

      classData.students.push(studentId);
      await classData.save();

      res.json({
        message: "Student added to class",
        class: classData,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
