"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";

const COIR_IMAGES = [
  "/assets/CoirProducts/coirProducts (1).jpeg",
  "/assets/CoirProducts/coirProducts (2).jpeg",
  "/assets/CoirProducts/coirProducts (3).jpeg",
  "/assets/CoirProducts/coirProducts (4).jpeg",
  "/assets/CoirProducts/coirProducts (5).jpeg",
  "/assets/CoirProducts/coirProducts (6).jpeg",
  "/assets/CoirProducts/coirProducts (7).png",
  "/assets/CoirProducts/coirProducts (8).jpeg",
  "/assets/CoirProducts/coirProducts (9).jpeg",
  "/assets/CoirProducts/coirProducts (10).jpeg",
];

export default function CoirProducts() {
  const [images, setImages] = useState<string[]>(COIR_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Try to pull real product images from the API; fall back to local assets
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/coir-products?category=all-coir");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const arr = Array.isArray(data) ? data : [];
        const apiImages = arr
          .flatMap((p: { images?: string[] }) => p.images ?? [])
          .filter(Boolean) as string[];
        if (apiImages.length > 0) setImages(apiImages);
      } catch {
        // keep local fallback
      }
    };
    fetchImages();
  }, []);

  const VISIBLE = 3;
  const maxIndex = Math.max(0, images.length - VISIBLE);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollRef.current) return;
      const cardWidth = scrollRef.current.scrollWidth / images.length;
      scrollRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    },
    [images.length]
  );

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev >= maxIndex ? 0 : prev + 1;
        scrollToIndex(next);
        return next;
      });
    }, 3000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isAutoPlaying, maxIndex, scrollToIndex]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const next = prev <= 0 ? maxIndex : prev - 1;
      scrollToIndex(next);
      return next;
    });
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const next = prev >= maxIndex ? 0 : prev + 1;
      scrollToIndex(next);
      return next;
    });
  };

  return (
    <section
      id="coir-products"
      className="relative py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fdfaf6 0%, #f5f0e6 50%, #ede0cc 100%)",
      }}
    >
      {/* Soft decorative blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#2C5F7C]/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E76F51]/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Centred heading ── */}
        <div className="flex flex-col items-center text-center mb-12 gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#2C5F7C]/10 rounded-xl">
              <Leaf className="w-5 h-5 text-[#2C5F7C]" />
            </div>
            <span className="text-xs font-semibold tracking-widest text-[#2C5F7C]/60 uppercase">
              Eco-Friendly Collection
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-[#2C5F7C] tracking-tight">
            Coir Products
          </h2>

          <p className="text-gray-500 text-sm sm:text-base max-w-md">
            Handcrafted, sustainable coir creations — from home décor to garden essentials
          </p>
        </div>

        {/* ── Carousel ── */}
        <div
          className="relative group"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Prev arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous"
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-10
                       w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full
                       flex items-center justify-center
                       shadow-lg border border-gray-200
                       opacity-0 group-hover:opacity-100
                       transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-[#2C5F7C]" />
          </button>

          {/* Next arrow */}
          <button
            onClick={handleNext}
            aria-label="Next"
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-10
                       w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full
                       flex items-center justify-center
                       shadow-lg border border-gray-200
                       opacity-0 group-hover:opacity-100
                       transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-[#2C5F7C]" />
          </button>

          {/* Image track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 snap-start
                           w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div
                  className="relative overflow-hidden rounded-2xl
                             shadow-[0_8px_32px_rgba(0,0,0,0.10)]
                             hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)]
                             transition-all duration-500 hover:-translate-y-2
                             bg-[#f0ebe0]"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={src}
                    alt={`Coir product ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(i);
                scrollToIndex(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-8 bg-[#2C5F7C]"
                  : "w-2 bg-[#2C5F7C]/25 hover:bg-[#2C5F7C]/50"
              }`}
            />
          ))}
        </div>

        {/* ── View All Buttons ── */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <Link
            href="/creativeAndHandcrafted/coir-products/all-coir"
            className="px-8 py-3 bg-[#2C5F7C] text-white font-semibold rounded-xl 
                       shadow-lg hover:bg-[#1A4A5E] transition-all duration-300 
                       hover:scale-105 active:scale-95"
          >
            Show All Coir Products
          </Link>
          <Link
            href="/creativeAndHandcrafted/dry-flowers/all-dry-flowers"
            className="px-8 py-3 border-2 border-[#2C5F7C] text-[#2C5F7C] font-semibold 
                       rounded-xl hover:bg-[#2C5F7C] hover:text-white 
                       transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Show All Dry Flowers
          </Link>
        </div>

      </div>
    </section>
  );
}
