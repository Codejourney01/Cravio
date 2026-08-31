
const User = require("../models/users");

const getFavoriteRestaurants = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to view your favorites",
      });
    }

    const user = await User.findById(userId)
      .populate("favoriteRestaurants");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      favorites: user.favoriteRestaurants,
    });
  } catch (error) {
    console.error("Get favorite restaurants error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch favorite restaurants",
    });
  }
};

const addFavoriteRestaurant = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { restaurantId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to add favorites",
      });
    }

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.favoriteRestaurants.includes(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: "Restaurant is already in favorites",
      });
    }

    user.favoriteRestaurants.push(restaurantId);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Restaurant added to favorites",
      favorites: user.favoriteRestaurants,
    });
  } catch (error) {
    console.error("Add favorite restaurant error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add restaurant to favorites",
    });
  }
};

const removeFavoriteRestaurant = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { restaurantId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to remove favorites",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.favoriteRestaurants = user.favoriteRestaurants.filter(
      (id) => id.toString() !== restaurantId
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Restaurant removed from favorites",
      favorites: user.favoriteRestaurants,
    });
  } catch (error) {
    console.error("Remove favorite restaurant error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove restaurant from favorites",
    });
  }
};

module.exports = {
  getFavoriteRestaurants,
  addFavoriteRestaurant,
  removeFavoriteRestaurant,
};

