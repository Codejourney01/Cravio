require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const restaurantRoutes = require("./routes/RestaurantRoutes");
const uploadRoutes = require("./routes/uploadroute");
const authRoutes = require("./routes/authroutes");
const itemRoutes = require("./routes/itemroute");
const favoriteRoutes = require("./routes/favouriteroutes");

const app = express();
const connectDB = require("./config/db");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cravio-rosy.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),

    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
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

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Cravio server running on port ${PORT}`);
});