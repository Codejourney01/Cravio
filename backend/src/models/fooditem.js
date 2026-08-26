const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    // ==========================================
    // RESTAURANT CONNECTION
    // ==========================================
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    // ==========================================
    // ITEM INFORMATION
    // ==========================================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    // ==========================================
    // PRICING
    // ==========================================
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // ==========================================
    // CATEGORY
    // ==========================================
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // FOOD INFORMATION
    // ==========================================
    isVeg: {
      type: Boolean,
      default: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    // ==========================================
    // ITEM PERFORMANCE
    // ==========================================
    orderCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ==========================================
    // PREPARATION
    // ==========================================
    preparationTime: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
