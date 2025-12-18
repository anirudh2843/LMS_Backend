const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      index: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
    },
    age: {
      type: Number,
    },
    photoUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1217986760/vector/man-stand-pose-thin-line-icon-man-in-front-pose-with-arms-down-at-the-waist-outline-style.jpg?s=612x612&w=0&k=20&c=qp4A2XR8msxdygYJUkwMStBfrMFAX_aj7XAOP_Ogau4=",
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function () {
  const user = this;

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordByUser, passwordHash);
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
