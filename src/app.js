require("dotenv").config(); 

const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);

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
