const express = require("express");
const userAuth = require("../middleWares/auth");
const authorizeRoles = require("../middleWares/authorizeRoles");

const router = express.Router();

router.get("/dashboard", userAuth, authorizeRoles("faculty"), (req, res) => {
  res.json({
    message: "Faculty Dashboard",
    user: req.user,
  });
});

module.exports = router;
