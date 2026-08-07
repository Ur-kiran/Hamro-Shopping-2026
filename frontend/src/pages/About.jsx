import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0e10] transition-colors">

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">

        {/* HERO SECTION */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            About <span className="text-[#2874f0] dark:text-[#5b9cf6]">Hamro Pasal</span>
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            We are building a modern shopping experience where quality meets convenience.
            Our mission is to bring the best products directly to your fingertips.
          </p>
        </div>

        {/* GRID SECTION */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* CARD 1 */}
          <div className="bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              🛍️ Our Mission
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              To provide a seamless and modern shopping platform with high-quality products and fast delivery.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              🚀 Why Choose Us
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              We focus on user experience, secure payments, and fast performance for a smooth shopping journey.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              💙 Our Vision
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              To become one of the most trusted and loved ecommerce platforms in Nepal and beyond.
            </p>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-16 text-center">

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Shopping from <span>Hamro Pasal</span>
          </h3>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            React • Tailwind CSS • Node.js • MongoDB
          </p>

          <button
            onClick={() => window.location.href = "/products"}
            className="
              mt-6 px-6 py-2 rounded-md
              bg-[#2874f0] hover:bg-[#1f5fd0]
              text-white text-sm font-medium
              transition
            "
          >
            Start Shopping
          </button>

        </div>

      </div>
    </div>
  );
};

export default About;