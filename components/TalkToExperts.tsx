"use client";

import React, { useState, useRef } from "react";
import { MessageCircle, PhoneCall, Mail, Sparkles, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ExpertsPage() {
  const formRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Select a subject",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.subject === "Select a subject") {
      setError("Please select a subject.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "1daec5c1-6c76-4595-a1f5-f2905595d65f",
          subject: `New Contact Form: ${formData.subject}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Select a subject",
        message: "",
      });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fdfaf6] min-h-screen text-black">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 px-6 text-center bg-gradient-to-br from-[#fdfaf6] via-[#f3efe6] to-[#e6dbc8]/40"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Get personalized guidance for crystals, vastu, remedies, sage,
          handcrafted gifts &amp; spiritual solutions
        </p>
      </motion.section>

      {/* CONTACT CARDS */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* WHATSAPP */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-center"
          >
            <MessageCircle className="mx-auto mb-4 text-green-600" size={40} />
            <h3 className="text-2xl font-bold mb-3">WhatsApp Consultation</h3>
            <p className="mb-6 text-gray-700">
              Chat directly with our spiritual experts for quick guidance
            </p>
            <a
              href="https://wa.me/919560535717"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* CALL */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-center"
          >
            <PhoneCall className="mx-auto mb-4 text-blue-600" size={40} />
            <h3 className="text-2xl font-bold mb-3">Call Our Expert</h3>
            <p className="mb-6 text-gray-700">
              Speak directly for in-depth spiritual &amp; vastu consultation
            </p>
            <a
              href="tel:+919306662709"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Call Now
            </a>
          </motion.div>

          {/* EMAIL — scrolls to form */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-center"
          >
            <Mail className="mx-auto mb-4 text-[#E76F51]" size={40} />
            <h3 className="text-2xl font-bold mb-3">Email Support</h3>
            <p className="mb-6 text-gray-700">
              Share your query &amp; we&apos;ll get back with detailed guidance
            </p>
            <button
              onClick={scrollToForm}
              className="inline-block px-6 py-3 bg-[#E76F51] text-white rounded-xl hover:bg-[#d65a3d] transition"
            >
              Send Email
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* DR. ANJU INFO */}
      <section className="py-20 px-6">
        <div className="text-center">
          {/* Images row — both forced to same fixed size */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <div className="relative w-[440px] h-[440px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] flex-shrink-0">
              <Image
                src="/assets/contactus2.jpeg"
                alt="Contact Us"
                fill
                className="rounded-xl object-cover shadow-lg border-4 border-[#e6cfa7]"
              />
            </div>
            <div className="relative w-[440px] h-[440px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] flex-shrink-0">
              <Image
                src="/assets/contactpage.jpeg"
                alt="Dr. Anju Sharma Rana"
                fill
                className="rounded-xl object-cover shadow-lg border-4 border-[#e6cfa7]"
              />
            </div>
          </div>
          <h3 className="text-2xl font-bold">Dr. Anju Sharma Rana</h3>
          <p className="text-gray-700 mt-1">Reiki Grand Master</p>
          <p className="text-gray-700">Past Life Regression (PLR) &amp; Hypnoheal Therapist</p>
          <p className="text-gray-700">Guided Meditation, Crystals &amp; Vedic Remedies Expert</p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section ref={formRef} className="py-24 px-6 bg-gray-50 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-[#E76F51]" />
            <h2 className="text-3xl font-bold">Request a Personal Consultation</h2>
          </div>

          {/* Success message */}
          {success && (
            <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 border border-green-200 rounded-xl text-green-700">
              <CheckCircle size={22} />
              <span className="font-medium">
                Message sent successfully! We&apos;ll get back to you shortly.
              </span>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Full Name *"
              required
              disabled={loading}
              className="w-full border-2 border-black rounded-md px-4 py-3 text-black disabled:opacity-50"
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address *"
              required
              disabled={loading}
              className="w-full border-2 border-black rounded-md px-4 py-3 text-black disabled:opacity-50"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (optional)"
              disabled={loading}
              className="w-full border-2 border-black rounded-md px-4 py-3 text-black disabled:opacity-50"
            />

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border-2 border-black rounded-md px-4 py-3 text-black disabled:opacity-50"
            >
              <option value="Select a subject" disabled>Select a subject *</option>
              <option>Orders</option>
              <option>Products</option>
              <option>Support</option>
              <option>Crystal Consultation</option>
              <option>Spiritual Guidance</option>
              <option>Other</option>
            </select>

            <textarea
              name="message"
              rows={5}
              maxLength={500}
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message... *"
              required
              disabled={loading}
              className="w-full border-2 border-black rounded-md px-4 py-3 resize-none text-black disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[rgb(44_95_124)] text-white py-3 rounded-md font-semibold hover:bg-[rgb(54_105_134)] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
