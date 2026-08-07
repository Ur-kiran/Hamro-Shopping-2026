

import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CartData } from "@/context/CartContext";
import { ProductData } from "@/context/ProductContext";
import { UserData } from "@/context/UserContext";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Edit,
  Loader2,
  X,
  ShoppingCart,
  Tag,
  Package,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Truck,
  Shield,
  RotateCcw,
  ImagePlus,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const ProductPage = () => {
  const { fetchProduct, product, relatedProduct, loading } = ProductData();
  const { addToCart } = CartData();
  const { id } = useParams();
  const { isAuth, user } = UserData();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  // ---------------- REVIEW STATE ----------------
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  const [editingReviewId, setEditingReviewId] = useState(null);

//   const likeReview = async (productId, reviewId) => {
//   try {
//     await axios.put(
//       `${server}/api/reviews/like/${productId}/${reviewId}`,
//       {},
//       { headers: { token: Cookies.get("token") } }
//     );

//     fetchProduct(id);
//   } catch (error) {
//     toast.error(error.response?.data?.message);
//   }
// };

const likeReview = async (productId, reviewId) => {
  try {
    const { data } = await axios.put(
      `${server}/api/reviews/${productId}/${reviewId}/like`,
      {},
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );

    toast.success("Updated like");
    fetchProduct(productId);
  } catch (error) {
    toast.error(error.response?.data?.message || "Error");
  }
};

const deleteReview = async (productId, reviewId) => {
  try {
    await axios.delete(
      `${server}/api/reviews/${productId}/${reviewId}`,
      {
        headers: { token: Cookies.get("token") },
      }
    );

    toast.success("Review deleted");
    fetchProduct(id);
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

const editReview = (review) => {
  setComment(review.comment);
  setRating(review.rating);
  setEditingReviewId(review._id);
};

  // ---------------- SUBMIT REVIEW ----------------
  // const submitReview = async () => {
  //   if (!rating || !comment) {
  //     return toast.error("Please add rating and comment");
  //   }

  //   try {
  //     setReviewLoading(true);

  //     const { data } = await axios.post(
  //       `${server}/api/reviews/${id}`,
  //       { rating, comment },
  //       {
  //         headers: {
  //           token: Cookies.get("token"),
  //         },
  //       }
  //     );

  //     toast.success(data.message);
  //     setRating(0);
  //     setComment("");
  //     fetchProduct(id); // refresh reviews instantly
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Error");
  //   } finally {
  //     setReviewLoading(false);
  //   }
  // };

  const submitReview = async () => {
  if (!rating || !comment) {
    return toast.error("Please add rating and comment");
  }

  try {
    setReviewLoading(true);

    // 🔥 IF editing → update review
    // 🔥 ELSE → create review
    const url = editingReviewId
      ? `${server}/api/reviews/${id}/${editingReviewId}`
      : `${server}/api/reviews/${id}`;

    const method = editingReviewId ? "put" : "post";

    const { data } = await axios({
      method,
      url,
      data: { rating, comment },
      headers: {
        token: Cookies.get("token"),
      },
    });

    toast.success(data.message);

    // reset form
    setRating(0);
    setComment("");
    setEditingReviewId(null);

    fetchProduct(id); // refresh UI
  } catch (error) {
    toast.error(error.response?.data?.message || "Error");
  } finally {
    setReviewLoading(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10]">
      <div className="max-w-6xl mx-auto p-4">

        {/* ---------------- PRODUCT ---------------- */}
        {product && (
          <div className="bg-white dark:bg-[#17181c] rounded-xl p-5">

            {/* Images */}
            <Carousel>
              <CarouselContent>
                {product.images?.map((img, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={img.url}
                      className="h-[400px] w-full object-contain"
                      alt="product"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Title */}
            <h1 className="text-2xl font-bold mt-4">{product.title}</h1>

            {/* Price */}
            <p className="text-xl text-blue-600 font-bold mt-2">
              Rs {product.price}
            </p>

            {/* Add to cart */}
            <button
              onClick={() => addToCart(id)}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              <ShoppingCart className="inline w-4 h-4 mr-1" />
              Add to Cart
            </button>

            {/* About */}
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {product.about}
            </p>
          </div>
        )}

        {/* ---------------- REVIEW FORM ---------------- */}
        <div className="mt-8 bg-white dark:bg-[#17181c] p-5 rounded-xl">
          <h2 className="text-lg font-bold mb-3">Write a Review</h2>

          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-2xl"
              >
                {star <= rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full border p-3 rounded-lg dark:bg-[#0d0e10]"
          />

          <button
            onClick={submitReview}
            disabled={reviewLoading}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {reviewLoading ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        {/* ---------------- REVIEWS ---------------- */}
        {/* <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">Reviews</h2>

          {!product?.reviews || product.reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            product.reviews.map((r, i) => (
              <div
                key={r._id || i}
                className="border p-3 rounded mb-2 bg-white dark:bg-[#17181c]"
              >
                <p className="font-semibold">{r.name}</p>
                <p>⭐ {r.rating}/5</p>
                <p>{r.comment}</p>
              </div>
            ))
          )}
        </div> */}

        <div className="mt-8">
  <h2 className="text-xl font-bold mb-3">Reviews</h2>

  {!product?.reviews || product.reviews.length === 0 ? (
    <p className="text-gray-500">No reviews yet</p>
  ) : (
    product.reviews.map((r, i) => (
      <div
        key={r._id || i}
        className="border p-4 rounded mb-3 bg-white dark:bg-[#17181c]"
      >
        {/* USER INFO */}
        <div className="flex justify-between items-center">
          <p className="font-semibold">{r.name}</p>

          {/* LIKE BUTTON ❤️ */}
          <button
            onClick={() => likeReview(product._id, r._id)}
            className="text-red-500 text-sm"
          >
            ❤️ {r.likes?.length || 0}
          </button>
        </div>

        {/* RATING */}
        <p className="text-yellow-500">⭐ {r.rating}/5</p>

        {/* COMMENT */}
        <p className="text-gray-700 dark:text-gray-300 mt-1">
          {r.comment}
        </p>

        {/* ACTIONS */}
        {user?._id === r.user && (
          <div className="flex gap-3 mt-2 text-sm">
            
            {/* EDIT */}
            <button
              onClick={() => editReview(r)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>

            {/* DELETE */}
            <button
              onClick={() => deleteReview(product._id, r._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    ))
  )}
</div>

        {/* ---------------- RELATED PRODUCTS ---------------- */}
        {relatedProduct?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-4">Related Products</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedProduct.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductPage;