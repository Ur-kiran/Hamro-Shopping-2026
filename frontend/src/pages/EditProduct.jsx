import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { server, categories } from "@/main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ProductData } from "@/context/ProductContext";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setRefresh } = ProductData();

  const [form, setForm] = useState({
    title: "",
    about: "",
    price: "",
    stock: "",
    category: "",
    images: null,
  });

  const [loading, setLoading] = useState(false);

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${server}/api/product/${id}`,
          {
            headers: { token: Cookies.get("token") },
          }
        );

        setForm({
          title: data.product.title,
          about: data.product.about,
          price: data.product.price,
          stock: data.product.stock,
          category: data.product.category,
          images: null,
        });
      } catch (err) {
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  // UPDATE PRODUCT
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "images" && value) {
          for (let i = 0; i < value.length; i++) {
            formData.append("images", value[i]);
          }
        } else {
          formData.append(key, value);
        }
      });

      const { data } = await axios.put(
        `${server}/api/product/${id}`,
        formData,
        {
          headers: {
            token: Cookies.get("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message);
      // navigate("/admin");
      setRefresh(prev => !prev);
      // navigate("/admin", { state: { refresh: Date.now() } });
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Edit Product</h2>

      <form onSubmit={submitHandler} className="space-y-4">

        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <Input
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="About"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <Input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <Input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
        />

        <Input
          type="file"
          multiple
          onChange={handleFileChange}
        />

        <Button disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;