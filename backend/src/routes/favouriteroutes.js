
const express = require("express");

const {
  getFavoriteRestaurants,
  addFavoriteRestaurant,
  removeFavoriteRestaurant,
} = require("../controllers/Favouritecontroller");

const router = express.Router();

router.get("/restaurants", getFavoriteRestaurants);

router.post("/restaurants/:restaurantId", addFavoriteRestaurant);

router.delete("/restaurants/:restaurantId", removeFavoriteRestaurant);

module.exports = router;

