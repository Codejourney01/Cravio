
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

export default function Navbar({
  setIsSidebarOpen,
  showSearch = true,
}) {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isLoggedIn = false;

  const user = {
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=12",
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    navigate("/");
  };

  const handleAccount = () => {
    setIsProfileOpen(false);
    navigate("/account");
  };

  const handleOrders = () => {
    setIsProfileOpen(false);
    navigate("/orders");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <header className="w-full">
      <div className="flex h-[50px] items-center justify-between px-4 min-[721px]:hidden">
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

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
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

          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Open profile menu"
                className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-gray-100"
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <button
                    type="button"
                    onClick={handleAccount}
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium text-heading transition hover:bg-gray-50"
                  >
                    My Account
                  </button>

                  <button
                    type="button"
                    onClick={handleOrders}
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium text-heading transition hover:bg-gray-50"
                  >
                    My Orders
                  </button>

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
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-4 py-3 md:px-10">
        <div className="hidden min-[721px]:flex items-center">
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-subheading transition-colors duration-200 hover:text-heading"
          >
            <FiMapPin
              className="text-lg text-cravio"
              strokeWidth={1.8}
            />

            <span>Select Your Address</span>

            <FiChevronDown
              className="text-subheading"
              size={15}
              strokeWidth={1.8}
            />
          </button>
        </div>

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

        <div className="hidden min-[721px]:flex items-center gap-3">
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

          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="ml-1 flex cursor-pointer items-center gap-2"
              >
                <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-gray-100">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[12px] font-medium text-heading">
                    {user.name}
                  </span>

                  <FiChevronDown
                    size={14}
                    strokeWidth={1.8}
                    className="text-subheading"
                  />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <button
                    type="button"
                    onClick={handleAccount}
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium text-heading transition hover:bg-gray-50"
                  >
                    My Account
                  </button>

                  <button
                    type="button"
                    onClick={handleOrders}
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium text-heading transition hover:bg-gray-50"
                  >
                    My Orders
                  </button>

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

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
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
