import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Restaurants from "../pages/Restaurants/Restaurants";
import RestaurantDetails from "../pages/RestaurantDetails/RestaurantDetails";
import Cart from "../pages/Cart/Cart";

import NearYou from "../pages/NearYou/NearYou";
import Favorites from "../pages/Favorites/Favorites";
import Orders from "../pages/Orders/Orders";
import Settings from "../pages/Settings/Settings";
import Profile from "../pages/Profile/Profile";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Cravio Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/restaurants" element={<Restaurants />} />

  <Route
  path="/restaurantdetail/:id"
  element={<RestaurantDetails />}
/>

          <Route path="/near-you" element={<NearYou />} />

          <Route path="/favorites" element={<Favorites />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
