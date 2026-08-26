const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    // ================= BASIC INFORMATION =================
    Rname: {
      type: String,
      required: true,
      trim: true,
    },

    Rdescription: {
      type: String,
      required: true,
      trim: true,
    },

    Rimage: {
      type: String,
      required: true,
    },

    Rbanner: {
      type: String,
      required: true,
    },

    // ================= RATING =================
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // ================= DELIVERY =================
    deliveryTime: {
      type: String,
      required: true,
    },

    priceForTwo: {
      type: Number,
      required: true,
    },

    // ================= FOOD =================
    cuisines: [
      {
        type: String,
      },
    ],

    // ================= LOCATION =================
    location: {
      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },
    },

    // ================= RESTAURANT STATUS =================
    isOpen: {
      type: Boolean,
      default: true,
    },

    // ================= ANALYTICS =================
    views: {
      type: Number,
      default: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;