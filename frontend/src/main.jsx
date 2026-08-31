import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RestaurantProvider } from "./context/RestaurantContext.jsx";
import { ItemProvider } from "./context/ItemContext.jsx";
import { FavoriteProvider } from "./context/Favouritecontext.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RestaurantProvider>
          <ItemProvider>
            <FavoriteProvider>
              <App />

              <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
              />
            </FavoriteProvider>
          </ItemProvider>
        </RestaurantProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);