// Added Recommendation Algorith
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductData } from "@/context/ProductContext";
import { Filter, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

const Products = () => {
  const [show, setShow] = useState(false);

  const {
    search,
    setSearch,
    categories,
    category,
    setCategory,
    totalPages,
    price,
    setPrice,
    page,
    setPage,
    products,
    loading,
  } = ProductData();


  // ✅ READ SEARCH FROM NAVBAR URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");

    if (q !== null) {
      setSearch(q);
      setPage(1);
    }
  }, [location.search]);


  const clearFilter = () => {
    setPrice("");
    setCategory("");
    setSearch("");
    setPage(1);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  // 🚀 PRODUCT RECOMMENDATION ALGORITHM (ADDED - SAFE)
  const recommendedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    return [...products]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  }, [products]);

  return (
    <div className="flex flex-col md:flex-row h-full">
      
      {/* FILTER SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:z-40 w-60 bg-white text-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 relative">
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full p-2 md:hidden"
          >
            <X />
          </button>

          <h2 className="text-lg font-bold mb-2">Filters</h2>

          {/* SEARCH */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Search Title
            </label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Title"
            />
          </div>

          {/* CATEGORY */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
            >
              <option value="">All</option>
              {categories.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          {/* PRICE */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price</label>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
            >
              <option value="">Select</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          <Button className="mt-2 w-full" onClick={clearFilter}>
            Clear Filter
          </Button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4">

        {/* MOBILE FILTER */}
        <button
          onClick={() => setShow(true)}
          className="md:hidden bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          <Filter />
        </button>

        {/* PRODUCTS */}
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.length > 0 ? (
              products.map((e) => (
                <ProductCard key={e._id} product={e} latest={"no"} />
              ))
            ) : (
              <p>No Products Yet</p>
            )}
          </div>
        )}

        {/* 🚀 RECOMMENDED PRODUCTS SECTION (NEW ADDED FEATURE) */}
        {recommendedProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">
              ⭐ Recommended for You
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recommendedProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  latest={"no"}
                />
              ))}
            </div>
          </div>
        )}

        {/* PAGINATION */}
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              {page !== 1 && (
                <PaginationItem onClick={prevPage}>
                  <PaginationPrevious className="cursor-pointer" />
                </PaginationItem>
              )}

              {page !== totalPages && (
                <PaginationItem onClick={nextPage}>
                  <PaginationNext className="cursor-pointer" />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Products;