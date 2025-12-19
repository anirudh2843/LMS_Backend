const express = require("express");
const userAuth = require("../middleWares/auth");
const authorizeRoles = require("../middleWares/authorizeRoles");
const User = require("../models/user");

const router = express.Router();

router.get("/dashboard", userAuth, authorizeRoles("student"), (req, res) => {
  res.json({
    message: "Student Dashboard",
    user: req.user,
  });
});

module.exports = router;
