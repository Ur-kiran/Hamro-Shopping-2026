import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Hero = ({ navigate }) => {
  return (
    <section className="relative h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `url('/bg image.jpg')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Soft Glow */}
      <div className="absolute w-150 h-150 bg-primary/20 blur-[140px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">


        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Welcome to your{" "}
          <span className="text-primary">Dream Shop</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base md:text-xl text-gray-200 leading-relaxed">
          Discover premium products, unbeatable deals, and a seamless shopping experience designed just for you.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/products")}
            size="lg"
            className="rounded-2xl px-6 py-6 text-base font-semibold bg-primary hover:scale-105 transition"
          >
            Shop Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-2xl px-6 py-6 text-base border-white/30 text-white hover:bg-white/10"
            onClick={() => navigate("/about")}
          >
            Explore More
          </Button>
        </div>

      </div>
    </section>
  );
};

export default Hero;