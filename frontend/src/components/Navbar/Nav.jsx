
import React, { useState } from "react";
import {
  FiMapPin,
  FiChevronDown,
  FiMenu,
  FiShoppingCart,
  FiHeart,
  FiSearch,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({
  setIsSidebarOpen,
  showSearch = true,
}) {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, loadingAuth, logout } = useAuth();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ==========================================
  // USER INFO
  // ==========================================

  const displayName =
    user?.username ||
    user?.name ||
    "User";

  const profileImage =
    user?.profileImage ||
    user?.image ||
    null;

  // ==========================================
  // INITIAL AVATAR
  // ==========================================

  const getInitial = () => {
    return displayName.charAt(0).toUpperCase();
  };

  const avatarColors = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-emerald-500",
    "bg-indigo-500",
    "bg-rose-500",
    "bg-amber-500",
  ];

  const getAvatarColor = (name) => {
    let total = 0;

    for (let i = 0; i < name.length; i++) {
      total += name.charCodeAt(i);
    }

    return avatarColors[total % avatarColors.length];
  };

  const avatarColor = getAvatarColor(displayName);

  // ==========================================
  // AVATAR COMPONENT
  // ==========================================

  const Avatar = ({ size = "h-8 w-8", textSize = "text-xs" }) => {
    if (profileImage) {
      return (
        <img
          src={profileImage}
          alt={displayName}
          className={`${size} rounded-full object-cover`}
        />
      );
    }

    return (
      <div
        className={`${size} ${avatarColor} flex items-center justify-center rounded-full font-semibold text-white`}
      >
        <span className={textSize}>
          {getInitial()}
        </span>
      </div>
    );
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ==========================================
  // ACCOUNT
  // ==========================================

  const handleAccount = () => {
    setIsProfileOpen(false);
    navigate("/account");
  };

  // ==========================================
  // ORDERS
  // ==========================================

  const handleOrders = () => {
    setIsProfileOpen(false);
    navigate("/orders");
  };

  // ==========================================
  // SIGN IN
  // ==========================================

  const handleSignIn = () => {
    navigate("/login");
  };

  // ==========================================
  // CREATE ACCOUNT
  // ==========================================

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <header className="w-full">

      {/* =================================================
          MOBILE TOP BAR
      ================================================= */}

      <div className="flex h-[50px] items-center justify-between px-4 min-[721px]:hidden">

        {/* MENU */}

        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
          className="mt-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <FiMenu
            size={21}
            strokeWidth={1.8}
            className="text-heading"
          />
        </button>

        {/* MOBILE RIGHT */}

        <div className="mt-4 flex items-center gap-3">

          {/* THEME */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={isDark ? "Light mode" : "Dark mode"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.07)] transition-all duration-200 hover:shadow-md"
          >
            {isDark ? (
              <FiSun
                size={15}
                strokeWidth={1.8}
                className="text-cravio"
              />
            ) : (
              <FiMoon
                size={15}
                strokeWidth={1.8}
                className="text-cravio"
              />
            )}
          </button>

          {/* PROFILE */}

          {!loadingAuth && (
            <>
              {isAuthenticated ? (
                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setIsProfileOpen(!isProfileOpen)
                    }
                    aria-label="Open profile menu"
                    className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-gray-100"
                  >
                    <Avatar />
                  </button>

                  {/* MOBILE DROPDOWN */}

                  {isProfileOpen && (
                    <div className="absolute right-0 top-11 z-50 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">

                      {/* USER INFO */}

                      <div className="border-b border-gray-100 px-3 py-3">
                        <p className="truncate text-xs font-semibold text-heading">
                          {displayName}
                        </p>

                        {user?.email && (
                          <p className="mt-0.5 truncate text-[10px] text-subheading">
                            {user.email}
                          </p>
                        )}
                      </div>

                      {/* ACCOUNT */}

                      <button
                        type="button"
                        onClick={handleAccount}
                        className="block w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium text-heading transition hover:bg-gray-50"
                      >
                        My Account
                      </button>

                      {/* ORDERS */}

                      <button
                        type="button"
                        onClick={handleOrders}
                        className="block w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium text-heading transition hover:bg-gray-50"
                      >
                        My Orders
                      </button>

                      {/* LOGOUT */}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium text-red-500 transition hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="rounded-lg bg-cravio px-4 py-2 text-[11px] font-semibold text-white shadow-[0_4px_12px_rgba(255,90,31,0.20)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(255,90,31,0.25)] active:translate-y-0"
                >
                  Sign in
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* =================================================
          DESKTOP NAVBAR
      ================================================= */}

      <div className="flex w-full items-center justify-between px-4 py-3 md:px-10">

        {/* ADDRESS */}

        <div className="hidden min-[721px]:flex items-center">
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-subheading transition-colors duration-200 hover:text-heading"
          >
            <FiMapPin
              className="text-lg text-cravio"
              strokeWidth={1.8}
            />

            <span>
              Select Your Address
            </span>

            <FiChevronDown
              className="text-subheading"
              size={15}
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* SEARCH */}

        {showSearch && (
          <div className="flex w-full items-center justify-center min-[721px]:flex-1 min-[721px]:px-10">
            <div className="mt-4 flex h-[40px] w-[95%] items-center rounded-md bg-white px-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] min-[721px]:mt-0 min-[721px]:w-full min-[721px]:max-w-[500px]">

              <FiSearch
                className="shrink-0 text-subheading"
                size={14}
                strokeWidth={1.8}
              />

              <input
                type="text"
                placeholder="What are you craving for...?"
                className="ml-2 w-full bg-transparent text-[12px] text-heading outline-none placeholder:text-subheading"
              />
            </div>
          </div>
        )}

        {/* DESKTOP RIGHT SIDE */}

        <div className="hidden min-[721px]:flex items-center gap-3">

          {/* CART */}

          <button
            type="button"
            onClick={() => navigate("/cart")}
            aria-label="Shopping cart"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.07)] transition-all duration-200 hover:text-cravio hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)]"
          >
            <FiShoppingCart
              size={14}
              className="text-cravio"
              strokeWidth={1.8}
            />
          </button>

          {/* FAVORITES */}

          <button
            type="button"
            onClick={() => navigate("/favorites")}
            aria-label="Favorites"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.07)] transition-all duration-200 hover:text-cravio hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)]"
          >
            <FiHeart
              size={14}
              strokeWidth={1.8}
              className="text-cravio"
            />
          </button>

          {/* USER */}

          {!loadingAuth && (
            <>
              {isAuthenticated ? (
                <div className="relative">

                  {/* PROFILE BUTTON */}

                  <button
                    type="button"
                    onClick={() =>
                      setIsProfileOpen(!isProfileOpen)
                    }
                    className="ml-1 flex cursor-pointer items-center gap-2"
                  >

                    {/* PROFILE IMAGE / INITIAL */}

                    <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-gray-100">
                      <Avatar />
                    </div>

                    {/* USERNAME */}

                    <div className="flex items-center gap-1">
                      <span className="max-w-[120px] truncate text-[12px] font-medium text-heading">
                        {displayName}
                      </span>

                      <FiChevronDown
                        size={14}
                        strokeWidth={1.8}
                        className="text-subheading"
                      />
                    </div>
                  </button>

                  {/* PROFILE DROPDOWN */}

                  {isProfileOpen && (
                    <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">

                      {/* USER INFO */}

                      <div className="border-b border-gray-100 px-3 py-3">

                        <div className="flex items-center gap-2.5">

                          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                            <Avatar
                              size="h-9 w-9"
                              textSize="text-sm"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-heading">
                              {displayName}
                            </p>

                            <p className="truncate text-[10px] text-subheading">
                              {user?.email}
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* ACCOUNT */}

                      <button
                        type="button"
                        onClick={handleAccount}
                        className="block w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium text-heading transition hover:bg-gray-50"
                      >
                        My Account
                      </button>

                      {/* ORDERS */}

                      <button
                        type="button"
                        onClick={handleOrders}
                        className="block w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium text-heading transition hover:bg-gray-50"
                      >
                        My Orders
                      </button>

                      {/* LOGOUT */}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium text-red-500 transition hover:bg-red-50"
                      >
                        Logout
                      </button>

                    </div>
                  )}
                </div>
              ) : (
                /* NOT LOGGED IN */

                <div className="ml-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCreateAccount}
                    className="rounded-lg bg-cravio px-4 py-2 text-[12px] font-semibold text-white shadow-[0_4px_12px_rgba(255,90,31,0.18)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(255,90,31,0.25)] active:translate-y-0"
                  >
                    Create account
                  </button>
                </div>
              )}
            </>
          )}

          {/* THEME BUTTON */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={isDark ? "Light mode" : "Dark mode"}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.07)] transition-all duration-200 hover:text-cravio hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)]"
          >
            {isDark ? (
              <FiSun
                size={15}
                strokeWidth={1.8}
                className="text-cravio"
              />
            ) : (
              <FiMoon
                size={15}
                strokeWidth={1.8}
                className="text-cravio"
              />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}

