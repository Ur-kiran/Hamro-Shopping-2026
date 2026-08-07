import { ProductData } from "@/context/ProductContext";
import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import ProductCard from "../ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { categories, server } from "@/main";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const { products, page, setPage, fetchProducts, loading, totalPages } =
    ProductData();

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [page, location.state?.refresh]);

  const [open, setOpen] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    about: "",
    category: "",
    price: "",
    stock: "",
    images: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.images || formData.images.length === 0) {
      toast.error("Please select images");
      return;
    }

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        for (let i = 0; i < value.length; i++) {
          form.append("images", value[i]);
        }
      } else {
        form.append(key, value);
      }
    });

    try {
      const { data } = await axios.post(`${server}/api/product/new`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: Cookies.get("token"),
        },
      });

      toast.success(data.message);
      setOpen(false);
      setFormData({
        title: "",
        about: "",
        category: "",
        price: "",
        stock: "",
        images: null,
      });

      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  // const deleteProduct = async (id) => {
  //   try {
  //     await axios.delete(`${server}/api/product/${id}`, {
  //       headers: {
  //         token: Cookies.get("token"),
  //       },
  //     });

  //     toast.success("Product deleted");
  //     fetchProducts();
  //   } catch (err) {
  //     toast.error("Delete failed");
  //   }
  // };

  const deleteProduct = async (id) => {
    setDeletingId(id); // 👈 start loader

    try {
      await axios.delete(`${server}/api/product/${id}`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null); // 👈 stop loader
    }
  };

  const handleEdit = (product) => {
    navigate(`/admin/product/edit/${product._id}`);
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>

        <Button onClick={() => setOpen(true)}>Add Product</Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded-xl">
          <p>Total</p>
          <h3 className="text-2xl font-bold">{products.length}</h3>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-green-600">In Stock</p>
          <h3 className="text-2xl font-bold">
            {products.filter((p) => p.stock > 0).length}
          </h3>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-red-600">Out of Stock</p>
          <h3 className="text-2xl font-bold">
            {products.filter((p) => p.stock <= 0).length}
          </h3>
        </div>
      </div>

      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger />

        <DialogContent className="sm:max-w-150 rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>

          <form onSubmit={submitHandler} className="space-y-5 mt-4">
            <Input
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Input
              name="about"
              placeholder="About Product"
              value={formData.about}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-3">
              <Input
                name="price"
                placeholder="Price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <Input
                name="stock"
                placeholder="Stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* IMAGE PREVIEW */}
            {formData.images && (
              <div className="grid grid-cols-3 gap-2">
                {Array.from(formData.images).map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    className="h-20 w-full object-cover rounded"
                  />
                ))}
              </div>
            )}

            <Button className="w-full">Create Product</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* PRODUCTS */}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((p) => (
            <div key={p._id}>
              <div className="relative">
                <span
                  className={`absolute z-20 top-1 left-8 px-3 py-1 rounded-b-full text-xs font-semibold text-white shadow ${
                    p.stock > 0 ? "bg-emerald-500" : "bg-red-500"
                  }`}
                >
                  {p.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>

                <ProductCard product={p} latest="no" />
              </div>

              {/* ADMIN ACTIONS */}
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => deleteProduct(p._id)}
                  disabled={deletingId === p._id}
                >
                  {deletingId === p._id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            {page !== 1 && (
              <PaginationItem onClick={() => setPage(page - 1)}>
                <PaginationPrevious />
              </PaginationItem>
            )}

            {page !== totalPages && (
              <PaginationItem onClick={() => setPage(page + 1)}>
                <PaginationNext />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default HomePage;
