
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  registerUser,
  verifyOTP as verifyOTPApi,
  resendOTP as resendOTPApi,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../api/authapi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState("");

  // ================================
  // REGISTER
  // ================================

  const register = async (userData) => {
    try {
      setAuthError("");

      const data = await registerUser(userData);

      if (data.success && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      }

      return data;
    } catch (error) {
      console.error("Register error:", error);
      setAuthError(error.message || "Registration failed");
      throw error;
    }
  };

  // ================================
  // VERIFY OTP
  // ================================

  const verifyOTP = async (email, otp) => {
    try {
      setAuthError("");

      const data = await verifyOTPApi({
        email,
        otp,
      });

      if (data.success && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      }

      return data;
    } catch (error) {
      console.error("Verify OTP error:", error);
      setAuthError(error.message || "OTP verification failed");
      throw error;
    }
  };

  // ================================
  // RESEND OTP
  // ================================

  const resendOTP = async (email) => {
    try {
      setAuthError("");

      const data = await resendOTPApi(email);

      return data;
    } catch (error) {
      console.error("Resend OTP error:", error);
      setAuthError(error.message || "Failed to resend OTP");
      throw error;
    }
  };

  // ================================
  // LOGIN
  // ================================

  const login = async (email, password) => {
    try {
      setAuthError("");

      const data = await loginUser({
        email,
        password,
      });

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      setAuthError(error.message || "Login failed");
      throw error;
    }
  };

  // ================================
  // GET CURRENT USER
  // ================================

  const getMe = async () => {
    try {
      const data = await getCurrentUser();

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
      }

      return data;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  // ================================
  // CHECK AUTH ON APP LOAD
  // ================================

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await getMe();
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoadingAuth(false);
      }
    };

    checkAuthentication();
  }, []);

  // ================================
  // LOGOUT
  // ================================

  const logout = async () => {
    try {
      setAuthError("");

      const data = await logoutUser();

      setUser(null);
      setIsAuthenticated(false);

      return data;
    } catch (error) {
      console.error("Logout error:", error);
      setAuthError(error.message || "Logout failed");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loadingAuth,
        authError,
        register,
        verifyOTP,
        resendOTP,
        login,
        getMe,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}

