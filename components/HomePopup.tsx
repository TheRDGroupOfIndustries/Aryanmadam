"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("10% off 54 collections");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/popup-settings");
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title);
          setIsActive(data.isActive);
          
          if (data.isActive) {
            const timer = setTimeout(() => {
              setShow(true);
            }, 1000);
            return () => clearTimeout(timer);
          }
        }
      } catch (error) {
        console.error("Failed to fetch popup settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const closePopup = () => {
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Successfully subscribed!");
        setEmail("");
        setTimeout(() => {
          setShow(false);
        }, 2000);
      } else {
        setMessage(data.error || "❌ Something went wrong");
      }
    } catch (error) {
      setMessage("❌ Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 sm:p-0">
      <div className="relative w-full max-w-[90vw] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] rounded-xl overflow-hidden shadow-2xl">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/popup-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-white/75" />

        {/* Close Button */}
        <button
          type="button"
          onClick={closePopup}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-lg cursor-pointer hover:bg-gray-100 transition"
          aria-label="Close popup"
        >
          <span className="text-lg sm:text-xl leading-none text-black">×</span>
        </button>

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-12 md:p-16 text-center max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            {title}
          </h2>

          <p className="mt-2 text-sm sm:text-lg md:text-xl text-black font-medium">
            Sign up for Special Discount Coupons
          </p>

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 w-full max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border-2 border-purple-700 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base 
                         text-black placeholder:text-gray-600 focus:outline-none focus:border-purple-800 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-purple-700 py-3 sm:py-4 text-white text-sm sm:text-lg font-bold hover:bg-purple-800 transition disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {message && (
            <p className={`mt-3 text-sm font-semibold ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-700 leading-relaxed">
            By signing up, you agree to receive marketing emails. View our{" "}
            <Link href="/privacyPolicy" onClick={closePopup} className="underline cursor-pointer hover:text-purple-700 transition">privacy policy</Link>{" "}
            and{" "}
            <Link href="/termsOfService" onClick={closePopup} className="underline cursor-pointer hover:text-purple-700 transition">terms of service</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}