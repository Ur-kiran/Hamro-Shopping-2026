import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAddress() {
    try {
      const { data } = await axios.get(`${server}/api/address/all`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      setAddress(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: "",
    phone: "",
  });

  const handleAddAddress = async () => {
    try {
      const { data } = await axios.post(
        `${server}/api/address/new`,
        { address: newAddress.address, phone: newAddress.phone },
        {
          headers: {
            token: Cookies.get("token"),
          },
        },
      );

      if (data.message) {
        toast.success(data.message);
        fetchAddress();
        (setNewAddress({
          address: "",
          phone: "",
        }),
          setModalOpen(false));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this address")) {
      try {
        const { data } = await axios.delete(`${server}/api/address/${id}`, {
          headers: {
            token: Cookies.get("token"),
          },
        });

        toast.success(data.message);
        fetchAddress();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold uppercase">
          <span className="text-blue-500">Select Delivery Address</span>
        </h1>

        <p className="text-muted-foreground mt-2 uppercase">
          <span className="text-lg text-blue-500">
            Choose an existing address or Add a new one
          </span>
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {address && address.length > 0 ? (
            address.map((e) => (
              <div className="p-4 border rounded-lg shadow-sm" key={e._id}>
                <h3 className="text-lg font-semibold flex justify-between gap-3">
                  Address - {e.address}
                  <Button
                    variant="destructive"
                    onClick={() => deleteHandler(e._id)}
                  >
                    <Trash />
                  </Button>
                </h3>

                <p className="text-sm font-semibold">Phone- {e.phone}</p>
                <Link to={`/payment/${e._id}`}>
                  <Button className= "mt-2" variant="destructive"  >Use Address</Button>
                </Link>
              </div>
            ))
          ) : (
            <p>No Address found</p>
          )}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Button size="lg" onClick={() => setModalOpen(true)}>
          + Add New Address
        </Button>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Address"
              value={newAddress.address}
              onChange={(e) =>
                setNewAddress({ ...newAddress, address: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Phone"
              value={newAddress.phone}
              onChange={(e) =>
                setNewAddress({ ...newAddress, phone: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Close
            </Button>
            <Button variant="outline" onClick={handleAddAddress}>
              Add Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
