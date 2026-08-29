const express = require("express");

const {
  register,
  verifyOTP,
  resendOTP,
  login,
  getMe,
  logout,
} = require("../controllers/authcontroller");

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);

router.post("/login", login);
router.get("/me", getMe);
router.post("/logout", logout);

module.exports = router;