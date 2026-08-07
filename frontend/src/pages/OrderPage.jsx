import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserData } from "@/context/UserContext";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = UserData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${server}/api/order/${id}`, {
          headers: {
            token: Cookies.get("token"),
          },
        });

        setOrder(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <Loading />;

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-red-500">
          No Order With this id
        </h1>
        <Button className="mt-4" onClick={() => navigate("/products")}>
          Shop Now
        </Button>
      </div>
    );
  }

  const isOwner = user?._id === order.user?._id || user?.role === "admin";

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      {isOwner ? (
        <>
          {/* ORDER SUMMARY CARD */}
          <Card className="mb-8 border-border/50 bg-background/80 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-3xl font-bold tracking-tight">
                  Order Details
                </CardTitle>

                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => window.print()}
                >
                  Print Order
                </Button>
              </div>
            </CardHeader>

            <div className="grid lg:grid-cols-2 gap-8 p-6">
              {/* LEFT */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                <p>
                  <strong>Total Items:</strong> {order.items.length}
                </p>

                <p>
                  <strong>Payment Method:</strong> {order.method}
                </p>

                <p>
                  <strong>Subtotal:</strong> Rs{order.subTotal}
                </p>

                <p>
                  <strong>Placed At:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p>
                  <strong>Paid At:</strong>{" "}
                  {order.paidAt || "Payment Through COD"}
                </p>
              </div>

              {/* RIGHT */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Shipping Details</h2>

                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>

                <p>
                  <strong>Address:</strong> {order.address}
                </p>

                <p>
                  <strong>User:</strong> {order.user?.email || "Guest"}
                </p>
              </div>
            </div>
          </Card>

          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {order.items.map((e, i) => (
              <Card
                key={i}
                className="overflow-hidden rounded-3xl border-border/50 bg-background shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link to={`/product/${e.product._id}`}>
                  <div className="h-64 bg-muted/30 overflow-hidden">
                    <img
                      src={e.product.images[0]?.url}
                      alt={e.product.title}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </Link>

                <CardContent className="p-5 space-y-3">
                  <h3 className="font-bold text-lg line-clamp-2">
                    {e.product.title}
                  </h3>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-semibold">{e.quantity}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-bold text-lg">
                      Rs{e.product.price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-red-500 text-2xl">
          This is not your order
          <br />
          <Link to="/" className="text-blue-500 underline text-lg">
            Go to home page
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderPage;