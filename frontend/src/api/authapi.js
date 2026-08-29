
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// ================================
// REGISTER
// ================================

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

// ================================
// VERIFY OTP
// ================================

export const verifyOTP = async (otpData) => {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(otpData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "OTP verification failed");
  }

  return data;
};

// ================================
// RESEND OTP
// ================================

export const resendOTP = async (email) => {
  const response = await fetch(`${API_URL}/auth/resend-otp`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to resend OTP");
  }

  return data;
};

// ================================
// LOGIN
// ================================

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

// ================================
// GET CURRENT USER
// ================================

export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Not authenticated");
  }

  return data;
};

// ================================
// LOGOUT
// ================================

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
};

