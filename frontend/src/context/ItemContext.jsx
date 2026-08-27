import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getItems,
  getItemsByRestaurant,
} from "../api/itemapi";

const ItemContext = createContext(null);

export function ItemProvider({ children }) {
  // ============================================================
  // ALL ITEMS
  // ============================================================

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [itemError, setItemError] = useState("");

  // ============================================================
  // RESTAURANT ITEMS
  // ============================================================

  const [restaurantItems, setRestaurantItems] = useState([]);
  const [loadingRestaurantItems, setLoadingRestaurantItems] =
    useState(false);
  const [restaurantItemsError, setRestaurantItemsError] =
    useState("");

  // ============================================================
  // GET ALL ITEMS
  // ============================================================

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoadingItems(true);
        setItemError("");

        const data = await getItems();

        console.log("ALL ITEMS API:", data);

        const itemsData = Array.isArray(data)
          ? data
          : data.items || [];

        setItems(itemsData);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setItemError("Failed to load items");
        setItems([]);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, []);

  // ============================================================
  // GET ITEMS BY RESTAURANT
  // ============================================================

  const getRestaurantItems = async (restaurantId) => {
    try {
      setLoadingRestaurantItems(true);
      setRestaurantItemsError("");

      console.log(
        "Fetching items for restaurant:",
        restaurantId
      );

      const data = await getItemsByRestaurant(restaurantId);

      console.log("RESTAURANT ITEMS API:", data);

      /*
        Supports both:

        {
          items: [...]
        }

        and

        [...]
      */

      const restaurantItemsData = Array.isArray(data)
        ? data
        : data.items || [];

      console.log(
        "RESTAURANT ITEMS ARRAY:",
        restaurantItemsData
      );

      setRestaurantItems(restaurantItemsData);

      return restaurantItemsData;
    } catch (error) {
      console.error(
        "Failed to fetch restaurant items:",
        error
      );

      setRestaurantItemsError(
        "Failed to load restaurant menu"
      );

      setRestaurantItems([]);

      return [];
    } finally {
      setLoadingRestaurantItems(false);
    }
  };

  // ============================================================
  // GET ITEM BY ID
  // ============================================================

  const getItemById = (id) => {
    return items.find(
      (item) =>
        String(item._id) === String(id) ||
        String(item.id) === String(id)
    );
  };

  // ============================================================
  // POPULAR ITEMS
  // ============================================================

  const popularItems = [...items]
    .filter((item) => item.orderCount > 0)
    .sort(
      (a, b) =>
        (b.orderCount || 0) -
        (a.orderCount || 0)
    );

  // ============================================================
  // AVAILABLE ITEMS
  // ============================================================

  const availableItems = items.filter(
    (item) => item.isAvailable !== false
  );

  // ============================================================
  // PROVIDER
  // ============================================================

  return (
    <ItemContext.Provider
      value={{
        // All items
        items,

        // Popular items
        popularItems,

        // Available items
        availableItems,

        // Single item
        getItemById,

        // Restaurant menu
        restaurantItems,
        getRestaurantItems,
        loadingRestaurantItems,
        restaurantItemsError,

        // All items loading/error
        loadingItems,
        itemError,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

// ============================================================
// CUSTOM HOOK
// ============================================================

export function useItems() {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error(
      "useItems must be used inside an ItemProvider"
    );
  }

  return context;
}