import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData } from "@/context/UserContext";
import { Loader, LockKeyhole } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { loginUser, btnLoading } = UserData();

  const submitHandler = () => {
    loginUser(email, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-[#0b0c0f]">

      {/* Card */}
      <Card className="w-full max-w-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111318] shadow-xl rounded-2xl">

        {/* Header */}
        <div className="p-6 text-center border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 mb-3">
            <LockKeyhole className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter your email to continue
          </p>
        </div>

        {/* Form */}
        <CardContent className="p-6 space-y-5">

          <div className="space-y-2">
            <Label className="text-sm text-gray-600 dark:text-gray-300">
              Email address
            </Label>

            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                h-11
                bg-white dark:bg-[#0e0f12]
                border border-gray-200 dark:border-gray-800
                focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10
                rounded-lg
              "
            />
          </div>

          <Button
            disabled={btnLoading}
            onClick={submitHandler}
            className="
              w-full h-11 rounded-lg
              bg-black dark:bg-white
              text-white dark:text-black
              hover:opacity-90
              transition
            "
          >
            {btnLoading ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin w-4 h-4" />
                Sending...
              </div>
            ) : (
              "Send OTP"
            )}
          </Button>

          <div className="text-center">
            <button
              onClick={() => navigate("/verify")}
              className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition"
            >
              Already have OTP? Verify
            </button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default Login;