import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import SearchBar from "../components/SearchBar/SearchBar";

export default function UserLayout() {
  return (
    <div className="">
      <NavBar />
      <SearchBar />
      <Outlet />
      <Footer />
    </div>
  );
}
