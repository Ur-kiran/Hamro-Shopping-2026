

import React, { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { WishlistData } from "@/context/WishlistContext";
import { ProductData } from "@/context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { wishlist, fetchWishlist } = WishlistData();
  const { products } = ProductData();

  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ==========================
  // Recommendation Algorithm
  // ==========================

  const wishlistCategories = [
    ...new Set(
      (wishlist || [])
        .filter((item) => item?.category)
        .map((item) => item.category)
    ),
  ];

  const recommendedProducts = (products || [])
    .filter(
      (product) =>
        wishlistCategories.includes(product.category) &&
        !(wishlist || []).some((item) => item?._id === product._id)
    )
    .slice(0, 4);

  return (
    <div className="min-h-[500px] p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

      {!wishlist || wishlist.length === 0 ? (
        <div className="flex h-[250px] justify-center items-center py-10 text-gray-500">
          <div className="p-3 flex flex-col items-center">
            <p className="text-[30px] font-semibold text-red-700 capitalize underline">
              Your wishlist is Empty!
            </p>

            <Button
              className="mt-2"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Wishlist Products */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product, index) => (
              <ProductCard
                key={product?._id || index}
                product={product}
              />
            ))}
          </div>

          {/* Recommended Products */}
          {recommendedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">
                Recommended For You
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Wishlist;