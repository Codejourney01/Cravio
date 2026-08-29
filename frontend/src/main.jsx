
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { RestaurantProvider } from "./context/RestaurantContext.jsx";
import { ItemProvider } from "./context/ItemContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RestaurantProvider>
          <ItemProvider>
            <App />
          </ItemProvider>
        </RestaurantProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
