import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getRestaurants } from "../api/restuarantapi";

const RestaurantContext = createContext();

export function RestaurantProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [restaurantError, setRestaurantError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();

        setRestaurants(data.restaurants || []);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);

        setRestaurantError("Failed to load restaurants");
      } finally {
        setLoadingRestaurants(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Popular restaurants
  const popularRestaurants = restaurants.filter(
    (restaurant) => restaurant.rating >= 4
  );

  // Get restaurant by ID
  const getRestaurantById = (id) => {
    return restaurants.find(
      (restaurant) =>
        restaurant._id === id || restaurant.id === id
    );
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        popularRestaurants,
        getRestaurantById,
        loadingRestaurants,
        restaurantError,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurants() {
  return useContext(RestaurantContext);
}