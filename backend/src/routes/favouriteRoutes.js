
const express = require("express");

const {
  addFavoriteRestaurant,
  removeFavoriteRestaurant,
  getFavoriteRestaurants,
} = require("../controllers/FavouriteController");

const router = express.Router();

// ============================================================
// GET ALL FAVORITE RESTAURANTS
// ============================================================

router.get("/restaurants", getFavoriteRestaurants);

// ============================================================
// ADD RESTAURANT TO FAVORITES
// ============================================================

router.post("/restaurants/:id", addFavoriteRestaurant);

// ============================================================
// REMOVE RESTAURANT FROM FAVORITES
// ============================================================

router.delete("/restaurants/:id", removeFavoriteRestaurant);

module.exports = router;

