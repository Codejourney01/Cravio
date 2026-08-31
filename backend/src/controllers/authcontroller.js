
const bcrypt = require("bcrypt");
const { BrevoClient } = require("@getbrevo/brevo");
const User = require("../models/users");
const OTP = require("../models/otp");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

// ==========================================
// REGISTER
// ==========================================

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;


    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    success: false,
    message: "Please enter a valid email address",
  });
}

if (password.length < 8) {
  return res.status(400).json({
    success: false,
    message: "Password must be at least 8 characters",
  });
}

if (!/[A-Z]/.test(password)) {
  return res.status(400).json({
    success: false,
    message: "Password must contain at least one uppercase letter",
  });
}

if (!/[a-z]/.test(password)) {
  return res.status(400).json({
    success: false,
    message: "Password must contain at least one lowercase letter",
  });
}

if (!/\d/.test(password)) {
  return res.status(400).json({
    success: false,
    message: "Password must contain at least one number",
  });
}

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const otpCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const hashedOTP = await bcrypt.hash(otpCode, 10);

    const expiresAt = new Date(
      Date.now() + 5 * 60 * 1000
    );

    await OTP.create({
      email,
      otp: hashedOTP,
      expiresAt,
    });

    try {
      await brevo.transactionalEmails.sendTransacEmail({
        sender: {
          name: "Cravio",
          email: process.env.BREVO_EMAIL,
        },
        to: [
          {
            email,
            name: username,
          },
        ],
        subject: "Cravio - Verify Your Email",
        htmlContent: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: auto;
            padding: 20px;
          ">
            <h2>Welcome to Cravio 🍴</h2>

            <p>Hi ${username},</p>

            <p>
              Thank you for creating a Cravio account.
              Please use the OTP below to verify your email address.
            </p>

            <div style="
              background: #f5f5f5;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
            ">
              <h1 style="letter-spacing: 10px;">
                ${otpCode}
              </h1>
            </div>

            <p>
              This OTP will expire in
              <strong>5 minutes</strong>.
            </p>

            <p>
              If you didn't create a Cravio account,
              you can safely ignore this email.
            </p>

            <p>— Team Cravio</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Brevo error:", emailError);

      await User.findByIdAndDelete(user._id);
      await OTP.deleteMany({ email });

      return res.status(500).json({
        success: false,
        message: "Could not send verification email",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to your email.",
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================================
// VERIFY OTP
// ==========================================

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    const otpRecord = await OTP.findOne({ email })
      .sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({
        _id: otpRecord._id,
      });

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    const isOTPValid = await bcrypt.compare(
      otp.toString(),
      otpRecord.otp
    );

    if (!isOTPValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.isVerified = true;

    await user.save();

    await OTP.deleteOne({
      _id: otpRecord._id,
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================================
// RESEND OTP
// ==========================================

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    await OTP.deleteMany({ email });

    const otpCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const hashedOTP = await bcrypt.hash(otpCode, 10);

    const expiresAt = new Date(
      Date.now() + 5 * 60 * 1000
    );

    await OTP.create({
      email,
      otp: hashedOTP,
      expiresAt,
    });

    try {
      await brevo.transactionalEmails.sendTransacEmail({
        sender: {
          name: "Cravio",
          email: process.env.BREVO_EMAIL,
        },
        to: [
          {
            email,
            name: user.username,
          },
        ],
        subject: "Cravio - Your New Verification Code",
        htmlContent: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: auto;
            padding: 20px;
          ">
            <h2>Cravio Email Verification 🍴</h2>

            <p>Hi ${user.username},</p>

            <p>
              Here is your new verification code:
            </p>

            <div style="
              background: #f5f5f5;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
            ">
              <h1 style="letter-spacing: 10px;">
                ${otpCode}
              </h1>
            </div>

            <p>
              This OTP will expire in
              <strong>5 minutes</strong>.
            </p>

            <p>
              If you didn't request a new OTP,
              you can safely ignore this email.
            </p>

            <p>— Team Cravio</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Brevo resend OTP error:", emailError);

      await OTP.deleteMany({ email });

      return res.status(500).json({
        success: false,
        message: "Could not send OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "New OTP sent successfully",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================================
// LOGIN
// ==========================================


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ==========================================
    // CREATE LOGIN SESSION
    // ==========================================

    req.session.userId = user._id.toString();

    // Explicitly save the session before responding
    req.session.save((error) => {
      if (error) {
        console.error("Session save error:", error);

        return res.status(500).json({
          success: false,
          message: "Could not create login session",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Login successful",

        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
          membership: user.membership,
        },
      });
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



// ==========================================
// GET CURRENT USER
// ==========================================

const getMe = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await User.findById(
      req.session.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================================
// LOGOUT
// ==========================================

const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error);

      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  });
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  register,
  verifyOTP,
  resendOTP,
  login,
  getMe,
  logout,
};

