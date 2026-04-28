"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePopup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");
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
            setTimeout(() => setShow(true), 1000);
          }
        } else {
          // API failed (e.g. DB down) — show popup anyway with defaults
          setTimeout(() => setShow(true), 1000);
        }
      } catch (error) {
        console.error("Failed to fetch popup settings:", error);
        // Network error — show popup anyway with defaults
        setTimeout(() => setShow(true), 1000);
      }
    };

    fetchSettings();
  }, []);

  const closePopup = () => {
    setShow(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Frontend validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("❌ Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (phone.length < 10) {
      setMessage("❌ Phone number must be at least 10 digits");
      setLoading(false);
      return;
    }

    try {
      // Save to database via newsletter API (may fail if DB is down)
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, requirement }),
      });

      // Also send email to admin via Web3Forms
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "1daec5c1-6c76-4595-a1f5-f2905595d65f",
          subject: `New Popup Subscriber: ${name || email}`,
          from_name: name,
          name: name,
          email: email,
          phone: phone || "Not provided",
          requirement: requirement || "Not provided",
        }),
      });

      const web3Data = await web3Res.json();

      // We prioritize showing success if Web3Forms worked, 
      // even if the database save (response.ok) failed.
      if (web3Data.success) {
        setMessage("✅ Successfully submitted!");
        setName("");
        setPhone("");
        setEmail("");
        setRequirement("");
        setTimeout(() => {
          setShow(false);
        }, 2000);
      } else {
        // If even Web3Forms fails, show the error
        const data = response.ok ? {} : await response.json().catch(() => ({}));
        setMessage(web3Data.message || data.error || "❌ Something went wrong");
      }
    } catch (error) {
      console.error("Popup submission error:", error);
      setMessage("❌ Failed to submit");
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
        <div className="relative z-10 p-6 sm:p-10 md:p-12 text-center max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
            {title}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-black font-medium">
            Sign up for Special Discount Coupons
          </p>

          <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 space-y-3 w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border-2 border-purple-700 px-4 py-2 sm:py-3 text-sm sm:text-base 
                         text-black placeholder:text-gray-600 focus:outline-none focus:border-purple-800 disabled:opacity-50"
            />
            
            <input
              type="tel"
              placeholder="Contact no"
              required
              value={phone}
              onChange={handlePhoneChange}
              disabled={loading}
              className="w-full rounded-xl border-2 border-purple-700 px-4 py-2 sm:py-3 text-sm sm:text-base 
                         text-black placeholder:text-gray-600 focus:outline-none focus:border-purple-800 disabled:opacity-50"
            />

            <input
              type="email"
              placeholder="Email id"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border-2 border-purple-700 px-4 py-2 sm:py-3 text-sm sm:text-base 
                         text-black placeholder:text-gray-600 focus:outline-none focus:border-purple-800 disabled:opacity-50"
            />

            <textarea
              placeholder="Requirement"
              required
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              disabled={loading}
              rows={3}
              className="w-full rounded-xl border-2 border-purple-700 px-4 py-2 sm:py-3 text-sm sm:text-base 
                         text-black placeholder:text-gray-600 focus:outline-none focus:border-purple-800 disabled:opacity-50 resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-purple-700 py-3 text-white text-sm sm:text-lg font-bold hover:bg-purple-800 transition disabled:opacity-50 mt-2"
            >
              {loading ? "Submitting..." : "Subscribe"}
            </button>
          </form>

          {message && (
            <p className={`mt-3 text-sm font-semibold ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <p className="mt-3 text-[10px] sm:text-xs text-gray-700 leading-relaxed">
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