import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserLayout from "./Layout/UserLayout";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import Cart from "./pages/Cart";
import PlaceOrders from "./pages/PlaceOrders";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuthStore } from "./Hooks/authStore";
import AuthGuard from "./Guard/AuthGuard";
import WishlistPage from "./pages/WishlistPage";
import Order from "./pages/Order";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ShopMain from "./pages/ShopMain";
export default function App() {
  const { validateToken } = useAuthStore();

  useEffect(() => {
    validateToken();
  }, [validateToken]);
  return (
    <div className="App container mx-auto px-4  bg-white text-black">
      <ToastContainer className="mt-15"/>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
           <Route path="/shopping" element={<ShopMain />} />
           <Route path="products/:productId" element={<DetailsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route
          path="/"
          element={
            <AuthGuard>
              <UserLayout />
            </AuthGuard>
          }
        >
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/place-order" element={<PlaceOrders />} />
          <Route path="/orders" element={<Order />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
