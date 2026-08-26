require("dotenv").config();
const express = require("express");
const cors = require("cors");
const restaurantRoutes = require("./routes/RestaurantRoutes");
const app = express();
const connectDB = require("./config/db");
const uploadRoutes = require("./routes/uploadroute");
const itemRoutes = require("./routes/itemroute");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Cravio Backend is Running 🚀",
  });
});
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5001;
connectDB();
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cravio backend is healthy",
  });
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Cravio server running on port ${PORT}`);
});