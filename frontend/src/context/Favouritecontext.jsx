import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getFavoriteRestaurants,
  addFavoriteRestaurant,
  removeFavoriteRestaurant,
} from "../api/favourite";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [favoriteError, setFavoriteError] = useState(null);

  const fetchFavoriteRestaurants = useCallback(async () => {
    try {
      setLoadingFavorites(true);
      setFavoriteError(null);

      const data = await getFavoriteRestaurants();

      setFavoriteRestaurants(data.favorites || []);
    } catch (error) {
      console.error("Fetch favourites error:", error);
      setFavoriteError(error.message);
    } finally {
      setLoadingFavorites(false);
    }
  }, []);

  useEffect(() => {
    fetchFavoriteRestaurants();
  }, [fetchFavoriteRestaurants]);

  const addFavorite = async (restaurantId) => {
    const data = await addFavoriteRestaurant(restaurantId);

    await fetchFavoriteRestaurants();

    return data;
  };

  const removeFavorite = async (restaurantId) => {
    const data = await removeFavoriteRestaurant(restaurantId);

    setFavoriteRestaurants((prev) =>
      prev.filter(
        (restaurant) =>
          String(restaurant._id) !== String(restaurantId)
      )
    );

    return data;
  };

  const isFavorite = useCallback(
    (restaurantId) => {
      return favoriteRestaurants.some(
        (restaurant) =>
          String(restaurant._id) === String(restaurantId)
      );
    },
    [favoriteRestaurants]
  );

  return (
    <FavoriteContext.Provider
      value={{
        favoriteRestaurants,
        loadingFavorites,
        favoriteError,
        fetchFavoriteRestaurants,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoriteProvider"
    );
  }

  return context;
}