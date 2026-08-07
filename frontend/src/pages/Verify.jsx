import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartData } from "@/context/CartContext";
import { UserData } from "@/context/UserContext";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const { btnLoading, loginUser, verifyUser } = UserData();
  const { fetchCart } = CartData();

  const submitHandler = () => {
    verifyUser(Number(otp), navigate, fetchCart);
  };

  const [timer, setTimer] = useState(90);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
    setCanResend(true);
  }, [timer]);

  const formatTime = (t) => {
    const m = String(Math.floor(t / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem("email");
    await loginUser(email, navigate);
    setTimer(90);
    setCanResend(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0c0f] px-4">

      <Card className="w-full max-w-md border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl">

        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Verify your email
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter the OTP sent to your email address
          </p>
        </div>

        <CardContent className="p-6 space-y-5">

          {/* OTP Input */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-600 dark:text-gray-300">
              OTP Code
            </Label>

            <Input
              type="number"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="
                h-11
                text-center
                tracking-widest
                text-base
                border-gray-300 dark:border-gray-700
                focus:border-black dark:focus:border-white
                focus:ring-0
                rounded-lg
              "
            />
          </div>

          {/* Timer */}
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            {canResend ? (
              <span className="text-green-600 dark:text-green-400">
                You can resend OTP now
              </span>
            ) : (
              `Resend available in ${formatTime(timer)}`
            )}
          </div>

          {/* Verify Button */}
          <Button
            disabled={btnLoading}
            onClick={submitHandler}
            className="
              w-full h-11
              bg-black dark:bg-white
              text-white dark:text-black
              hover:opacity-90
              rounded-lg
              transition
            "
          >
            {btnLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Verify OTP"
            )}
          </Button>

          {/* Resend OTP */}
          <Button
            variant="outline"
            onClick={handleResendOtp}
            disabled={!canResend}
            className="
              w-full h-11
              border-gray-300 dark:border-gray-700
              text-gray-700 dark:text-gray-200
              hover:bg-gray-50 dark:hover:bg-gray-800
              rounded-lg
            "
          >
            Resend OTP
          </Button>

          {/* Back */}
          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className="
                text-sm text-gray-500
                hover:text-black dark:hover:text-white
                transition
              "
            >
              ← Back to login
            </button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default Verify;