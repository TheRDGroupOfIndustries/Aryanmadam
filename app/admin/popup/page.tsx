"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminPopupPage() {
  const router = useRouter();
  const [title, setTitle] = useState("10% off 54 collections");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPopupSettings();
  }, []);

  const fetchPopupSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/popup");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTitle(data.title || "10% off 54 collections");
      setIsActive(data.isActive !== undefined ? data.isActive : true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/popup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, isActive }),
      });

      if (!res.ok) throw new Error("Save failed");
      
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Popup Management
          </h2>
        </div>

        {loading ? (
            <div className="bg-white p-12 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-amber-600" />
                <p className="text-gray-500 font-medium animate-pulse">Loading configuration...</p>
            </div>
        ) : (
          <>
            {/* Form Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Popup Heading (First Line) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white transition"
                placeholder="e.g., 10% off 54 collections"
                required
              />
              <p className="mt-2 text-xs text-gray-500 italic">
                This is the main bold text that appears at the top of the popup.
              </p>
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-5 h-5 accent-amber-600 cursor-pointer"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">
                    Enable Popup on Website
                </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition disabled:opacity-50 cursor-pointer shadow-md"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-bold text-gray-800">Visual Preview</h3>
          </div>
          
          <div className="relative bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden max-w-[400px] mx-auto border border-gray-100 p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="absolute top-3 right-3 text-gray-400 text-xl font-light cursor-default">×</div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 leading-tight">
                  {title || "10% off 54 collections"}
                </h3>
                <p className="text-black text-xs sm:text-sm font-medium mb-6">Sign up for Special Discount Coupons</p>
                <div className="space-y-3">
                    <div className="w-full h-10 bg-white border-2 border-purple-700 rounded-lg"></div>
                    <div className="w-full h-10 bg-purple-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      Subscribe
                    </div>
                </div>
                <p className="mt-4 text-[10px] text-gray-500 leading-tight">
                  By signing up, you agree to receive marketing emails...
                </p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-gray-500">
            This preview shows how the popup will approximately appear to your customers.
          </p>
        </div>
      </>
    )}
      </div>
    </div>
  );
}
