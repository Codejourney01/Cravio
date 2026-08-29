const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    profileImage: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    favoriteItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],

    favoriteRestaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],

    forks: {
      type: Number,
      default: 0,
      min: 0,
    },

    membership: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },

    membershipExpiresAt: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    addresses: [
      {
        label: {
          type: String,
          enum: ["home", "work", "other"],
          default: "home",
        },

        address: {
          type: String,
          required: true,
        },

        city: {
          type: String,
          required: true,
        },

        pincode: {
          type: String,
          required: true,
        },

        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);