import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
    let isMounted = true;

    const fetchItems = async () => {
      try {
        setLoadingItems(true);
        setItemError("");

        const data = await getItems();

        const itemsData = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : [];

        if (isMounted) {
          setItems(itemsData);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);

        if (isMounted) {
          setItemError(
            error?.message || "Failed to load items"
          );
          setItems([]);
        }
      } finally {
        if (isMounted) {
          setLoadingItems(false);
        }
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================================
  // GET ITEMS BY RESTAURANT
  // ============================================================

  const getRestaurantItems = useCallback(
    async (restaurantId) => {
      if (!restaurantId) {
        setRestaurantItems([]);
        setRestaurantItemsError("Restaurant ID is required");
        return [];
      }

      try {
        setLoadingRestaurantItems(true);
        setRestaurantItemsError("");

        const data = await getItemsByRestaurant(restaurantId);

        const restaurantItemsData = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : [];

        setRestaurantItems(restaurantItemsData);

        return restaurantItemsData;
      } catch (error) {
        console.error(
          "Failed to fetch restaurant items:",
          error
        );

        setRestaurantItemsError(
          error?.message || "Failed to load restaurant menu"
        );

        setRestaurantItems([]);

        return [];
      } finally {
        setLoadingRestaurantItems(false);
      }
    },
    []
  );

  // ============================================================
  // GET ITEM BY ID
  // ============================================================

  const getItemById = useCallback(
    (id) => {
      if (!id) return undefined;

      return items.find(
        (item) =>
          String(item?._id) === String(id) ||
          String(item?.id) === String(id)
      );
    },
    [items]
  );

  // ============================================================
  // AVAILABLE ITEMS
  // ============================================================

  const availableItems = useMemo(() => {
    return items.filter(
      (item) => item?.isAvailable !== false
    );
  }, [items]);

  // ============================================================
  // POPULAR ITEMS
  // ============================================================

  const popularItems = useMemo(() => {
    return [...items]
      .filter(
        (item) =>
          item?.isAvailable !== false &&
          Number(item?.orderCount || 0) > 0
      )
      .sort(
        (a, b) =>
          Number(b?.orderCount || 0) -
          Number(a?.orderCount || 0)
      );
  }, [items]);

  // ============================================================
  // BEST SELLER ITEMS
  // ============================================================

  const bestSellerItems = useMemo(() => {
    return [...items]
      .filter(
        (item) =>
          item?.isAvailable !== false &&
          (
            item?.isBestSeller === true ||
            item?.bestSeller === true ||
            Number(item?.orderCount || 0) >= 20
          )
      )
      .sort(
        (a, b) =>
          Number(b?.orderCount || 0) -
          Number(a?.orderCount || 0)
      );
  }, [items]);

  // ============================================================
  // COMBO ITEMS
  // ============================================================

  const comboItems = useMemo(() => {
    return items.filter((item) => {
      if (item?.isAvailable === false) return false;

      const category = String(
        item?.category || ""
      ).toLowerCase();

      const type = String(
        item?.type || ""
      ).toLowerCase();

      const name = String(
        item?.name || ""
      ).toLowerCase();

      return (
        category === "combo" ||
        category === "meal combo" ||
        type === "combo" ||
        name.includes("combo")
      );
    });
  }, [items]);

  // ============================================================
  // OFFER ITEMS
  // ============================================================

  const offerItems = useMemo(() => {
    return items.filter(
      (item) =>
        item?.isAvailable !== false &&
        Number(item?.discount || 0) > 0
    );
  }, [items]);

  // ============================================================
  // RESTAURANT AVAILABLE ITEMS
  // ============================================================

  const restaurantAvailableItems = useMemo(() => {
    return restaurantItems.filter(
      (item) => item?.isAvailable !== false
    );
  }, [restaurantItems]);

  // ============================================================
  // RESTAURANT POPULAR ITEMS
  // ============================================================

  const restaurantPopularItems = useMemo(() => {
    return [...restaurantItems]
      .filter(
        (item) =>
          item?.isAvailable !== false &&
          Number(item?.orderCount || 0) > 0
      )
      .sort(
        (a, b) =>
          Number(b?.orderCount || 0) -
          Number(a?.orderCount || 0)
      );
  }, [restaurantItems]);

  // ============================================================
  // RESTAURANT BEST SELLERS
  // ============================================================

  const restaurantBestSellerItems = useMemo(() => {
    return [...restaurantItems]
      .filter(
        (item) =>
          item?.isAvailable !== false &&
          (
            item?.isBestSeller === true ||
            item?.bestSeller === true ||
            Number(item?.orderCount || 0) >= 20
          )
      )
      .sort(
        (a, b) =>
          Number(b?.orderCount || 0) -
          Number(a?.orderCount || 0)
      );
  }, [restaurantItems]);

  // ============================================================
  // RESTAURANT COMBO ITEMS
  // ============================================================

  const restaurantComboItems = useMemo(() => {
    return restaurantItems.filter((item) => {
      if (item?.isAvailable === false) return false;

      const category = String(
        item?.category || ""
      ).toLowerCase();

      const type = String(
        item?.type || ""
      ).toLowerCase();

      const name = String(
        item?.name || ""
      ).toLowerCase();

      return (
        category === "combo" ||
        category === "meal combo" ||
        type === "combo" ||
        name.includes("combo")
      );
    });
  }, [restaurantItems]);

  // ============================================================
  // RESTAURANT OFFER ITEMS
  // ============================================================

  const restaurantOfferItems = useMemo(() => {
    return restaurantItems.filter(
      (item) =>
        item?.isAvailable !== false &&
        Number(item?.discount || 0) > 0
    );
  }, [restaurantItems]);

  // ============================================================
  // PROVIDER
  // ============================================================

  return (
    <ItemContext.Provider
      value={{
        // ======================================================
        // ALL ITEMS
        // ======================================================

        items,
        loadingItems,
        itemError,

        // ======================================================
        // GLOBAL FILTERED ITEMS
        // ======================================================

        availableItems,
        popularItems,
        bestSellerItems,
        comboItems,
        offerItems,

        // ======================================================
        // SINGLE ITEM
        // ======================================================

        getItemById,

        // ======================================================
        // RESTAURANT MENU
        // ======================================================

        restaurantItems,
        loadingRestaurantItems,
        restaurantItemsError,
        getRestaurantItems,

        // ======================================================
        // RESTAURANT FILTERED ITEMS
        // ======================================================

        restaurantAvailableItems,
        restaurantPopularItems,
        restaurantBestSellerItems,
        restaurantComboItems,
        restaurantOfferItems,
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