const express = require("express");

const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
} = require("../controllers/RestaurantController");

const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "Rimage", maxCount: 1 },
    { name: "Rbanner", maxCount: 1 },
  ]),
  createRestaurant
);

router.get("/", getRestaurants);

router.get("/:id", getRestaurantById);

module.exports = router;