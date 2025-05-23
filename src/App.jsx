import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserLayout from "./Layout/UserLayout";
import HomePage from "./pages/HomePage";
import Shopping from "./pages/Shopping";
import DetailsPage from "./pages/DetailsPage";
import Cart from "./pages/Cart";
import PlaceOrders from "./pages/PlaceOrders";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuthStore } from "./Hooks/authStore";
import AuthGuard from "./Guard/AuthGuard";
import WishlistPage from "./pages/WishlistPage";
import OrderPage from "./pages/OrderPage";
export default function App() {
  const { validateToken } = useAuthStore();

  useEffect(() => {
    validateToken();
  }, [validateToken]);
  return (
    <div className="App px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 bg-white text-black">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<h1>about</h1>} />
          <Route path="/contact" element={<h1>contact</h1>} />
        </Route>

        <Route
          path="/"
          element={
            <AuthGuard>
              <UserLayout />
            </AuthGuard>
          }
        >
          <Route path="/shopping" element={<Shopping />} />
          <Route path="products/:productId" element={<DetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/place-order" element={<PlaceOrders />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
