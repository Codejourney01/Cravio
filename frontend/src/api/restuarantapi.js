const API_URL = "http://localhost:5001/api";

export const getRestaurants = async () => {
  try {
    const response = await fetch(`${API_URL}/restaurants`);

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Restaurant API Error:", error);
    throw error;
  }
};