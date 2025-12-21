require("dotenv").config();

const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const authRouter = require("./routes/auth");

const assignmentRouter = require("./routes/assignment");
const submissionRouter = require("./routes/submission");
const progressRouter = require("./routes/progress");
const studentRouter = require("./routes/student");
const studentDashboardRouter = require("./routes/studentDashboard");
const facultyRouter = require("./routes/faculty");
const adminRouter = require("./routes/admin");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);

app.use("/api/assignments", assignmentRouter);
app.use("/api/submissions", submissionRouter);
app.use("/api/progress", progressRouter);
app.use("/api/students", studentRouter);
app.use("/api/students", studentDashboardRouter);
app.use("/teacher", facultyRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

connectDB()
  .then(() => {
    console.log("MongoDB connection successful");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection failed:", err);
  });

module.exports = app;
