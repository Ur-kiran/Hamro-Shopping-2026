import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartData } from "@/context/CartContext";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    totalItem,
    subTotal,
    updateCart,
    updateCartQuantity,
    removeFromCart,
  } = CartData();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const obj = {};

    cart.forEach((item) => {
      obj[item._id] = item.quauntity;
    });

    setQuantities(obj);
  }, [cart]);

  const navigate = useNavigate();

  // const updateCartHander = async (action, id) => {
  //   await updateCart(action, id);
  // };

  const updateCartHander = async (action, id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]:
        action === "inc"
          ? Number(prev[id]) + 1
          : Math.max(1, Number(prev[id]) - 1),
    }));

    await updateCart(action, id);
  };

  const hasOutOfStockItem = cart.some((item) => item.product.stock === 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl">Your cart is empty 🛒</p>
          <Button className="mt-6" onClick={() => navigate("/products")}>
            Shop Now
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((e) => (
              <div
                key={e._id}
                className={`
                  group
                  flex flex-col sm:flex-row
                  items-center
                  gap-5
                  p-5
                  rounded-2xl
                  border border-gray-200 dark:border-gray-800
                  bg-gray-50 dark:bg-[#171b2e]
                  hover:shadow-lg
                  hover:border-[#2874f0]
                  transition-all duration-300
                  ${e.product.stock === 0 ? "opacity-70" : ""}
                `}
              >
                <img
                  src={e.product.images[0].url}
                  alt={e.product.title}
                  className="
                   w-full sm:w-28 sm:h-28
                   object-contain
                   rounded-xl
                   cursor-pointer
                   transition-transform duration-300
                   group-hover:scale-105
                   "
                  onClick={() => navigate(`/product/${e.product._id}`)}
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {e.product.title}
                  </h2>
                  <p className="mt-1 text-[#2874f0] dark:text-[#5b9cf6] font-semibold">
                    Price: Rs {e.product.price}
                  </p>

                  <p
                    className={`mt-1 text-sm font-medium ${
                      e.product.stock === 0
                        ? "text-red-500"
                        : e.product.stock <= 5
                          ? "text-orange-500"
                          : "text-green-600"
                    }`}
                  >
                    {e.product.stock === 0
                      ? "❌ Out of Stock"
                      : e.product.stock <= 5
                        ? `⚠ Only ${e.product.stock} left`
                        : `✓ ${e.product.stock} in stock`}
                  </p>
                </div>

                <div
                  className="
                  flex items-center gap-2
                  rounded-xl
                  border border-gray-200
                  dark:border-gray-900
                  overflow-hidden
                  "
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-4 py-5 font-bold text-blue-100"
                    disabled={e.quauntity <= 1 || e.product.stock === 0}
                    onClick={() => updateCartHander("dec", e._id)}
                  >
                    -
                  </Button>

                  <input
                    type="number"
                    min="1"
                    max={e.product.stock}
                    disabled={e.product.stock === 0}
                    value={
                      quantities[e._id] !== undefined
                        ? quantities[e._id]
                        : e.quauntity
                    }
                    className="w-16 h-9 text-center border rounded-md"
                    onChange={(event) => {
                      setQuantities((prev) => ({
                        ...prev,
                        [e._id]: event.target.value,
                      }));
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();

                        let value = Number(quantities[e._id]);

                        if (isNaN(value) || value < 1) value = 1;
                        if (value > e.product.stock) value = e.product.stock;

                        setQuantities((prev) => ({
                          ...prev,
                          [e._id]: value,
                        }));

                        updateCartQuantity(e._id, value);

                        event.target.blur();
                      }
                    }}
                    onBlur={() => {
                      let value = Number(quantities[e._id]);

                      if (isNaN(value) || value < 1) value = 1;
                      if (value > e.product.stock) value = e.product.stock;

                      setQuantities((prev) => ({
                        ...prev,
                        [e._id]: value,
                      }));

                      updateCartQuantity(e._id, value);
                    }}
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    className="px-4 py-5 font-bold text-blue-100"
                    disabled={
                      e.quauntity >= e.product.stock || e.product.stock === 0
                    }
                    onClick={() => updateCartHander("inc", e._id)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="
                  text-red-500
                  hover:bg-red-50
                  dark:hover:bg-red-900/20
                  "
                  onClick={() => removeFromCart(e._id)}
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          <div
            className="
            sticky top-24
            p-6
            rounded-2xl
            border border-gray-200 dark:border-gray-800
            bg-gray-50 dark:bg-[#1d2130]
            shadow-sm
            "
          >
            <h2 className="text-xl text-white font-semibold mb-4 text-center lg:text-left">
              Order Summary
            </h2>
            <Separator className="my-2" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white">Total Items - {totalItem}</span>
                <span className="text-white">Total Price - Rs{subTotal}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-medium text-lg">
              <span className="text-white">Total:</span>
              <span className="text-white">Rs{subTotal}</span>
            </div>
            <Button
              className="
                w-full
                mt-6
                h-11
                rounded-xl
                bg-[#2874f0]
                hover:bg-[#1f67df]
                text-white
                "
              onClick={() => navigate("/checkout")}
              disabled={cart.length === 0 || hasOutOfStockItem}
            >
              {hasOutOfStockItem ? "Remove Out of Stock Item" : "Checkout"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
