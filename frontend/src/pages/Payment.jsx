
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartData } from "@/context/CartContext";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  const { cart, subTotal, fetchCart } = CartData();
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchAddress() {
    try {
      const { data } = await axios.get(`${server}/api/address/${id}`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      setAddress(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAddress();
  }, [id]);

  const paymentHandler = async () => {
    if (method === "cod") {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${server}/api/order/new/cod`,
          {
            method,
            phone: address.phone,
            address: address.address,
          },
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        setLoading(false);
        toast.success(data.message);
        fetchCart();
        navigate("/orders");
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    }

    if (method === "online") {
      const { loadStripe } = await import("@stripe/stripe-js");

      const stripePromise = loadStripe(
        "pk_test_51QZEIUFMvOph2hyWyfOWX8VP9LAHjNTzzkExAHOzCqAR7KzHmcU5zufHu51eSnUbxRw49XmOme3vdTmeho2kE9fv00h2fOMgnC"
      );

      try {
        setLoading(true);
        const stripe = await stripePromise;

        const { data } = await axios.post(
          `${server}/api/order/new/online`,
          {
            method,
            phone: address.phone,
            address: address.address,
          },
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        if (data.url) {
          window.location.href = data.url;
          setLoading(false);
        } else {
          toast.error("Failed to created Payment Session");
          setLoading(false);
        }
      } catch (error) {
        toast.error("Payment Failed. Please Try again");
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0b0f] py-10 px-4">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">

          {/* HEADER */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Checkout
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Review your order and complete payment
            </p>
          </div>

          {/* PRODUCTS */}
          <div className="bg-white dark:bg-[#111216] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <Separator className="mb-4" />

            <div className="space-y-4">
              {cart &&
                cart.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-sm transition"
                  >
                    <img
                      src={e.product.images[0].url}
                      alt="product"
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h2 className="font-medium text-gray-900 dark:text-white">
                        {e.product.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Rs{e.product.price} × {e.quauntity}
                      </p>
                    </div>

                    <p className="font-semibold text-gray-900 dark:text-white">
                      Rs{e.product.price * e.quauntity}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* TOTAL */}
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              Total: Rs {subTotal}
            </p>
          </div>

          {/* ADDRESS + PAYMENT */}
          {address && (
            <div className="grid md:grid-cols-2 gap-6">

              {/* ADDRESS */}
              <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>
                <Separator className="mb-4" />

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Address:</span> {address.address}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  <span className="font-medium">Phone:</span> {address.phone}
                </p>
              </div>

              {/* PAYMENT */}
              <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Payment Method
                </h3>
                <Separator className="mb-4" />

                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-transparent dark:bg-[#0f1115] text-gray-900 dark:text-white"
                >
                  <option value="">Select Method</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>
            </div>
          )}

          {/* BUTTON */}
          <Button
            className="w-full py-3 text-lg rounded-xl"
            onClick={paymentHandler}
            disabled={!method || !address}
          >
            Proceed to Checkout
          </Button>

        </div>
      )}
    </div>
  );
};

export default Payment;