const express = require("express");

const {
  createItem,
  getItems,
  getItemById,
  getItemsByRestaurant,
  updateItem,
  deleteItem,
} = require("../controllers/ItemController.js");

const upload = require("../middleware/upload");

const router = express.Router();

// Create item
router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createItem
);

// Get all items
router.get("/", getItems);

// Get items of specific restaurant
router.get("/restaurant/:restaurantId", getItemsByRestaurant);

// Get single item
router.get("/:id", getItemById);

// Update item
router.put(
  "/:id",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  updateItem
);

// Delete item
router.delete("/:id", deleteItem);

module.exports = router;