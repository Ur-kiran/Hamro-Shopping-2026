import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="mt-0.9 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d0e10] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hamro <span className="text-[#2874f0] dark:text-[#5b9cf6]">Pasal</span>
            </h1>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Your one-stop modern shopping experience. Quality products at your fingertips.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              Quick Links
            </h2>

            <ul className="space-y-2">
              {[
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "Privacy Policy", path: "#" },
                { label: "Terms & Conditions", path: "#" },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="
                      text-sm
                      text-gray-600 dark:text-gray-400
                      hover:text-[#2874f0] dark:hover:text-[#5b9cf6]
                      transition-colors
                    "
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              Follow Us
            </h2>

            <div className="flex gap-3">
              {[
                FaFacebook,
                FaTwitter,
                FaInstagram,
                FaYoutube,
              ].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="
                    w-10 h-10
                    flex items-center justify-center
                    rounded-lg
                    bg-gray-100 dark:bg-[#17181c]
                    border border-gray-200 dark:border-gray-800
                    text-gray-600 dark:text-gray-400
                    hover:text-[#2874f0] dark:hover:text-[#5b9cf6]
                    hover:border-[#2874f0] dark:hover:border-[#5b9cf6]
                    transition-all duration-300
                  "
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Hamro Pasal. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Built with ❤️ for modern shopping
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;