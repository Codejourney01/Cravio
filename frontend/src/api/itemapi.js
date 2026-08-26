const API_URL = import.meta.env.VITE_API_URL;

// ============================================================
// GET ALL ITEMS
// ============================================================

export const getItems = async () => {
  try {
    const response = await fetch(`${API_URL}/items`);

    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Item API Error:", error);
    throw error;
  }
};

// ============================================================
// GET ITEMS BY RESTAURANT
// ============================================================

export const getItemsByRestaurant = async (restaurantId) => {
  try {
    const response = await fetch(
      `${API_URL}/items/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurant items");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Restaurant Items API Error:", error);
    throw error;
  }
};

// ============================================================
// GET ITEM BY ID
// ============================================================

export const getItemById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/items/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch item");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Single Item API Error:", error);
    throw error;
  }
};