import React from "react";
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

import { useTheme } from "../../context/ThemeContext";

export default function Nav({ setIsSidebarOpen }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="w-full">
      {/* ================= MOBILE TOP ROW ================= */}
      <div className="flex h-[50px] items-center justify-between px-4 min-[721px]:hidden">
        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="
            mt-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-white
            shadow-sm
          "
        >
          <FiMenu
            size={22}
            strokeWidth={1.8}
            className="text-heading"
          />
        </button>

        {/* ================= MOBILE RIGHT ACTIONS ================= */}
        <div className="mt-4 flex items-center gap-2">
          {/* Dark / Light Mode */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            title={isDark ? "Light mode" : "Dark mode"}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-white
              text-heading
              shadow-[0_3px_12px_rgba(0,0,0,0.07)]
              transition-all
              duration-200
              hover:text-[#FF5A1F]
            "
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

          {/* User Image - Mobile */}
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="John Doe"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <div className="flex w-full items-center justify-between px-4 py-3 md:px-10">
        {/* ================= ADDRESS ================= */}
        <div className="hidden min-[721px]:flex items-center">
          <div className="flex cursor-pointer items-center gap-2 text-sm text-subheading">
            <FiMapPin
              className="text-lg text-[#FF5A1F]"
              strokeWidth={1.8}
            />

            <span>Select Your Address</span>

            <FiChevronDown
              className="text-subheading"
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* ================= SEARCH BAR ================= */}
        <div className="flex w-full items-center justify-center min-[721px]:flex-1 min-[721px]:px-10">
          <div
            className="
              flex
              h-[40px]
              w-[95%]
              items-center
              justify-center
              rounded-md
              bg-white
              px-4
              mt-4
              md:mt-0
              shadow-[0_2px_12px_rgba(0,0,0,0.08)]
              min-[721px]:w-full
              min-[721px]:max-w-[500px]
            "
          >
            {/* Search Icon */}
            <FiSearch
              className="shrink-0 text-subheading"
              size={14}
              strokeWidth={1.8}
            />

            {/* Input */}
            <input
              type="text"
              placeholder="What are you craving for...?"
              className="
                ml-2
                w-full
                bg-transparent
                text-[12px]
                text-heading
                outline-none
                placeholder:text-subheading
              "
            />
          </div>
        </div>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden min-[721px]:flex items-center gap-3">
          {/* ================= CART ================= */}
          <div
            className="
              flex
              h-7
              w-7
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-white
              text-heading
              shadow-[0_3px_12px_rgba(0,0,0,0.07)]
              transition-all
              duration-200
              hover:text-[#FF5A1F]
              hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)]
            "
          >
            <FiShoppingCart
              size={14}
              className="text-cravio"
              strokeWidth={1.8}
            />
          </div>

          {/* ================= FAVOURITE ================= */}
          <div
            className="
              flex
              h-7
              w-7
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-white
              text-heading
              shadow-[0_3px_12px_rgba(0,0,0,0.07)]
              transition-all
              duration-200
              hover:text-[#FF5A1F]
              hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)]
            "
          >
            <FiHeart
              size={14}
              strokeWidth={1.8}
              className="text-cravio"
            />
          </div>

          {/* ================= USER PROFILE ================= */}
          <div
            className="
              ml-1
              flex
              cursor-pointer
              items-center
              gap-2
            "
          >
            {/* Profile Image */}
            <div className="h-7 w-7 overflow-hidden rounded-full">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="John Doe"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Name + Chevron */}
            <div className="flex items-center gap-1">
              <span className="text-[12px] font-medium text-heading">
                John Doe
              </span>

              <FiChevronDown
                size={15}
                strokeWidth={1.8}
                className="text-subheading"
              />
            </div>
          </div>

          {/* ================= DARK MODE TOGGLE ================= */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            title={isDark ? "Light mode" : "Dark mode"}
            className="
              ml-1
              flex
              h-8
              w-8
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-white
              text-heading
              shadow-[0_3px_12px_rgba(0,0,0,0.07)]
              transition-all
              duration-200
              hover:text-[#FF5A1F]
              hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)]
            "
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