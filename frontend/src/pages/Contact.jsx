import React, { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.message) {
      setError("All fields are required");
      return false;
    }

    if (!form.email.includes("@")) {
      setError("Enter a valid email");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validate()) return;

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/contact", form);

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] dark:bg-[#0d0e10] text-gray-900 dark:text-gray-100 px-4 py-14 transition-colors">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Contact <span className="text-[#2874f0] dark:text-[#5b9cf6]">Us</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          We usually reply within 24 hours 🚀
        </p>
      </div>

      {/* INFO CARDS */}
      <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-3 gap-6">

        {[
          {
            icon: Phone,
            title: "Phone",
            text: "+977 98XXXXXXXX",
          },
          {
            icon: Mail,
            title: "Email",
            text: "support@hamropasal.com",
          },
          {
            icon: MapPin,
            title: "Location",
            text: "Nepal",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group p-6 rounded-2xl bg-white dark:bg-[#17181c]
            border border-gray-200 dark:border-gray-800
            shadow-sm hover:shadow-md
            hover:border-[#2874f0]/40 dark:hover:border-[#5b9cf6]/40
            transition-all duration-300 text-center"
          >
            <item.icon className="mx-auto text-[#2874f0] dark:text-[#5b9cf6] group-hover:scale-110 transition" />
            <h2 className="mt-3 font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto mt-14 p-6 rounded-2xl
        bg-white dark:bg-[#17181c]
        border border-gray-200 dark:border-gray-800
        shadow-sm"
      >
        <h2 className="text-xl font-semibold mb-5">
          Send Message
        </h2>

        {error && (
          <p className="mb-3 text-sm text-red-500">{error}</p>
        )}

        {success && (
          <p className="mb-3 text-sm text-green-500">
            Message sent successfully!
          </p>
        )}

        <div className="flex flex-col gap-4">

          {/* NAME */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
            className="h-11 px-4 rounded-xl
            bg-gray-50 dark:bg-[#0d0e10]
            border border-gray-200 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-[#2874f0]/40
            transition"
          />

          {/* EMAIL */}
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Your Email"
            className="h-11 px-4 rounded-xl
            bg-gray-50 dark:bg-[#0d0e10]
            border border-gray-200 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-[#2874f0]/40
            transition"
          />

          {/* MESSAGE */}
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message..."
            rows={5}
            className="p-4 rounded-xl
            bg-gray-50 dark:bg-[#0d0e10]
            border border-gray-200 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-[#2874f0]/40
            transition resize-none"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-xl
            bg-[#2874f0] hover:bg-[#1d5fd6]
            dark:bg-[#1a56c4] dark:hover:bg-[#1447a8]
            text-white font-medium
            flex items-center justify-center gap-2
            transition disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {loading ? "Sending..." : "Send Message"}
          </button>

        </div>
      </form>

    </div>
  );
};

export default Contact;