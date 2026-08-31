const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const addFavoriteRestaurant = async (restaurantId) => {
  const response = await fetch(
    `${API_URL}/favorites/restaurants/${restaurantId}`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to add restaurant to favorites");
  }
  return data;
};

export const ViewFavoriteRestuarant = async () => {
  const response = await fetch(`${API_URL}/favorites/restaurants`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to get favorite restaurants");
  }
  return data;
};

export const RemoveFavoriteRestuarant = async (restaurantId) => {
  const response = await fetch(
    `${API_URL}/favorites/restaurants/${restaurantId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.message || "Failed to remove restaurant from favorites",
    );
  }
  return data;
};
