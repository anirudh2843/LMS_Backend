const express = require("express");
const userAuth = require("../middleWares/auth");
const authorizeRoles = require("../middleWares/authorizeRoles");

const router = express.Router();

router.get("/dashboard", userAuth, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Admin Dashboard",
    user: req.user,
  });
});

module.exports = router;
