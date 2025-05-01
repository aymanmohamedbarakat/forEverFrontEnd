import React, { useEffect, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgHeart, CgMenuMotion, CgShoppingBag } from "react-icons/cg";
import SideBar from "../SideBar/SideBar";
import { Search } from "lucide-react";
import {
  useAuthStore,
  useCartStore,
  useLinks,
  userWishlistStore,
  useSearchStore,
  useSideHeader,
} from "../../store";

export default function NavBar() {
  const { Links } = useLinks();
  const [links] = useState(Links || []);
  const { index, openSideHeader } = useSideHeader();
  const { getCartCount } = useCartStore();
  const { currentUser, isAuthenticated, logout } = useAuthStore();
  const { wishlist, getWishlists } = userWishlistStore();
  const { openSearch } = useSearchStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      getWishlists(currentUser.id);
    }
  }, [isAuthenticated, currentUser, getWishlists]);

  return (
    <div className="flex items-center justify-between py-5 gap-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 font-semibold">
        {links.map((link, index) => (
          <NavLink
            to={link.url}
            key={index}
            className="flex flex-col items-center gap-1"
          >
            <p>{link.name}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>
      {/* Icons */}
      <div className="flex items-center gap-3 text-gray-700">
        <Search
          size={18}
          strokeWidth={2}
          className="text-gray-700 cursor-pointer"
          onClick={openSearch}
        />
        <div className="group relative">
          <div className="cursor-pointer relative">
            <img src={assets.profile_icon} alt="" className="w-4" />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10 transition-all duration-300 ease-in-out">
              <div className="flex flex-col gap-2 w-48 py-3 px-5 bg-slate-100 text-gray-400 rounded shadow-md">
                {isAuthenticated ? (
                  <>
                    <p className="font-medium text-black mb-1">
                      Hello,{currentUser?.username}
                    </p>
                    <p
                      className="cursor-pointer hover:text-black"
                      onClick={() => navigate("/profile")}
                    >
                      My Profile
                    </p>
                    <p
                      className="cursor-pointer hover:text-black"
                      onClick={() => navigate("/wishlist")}
                    >
                      My Wishlist
                    </p>
                    <p
                      className="cursor-pointer hover:text-black"
                      onClick={() => navigate("/orders")}
                    >
                      My Orders
                    </p>
                    <hr className="my-1 border-gray-300" />
                    <p
                      className="cursor-pointer hover:text-black"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-black mb-1">Welcome</p>
                    <p
                      className="cursor-pointer hover:text-black"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </p>
                    <p
                      className="cursor-pointer hover:text-black"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Link
          to={isAuthenticated ? "/wishlist" : "/login"}
          className="relative"
        >
          <CgHeart className="text-lg" />
          {wishlist.length > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {wishlist.length}
            </p>
          )}
        </Link>

        <Link to={isAuthenticated ? "/cart" : "/login"} className="relative">
          <CgShoppingBag className="text-lg w-5 min-w-5 cursor-pointer" />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          )}
        </Link>
        <CgMenuMotion
          onClick={openSideHeader}
          className="w-5 cursor-pointer sm:hidden"
        />
        {index && <SideBar />}
      </div>
    </div>
  );
}
