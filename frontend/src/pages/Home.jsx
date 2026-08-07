import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { ProductData } from "@/context/ProductContext";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { loading, newProd } = ProductData();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0c0f] text-gray-900 dark:text-white pb-20 antialiased selection:bg-black selection:text-white">

      {/* HERO */}
      <Hero navigate={navigate} />

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-gray-100 dark:border-gray-800">

          <div>
            <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
              Fresh Arrivals
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Latest Products
            </h2>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0 max-w-md">
            Discover newly added products curated for your shopping experience.
          </p>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse space-y-3"
              >
                <div className="aspect-square w-full rounded-xl bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : newProd && newProd.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProd.map((e) => (
              <div
                key={e._id}
                className="rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <ProductCard product={e} latest="yes" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl max-w-md mx-auto">
            <h3 className="text-sm font-semibold">No products yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Check back later for updates
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;