"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/app/providers/CartProvider";
import CurtainReveal from "@/components/CurtainReveal";

const ART_CRAFT_COLLECTIONS = [
  { id: 1, title: 'Moulds', image: "/assets/art-craft/moulds_minimal.png", count: '10+ Products', desc: 'Silicone and wooden moulds for resin and clay.', bgColor: '#ffeddb' },
  { id: 2, title: 'Mirror', image: '/assets/art-craft/mirror.png', count: '15+ Products', desc: 'Various shapes and sizes of craft mirrors.', bgColor: '#e3f0f5' },
  { id: 3, title: 'Craft material', image: '/assets/art-craft/craft-material.png', count: '50+ Products', desc: 'Essential materials for all your craft projects.', bgColor: '#ebdff5' },
  { id: 4, title: 'Resin Material', image: '/assets/art-craft/resin-material.png', count: '20+ Products', desc: 'High-quality resin, pigments, and additives.', bgColor: '#f5e1ef' },
  { id: 5, title: '3D Modelling', image: '/assets/art-craft/3d-modelling.png', count: '12+ Products', desc: 'Tools and kits for detailed 3D modelling.', bgColor: '#d9f5e1' },
  { id: 6, title: 'Clay modelling', image: '/assets/art-craft/clay-modelling.png', count: '18+ Products', desc: 'Air-dry and polymer clay with sculpting tools.', bgColor: '#f5ebbd' },
  { id: 7, title: 'Memories casting', image: '/assets/art-craft/memories-casting.png', count: '8+ Products', desc: 'Kits for capturing precious moments in casts.', bgColor: '#fdf3e7' },
  { id: 8, title: 'Candle making material', image: '/assets/art-craft/candle-making.png', count: '25+ Products', desc: 'Wax, wicks, and scents for candle making.', bgColor: '#f0e6f5' },
];

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  images: string[];
  rating: number;
  stock: number;
  category: string;
}

export default function CreativeCategoryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, increaseQty, decreaseQty, items } = useCart();

  const cartItemById = (id: string) =>
    items.find((item) => item.id === id);

  const handleExplore = (title: string) => {
    const s = title.toLowerCase().replace(/\s+/g, '-');
    router.push(`/shop?collection=${encodeURIComponent(s)}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!slug || slug === 'art-craft') {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/creative?category=${slug}`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const isArtCraft = slug === 'art-craft';

  return (
    <>
      <Navbar />

      <section className={`min-h-screen px-6 py-20 ${isArtCraft ? "bg-white font-serif" : "bg-[#fdfaf6]"}`}>
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[rgb(44_95_124)] capitalize">
              {slug?.toString().replace(/-/g, " ")}
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              {isArtCraft ? "Discover curated collections of premium craft supplies." : "Handpicked creative & handcrafted items"}
            </p>
          </div>

          {/* CONTENT */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-[#e6cfa7] border-r-transparent"></div>
              <p className="mt-4 text-gray-600 font-medium">
                Loading...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-red-600 text-lg font-medium">{error}</div>
              <p className="text-gray-500 mt-2">Please try again later</p>
            </div>
          ) : isArtCraft ? (
            /* COLLECTION GRID FOR ART CRAFT - EXACT COPY FROM Collections.tsx */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {ART_CRAFT_COLLECTIONS.map((c, i) => (
                <CurtainReveal key={c.id} delay={i * 0.12}>
                  <div
                    className="group relative rounded-3xl overflow-hidden
                               border border-[#e6cfa7]/25
                               shadow-[0_10px_30px_rgba(0,0,0,0.1)]
                               cursor-pointer
                               hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)]
                               transition-all duration-300"
                    style={{ backgroundColor: c.bgColor }}
                  >
                    <div className="h-56 overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.title}
                        className={`w-full h-full object-cover
                                   group-hover:scale-110
                                   transition duration-700
                                   ${c.id === 1 ? 'opacity-100' : 'grayscale opacity-30 mix-blend-multiply'}`}
                      />
                    </div>

                    <div className="absolute bottom-0 p-6 w-full">
                      <span
                        className="inline-block mb-2 px-3 py-1 text-xs
                                   rounded-full bg-[#e6cfa7]/20
                                   text-[#2b1d12]"
                      >
                        {c.count}
                      </span>

                      <h3 className="text-xl font-semibold mb-2 text-[#2b1d12]">
                        {c.title}
                      </h3>

                      <p className="text-sm mb-4 text-[#2b1d12]/80">
                        {c.desc}
                      </p>

                      <button
                        onClick={() => handleExplore(c.title)}
                        className="px-5 py-2 rounded-full
                                   border border-[#e6cfa7]
                                   text-[#2b1d12]
                                   hover:bg-[#e6cfa7]
                                   hover:text-white
                                   cursor-pointer
                                   transition text-sm"
                      >
                        Explore Collection
                      </button>
                    </div>
                  </div>
                </CurtainReveal>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-600 text-xl font-medium">
                No products available yet
              </div>
              <p className="text-gray-500 mt-2">
                New items coming soon ✨
              </p>
            </div>
          ) : (
            /* PRODUCT GRID FOR OTHER SLUGS */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => {
                const cartItem = cartItemById(p.id);

                return (
                  <div
                    key={p.id}
                    className="bg-white border border-gray-200 text-[rgb(44_95_124)] p-5 rounded-2xl flex flex-col shadow-sm hover:shadow-lg hover:border-gray-300 transition-all"
                  >
                    {/* IMAGE */}
                    <Link href={`/product/${p.id}`} className="block">
                      <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-gray-50">
                        {p.images?.length > 0 ? (
                          <Image
                            src={p.images[0]}
                            alt={p.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 hover:scale-110"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                            No Image
                          </div>
                        )}

                        {p.stock === 0 && (
                          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* TITLE */}
                    <Link href={`/product/${p.id}`}>
                      <h3 className="font-bold min-h-[2.5rem] line-clamp-2 hover:text-[#e6cfa7] transition-colors">
                        {p.title}
                      </h3>
                    </Link>

                    {/* RATING */}
                    <div className="mt-2 flex items-center gap-1">
                      <div className="text-amber-500 text-sm">
                        {"★".repeat(Math.floor(p.rating))}
                        {"☆".repeat(5 - Math.floor(p.rating))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({p.rating.toFixed(1)})
                      </span>
                    </div>

                    {/* PRICE */}
                    <div className="mt-3 flex items-center gap-2 mb-3">
                      <span className="font-bold text-xl">
                        ₹{p.price.toLocaleString()}
                      </span>
                      {p.oldPrice && (
                        <>
                          <span className="text-sm line-through text-gray-400">
                            ₹{p.oldPrice.toLocaleString()}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-md">
                            {Math.round(
                              ((p.oldPrice - p.price) / p.oldPrice) * 100
                            )}
                            % OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* STOCK */}
                    <div className="text-xs mb-4">
                      {p.stock > 0 ? (
                        <span className="text-green-600 font-medium">
                          In Stock ({p.stock})
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* CART */}
                    {!cartItem ? (
                      <button
                        onClick={() =>
                          addToCart({
                            id: p.id,
                            title: p.title,
                            price: p.price,
                            image: p.images[0] || "/placeholder.jpg",
                            quantity: 1,
                          })
                        }
                        disabled={p.stock === 0}
                        className="mt-auto bg-[rgb(44_95_124)] text-white py-3 rounded-xl font-semibold hover:bg-[#1a120a] disabled:bg-gray-300"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="mt-auto flex justify-between items-center border rounded-xl px-4 py-3 bg-gray-50">
                        <button
                          onClick={() => decreaseQty(cartItem.id)}
                          className="text-xl font-bold"
                        >
                          −
                        </button>
                        <span className="font-bold">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(cartItem.id)}
                          disabled={cartItem.quantity >= p.stock}
                          className="text-xl font-bold disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}