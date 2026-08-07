import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "@/main";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET WISHLIST
  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${server}/api/wishlist`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      setWishlist(data.wishlist);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // TOGGLE WISHLIST

  // const toggleWishlist = async (productId) => {
  //   try {
  //     const { data } = await axios.put(
  //       `${server}/api/wishlist/toggle/${productId}`,
  //       {},
  //       {
  //         headers: { token: Cookies.get("token") },
  //       },
  //     );

  //     // IMPORTANT FIX 👇
  //     setWishlist([...data.wishlist]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const toggleWishlist = async (productId) => {
    try {
      await axios.put(
        `${server}/api/wishlist/toggle/${productId}`,
        {},
        {
          headers: { token: Cookies.get("token") },
        },
      );

      await fetchWishlist(); // 🔥 safest approach
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, fetchWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const WishlistData = () => useContext(WishlistContext);
