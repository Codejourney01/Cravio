import React from "react";
import { NavLink } from "react-router-dom";

import banner from "../../assets/images/banners/banner.webp";

import {
  FiHome,
  FiHeart,
  FiMapPin,
  FiGrid,
  FiHelpCircle,
  FiX,
} from "react-icons/fi";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: FiHome,
    },
    {
      name: "Restaurants",
      path: "/restaurants",
      icon: FiMapPin,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: FiGrid,
    },
    {
      name: "Favorites",
      path: "/favorites",
      icon: FiHeart,
    },
    {
      name: "Help Center",
      path: "/help",
      icon: FiHelpCircle,
    },
  ];

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed inset-0 z-40
            bg-black/30
            backdrop-blur-[1px]
            min-[721px]:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-60 flex-col
          border-r border-gray-100
          bg-white
          px-4 py-6
          transition-transform
          duration-300
          ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          min-[721px]:translate-x-0
        `}
      >
        {/* ===================================================
            SIDEBAR HEADER
        ==================================================== */}
        <div className="flex shrink-0 items-center justify-between">

          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1"
          >
            <img
              src="/Images/logo.jpeg"
              alt="Cravio"
              className="w-12"
            />

            <h2
              className="
                text-xl
                font-semibold
                uppercase
                tracking-tight
                text-cravio
              "
            >
              Cravio
            </h2>
          </NavLink>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-nav
              transition-colors
              duration-200
              hover:bg-gray-50
              hover:text-heading
              min-[721px]:hidden
            "
            aria-label="Close sidebar"
          >
            <FiX
              size={21}
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* ===================================================
            NAVIGATION
        ==================================================== */}
        <nav className="mt-10 space-y-2">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `
                    group
                    flex items-center gap-4
                    rounded-xl
                    px-4 py-3
                    text-sm
                    font-medium
                    transition-all duration-200

                    ${
                      isActive
                        ? "text-[#FF5A1F]"
                        : "text-nav hover:text-[#FF5A1F]"
                    }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Icon */}
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      className={`
                        shrink-0
                        transition-colors
                        duration-200

                        ${
                          isActive
                            ? "text-[#FF5A1F]"
                            : "text-nav group-hover:text-[#FF5A1F]"
                        }
                      `}
                    />

                    {/* Label */}
                    <span>
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

        </nav>

        {/* ===================================================
            PROMOTIONAL BANNER
        ==================================================== */}
        <div className="mt-5 flex w-full justify-center">
          <div className="w-[90%] overflow-hidden rounded-xl">

            <img
              src={banner}
              alt="Cravio special offer"
              className="
                aspect-square
                w-full
                object-cover
                transition-transform
                duration-300
                hover:scale-[1.02]
              "
            />

          </div>
        </div>
      </aside>
    </>
  );
}