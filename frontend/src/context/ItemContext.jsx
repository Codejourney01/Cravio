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

const ItemContext = createContext();

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
  // FETCH ALL ITEMS
  // ============================================================

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();

        setItems(data.items || []);
      } catch (error) {
        console.error("Failed to fetch items:", error);

        setItemError("Failed to load items");
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

      const data = await getItemsByRestaurant(restaurantId);

      const restaurantItemsData = data.items || [];

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
        item._id === id ||
        item.id === id
    );
  };

  // ============================================================
  // POPULAR ITEMS
  // ============================================================

  const popularItems = [...items]
    .filter((item) => item.orderCount > 0)
    .sort(
      (a, b) => b.orderCount - a.orderCount
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

        // Popular
        popularItems,

        // Available
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
  return useContext(ItemContext);
}