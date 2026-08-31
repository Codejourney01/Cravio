
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const restaurantRoutes = require("./routes/RestaurantRoutes");
const uploadRoutes = require("./routes/uploadroute");
const authRoutes = require("./routes/authroutes");
const itemRoutes = require("./routes/itemroute");

const app = express();
const connectDB = require("./config/db");

// IMPORTANT when running behind Render/another reverse proxy
app.set("trust proxy", 1);

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cravio-rosy.vercel.app",
    ],
    credentials: true,
  })
);

// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json());

// ==========================================
// SESSION
// ==========================================

app.use(
  session({
    name: "connect.sid",

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),

    cookie: {
      httpOnly: true,

      // Production frontend/backend are on different origins
      secure: process.env.NODE_ENV === "production",

      // REQUIRED for cross-site cookies in production
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",

      // 7 days
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// ==========================================
// HEALTH
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Cravio Backend is Running 🚀",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cravio backend is healthy",
  });
});

// ==========================================
// ROUTES
// ==========================================

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Cravio server running on port ${PORT}`);
});

