 const Item = require("../models/fooditem");
const cloudinary = require("../config/cloudinary");

// ============================================================
// UPLOAD BUFFER TO CLOUDINARY
// ============================================================

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
// CREATE ITEM
// ============================================================

const createItem = async (req, res) => {
  try {
    // --------------------------------------------------------
    // CHECK IMAGE
    // --------------------------------------------------------

    if (!req.files?.image) {
      return res.status(400).json({
        success: false,
        message: "Item image is required",
      });
    }

    // --------------------------------------------------------
    // REQUIRED FIELDS
    // --------------------------------------------------------

    const {
      restaurantId,
      name,
      description,
      price,
      category,
      isVeg,
      isAvailable,
      preparationTime,
      discount,
    } = req.body;

    if (
      !restaurantId ||
      !name ||
      price === undefined ||
      !category ||
      preparationTime === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "restaurantId, name, price, category and preparationTime are required",
      });
    }

    // --------------------------------------------------------
    // UPLOAD ITEM IMAGE
    // --------------------------------------------------------

    const imageResult = await uploadToCloudinary(
      req.files.image[0].buffer,
      "cravio/items"
    );

    // --------------------------------------------------------
    // CREATE ITEM
    // --------------------------------------------------------

    const item = await Item.create({
      restaurantId,
      name,
      description,
      image: imageResult.secure_url,
      price,
      category,
      isVeg,
      isAvailable,
      preparationTime,
      discount,
    });

    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    console.error("Item creation error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET ALL ITEMS
// ============================================================

const getItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("restaurantId", "Rname Rimage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    console.error("Get items error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET SINGLE ITEM
// ============================================================

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id).populate(
      "restaurantId",
      "Rname Rimage Rbanner rating"
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Get item error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET ITEMS BY RESTAURANT
// ============================================================

const getItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const items = await Item.find({
      restaurantId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    console.error("Get restaurant items error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// UPDATE ITEM
// ============================================================

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    // --------------------------------------------------------
    // FIND ITEM
    // --------------------------------------------------------

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // --------------------------------------------------------
    // UPDATE IMAGE IF NEW IMAGE PROVIDED
    // --------------------------------------------------------

    let image = item.image;

    if (req.files?.image) {
      const imageResult = await uploadToCloudinary(
        req.files.image[0].buffer,
        "cravio/items"
      );

      image = imageResult.secure_url;
    }

    // --------------------------------------------------------
    // UPDATE ITEM
    // --------------------------------------------------------

    const {
      restaurantId,
      name,
      description,
      price,
      category,
      isVeg,
      isAvailable,
      preparationTime,
      discount,
    } = req.body;

    item.restaurantId = restaurantId ?? item.restaurantId;
    item.name = name ?? item.name;
    item.description = description ?? item.description;
    item.price = price ?? item.price;
    item.category = category ?? item.category;
    item.isVeg = isVeg ?? item.isVeg;
    item.isAvailable = isAvailable ?? item.isAvailable;
    item.preparationTime =
      preparationTime ?? item.preparationTime;
    item.discount = discount ?? item.discount;
    item.image = image;

    const updatedItem = await item.save();

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Update item error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// DELETE ITEM
// ============================================================

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Delete item error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  createItem,
  getItems,
  getItemById,
  getItemsByRestaurant,
  updateItem,
  deleteItem,
};