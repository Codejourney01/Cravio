
const User = require("../models/users");
const Restaurant = require("../models/restaurants");

// ============================================================
// ADD RESTAURANT TO FAVORITES
// ============================================================

const addFavoriteRestaurant = async (req, res) => {
  try {
    // ----------------------------------------------------------
    // CHECK LOGIN SESSION
    // ----------------------------------------------------------

    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to add a restaurant to favorites",
      });
    }

    // ----------------------------------------------------------
    // GET RESTAURANT ID FROM URL
    // ----------------------------------------------------------

    const { id } = req.params;

    // ----------------------------------------------------------
    // CHECK IF RESTAURANT EXISTS
    // ----------------------------------------------------------

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // ----------------------------------------------------------
    // FIND LOGGED-IN USER
    // ----------------------------------------------------------

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ----------------------------------------------------------
    // CHECK IF ALREADY FAVORITED
    // ----------------------------------------------------------

    const alreadyFavorite = user.favoriteRestaurants.some(
      (restaurantId) => restaurantId.toString() === id
    );

    if (alreadyFavorite) {
      return res.status(400).json({
        success: false,
        message: "Restaurant is already in favorites",
        isFavorite: true,
      });
    }

    // ----------------------------------------------------------
    // ADD RESTAURANT TO FAVORITES
    // $addToSet PREVENTS DUPLICATES
    // ----------------------------------------------------------

    user.favoriteRestaurants.addToSet(restaurant._id);

    await user.save();

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Restaurant added to favorites",
      isFavorite: true,
      restaurantId: restaurant._id,
    });
  } catch (error) {
    console.error("Add favorite restaurant error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ============================================================
// REMOVE RESTAURANT FROM FAVORITES
// ============================================================

const removeFavoriteRestaurant = async (req, res) => {
  try {
    // ----------------------------------------------------------
    // CHECK LOGIN SESSION
    // ----------------------------------------------------------

    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to remove a restaurant from favorites",
      });
    }

    // ----------------------------------------------------------
    // GET RESTAURANT ID FROM URL
    // ----------------------------------------------------------

    const { id } = req.params;

    // ----------------------------------------------------------
    // CHECK IF RESTAURANT EXISTS
    // ----------------------------------------------------------

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // ----------------------------------------------------------
    // FIND LOGGED-IN USER
    // ----------------------------------------------------------

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ----------------------------------------------------------
    // CHECK IF RESTAURANT IS CURRENTLY FAVORITED
    // ----------------------------------------------------------

    const isFavorite = user.favoriteRestaurants.some(
      (restaurantId) => restaurantId.toString() === id
    );

    if (!isFavorite) {
      return res.status(400).json({
        success: false,
        message: "Restaurant is not in favorites",
        isFavorite: false,
      });
    }

    // ----------------------------------------------------------
    // REMOVE RESTAURANT FROM FAVORITES
    // ----------------------------------------------------------

    user.favoriteRestaurants.pull(restaurant._id);

    await user.save();

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Restaurant removed from favorites",
      isFavorite: false,
      restaurantId: restaurant._id,
    });
  } catch (error) {
    console.error("Remove favorite restaurant error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ============================================================
// GET FAVORITE RESTAURANTS
// ============================================================

const getFavoriteRestaurants = async (req, res) => {
  try {
    // ----------------------------------------------------------
    // CHECK LOGIN SESSION
    // ----------------------------------------------------------

    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to view favorite restaurants",
      });
    }

    // ----------------------------------------------------------
    // FIND LOGGED-IN USER AND POPULATE FAVORITE RESTAURANTS
    // ----------------------------------------------------------

    const user = await User.findById(req.session.userId)
      .populate(
        "favoriteRestaurants",
        "Rname Rimage Rbanner rating cuisines deliveryTime priceForTwo"
      )
      .select("favoriteRestaurants");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,
      count: user.favoriteRestaurants.length,
      favoriteRestaurants: user.favoriteRestaurants,
    });
  } catch (error) {
    console.error("Get favorite restaurants error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



// ============================================================
// EXPORT
// ============================================================

module.exports = {
  addFavoriteRestaurant,
  removeFavoriteRestaurant,
  getFavoriteRestaurants
};

