
const API_URL = import.meta.env.VITE_API_URL;

export const getFavoriteRestaurants = async () => {
  const response = await fetch(
    `${API_URL}/favorites/restaurants`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch favourite restaurants"
    );
  }

  return data;
};

export const addFavoriteRestaurant = async (restaurantId) => {
  const response = await fetch(
    `${API_URL}/favorites/restaurants/${restaurantId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to add restaurant to favourites"
    );
  }

  return data;
};

export const removeFavoriteRestaurant = async (restaurantId) => {
  const response = await fetch(
    `${API_URL}/favorites/restaurants/${restaurantId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to remove restaurant from favourites"
    );
  }

  return data;
};

