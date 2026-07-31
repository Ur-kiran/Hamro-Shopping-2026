import { LogIn, ShoppingCart, User, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { UserData } from "@/context/UserContext";
import { CartData } from "@/context/CartContext";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductData } from "@/context/ProductContext";
import { WishlistData } from "@/context/WishlistContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { products } = ProductData();

  const { isAuth, logoutUser, user } = UserData();
  const { totalItem, setTotalItem } = CartData();

  const { wishlist } = WishlistData();
  const wishlistCount = wishlist?.length || 0;

  const [search, setSearch] = useState("");

  const logoutHandler = () => {
    logoutUser(navigate, setTotalItem);
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (search.trim()) {
  //     navigate(`/products?search=${search}`);
  //   }
  // };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    setSearch("");
  };

  const filteredProducts =
    search.trim() === ""
      ? []
      : products
          ?.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
          .slice(0, 5);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0d0e10]/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-bold tracking-tight cursor-pointer text-gray-900 dark:text-white"
        >
          Hamro<span className="text-[#2874f0] dark:text-[#5b9cf6]">Pasal</span>
        </h1>

        {/* NAV LINKS (desktop) */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 dark:text-gray-400 hover:text-[#2874f0] dark:hover:text-[#5b9cf6] transition"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/products")}
            className="text-gray-600 dark:text-gray-400 hover:text-[#2874f0] dark:hover:text-[#5b9cf6] transition"
          >
            Products
          </button>

          <button
            onClick={() => navigate("/about")}
            className="text-gray-600 dark:text-gray-400 hover:text-[#2874f0] dark:hover:text-[#5b9cf6] transition"
          >
            About
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="text-gray-600 dark:text-gray-400 hover:text-[#2874f0] dark:hover:text-[#5b9cf6] transition"
          >
            Contact
          </button>
        </nav>

        {/* SEARCH BAR (modern style) */}
        {/* <form
          onSubmit={handleSearch}
          className="
            hidden sm:flex
            flex-1 max-w-md
            items-center
            bg-gray-100 dark:bg-[#17181c]
            border border-gray-200 dark:border-gray-800
            rounded-lg px-3 py-1
            focus-within:ring-2 focus-within:ring-[#2874f0]/40
            transition
          "
        >
          <Search className="w-4 h-4 text-gray-500" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full px-2 py-1
              bg-transparent
              outline-none
              text-sm
              text-gray-700 dark:text-gray-200
            "
          />
        </form> */}

        <div className="relative flex-1 max-w-md hidden sm:block">
          <form
            onSubmit={handleSearch}
            className="
      flex items-center
      bg-gray-100 dark:bg-[#17181c]
      border border-gray-200 dark:border-gray-800
      rounded-lg px-3 py-1
    "
          >
            <Search className="w-4 h-4 text-gray-500" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
        w-full px-2 py-1
        bg-transparent
        outline-none
        text-sm
      "
            />
          </form>

          {filteredProducts.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              {filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  onClick={() => setSearch("")}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="w-10 h-10 object-cover rounded"
                  />

                  <div>
                    <p className="text-sm font-medium">{product.title}</p>

                    <p className="text-xs text-blue-600">Rs {product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4">
          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="relative text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
          >
            <Heart className="w-5 h-5" />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <button
            onClick={() => navigate("/cart")}
            className="relative text-gray-600 dark:text-gray-400 hover:text-[#2874f0] dark:hover:text-[#5b9cf6] transition"
          >
            <ShoppingCart className="w-5 h-5" />

            {totalItem > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#2874f0] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {totalItem}
              </span>
            )}
          </button>

          {/* THEME */}
          <ModeToggle />

          {/* USER */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="p-1.5 rounded-md bg-gray-100 dark:bg-[#17181c] hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                {isAuth ? (
                  <User className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                ) : (
                  <LogIn className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                )}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-44 bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {!isAuth ? (
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  Login
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    Orders
                  </DropdownMenuItem>

                  {user?.role === "admin" && (
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      Dashboard
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem onClick={logoutHandler}>
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
