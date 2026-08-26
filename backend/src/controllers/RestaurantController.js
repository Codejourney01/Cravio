const Restaurant = require("../models/restaurants");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(buffer);
  });
};

// ============================================================
// CREATE RESTAURANT
// ============================================================

const createRestaurant = async (req, res) => {
  try {
    if (!req.files?.Rimage || !req.files?.Rbanner) {
      return res.status(400).json({
        success: false,
        message: "Restaurant image and banner are required",
      });
    }

    const imageResult = await uploadToCloudinary(
      req.files.Rimage[0].buffer,
      "cravio/restaurants"
    );

    const bannerResult = await uploadToCloudinary(
      req.files.Rbanner[0].buffer,
      "cravio/restaurant-banners"
    );

    const restaurant = await Restaurant.create({
      ...req.body,
      Rimage: imageResult.secure_url,
      Rbanner: bannerResult.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Restaurant Created Successfully",
      restaurant,
    });
  } catch (error) {
    console.error("Restaurant creation error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET ALL RESTAURANTS
// ============================================================

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .select(
        "Rname Rimage Rbanner rating cuisines deliveryTime priceForTwo"
      )
      .lean();

    res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.error("Get restaurants error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET RESTAURANT BY ID
// ============================================================

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error("Get restaurant by ID error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
};