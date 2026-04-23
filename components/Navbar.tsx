"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [desktopCreativeOpen, setDesktopCreativeOpen] = useState(false);
  const [desktopCrystalsOpen, setDesktopCrystalsOpen] = useState(false);
  const [desktopRemediesOpen, setDesktopRemediesOpen] = useState(false);
  const [desktopJewelleryOpen, setDesktopJewelleryOpen] = useState(false);

  // Mobile submenu states
  const [mobileCreativeOpen, setMobileCreativeOpen] = useState(false);
  const [mobileCrystalsOpen, setMobileCrystalsOpen] = useState(false);
  const [mobileRemediesOpen, setMobileRemediesOpen] = useState(false);
  const [mobileJewelleryOpen, setMobileJewelleryOpen] = useState(false);

  const [query, setQuery] = useState("");

  const { items } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const pathname = usePathname();
  const router = useRouter();

  /* ---------------- NAV HANDLER ---------------- */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: string
  ) => {
    if (item === "Home") {
      e.preventDefault();
      pathname === "/"
        ? window.scrollTo({ top: 0, behavior: "smooth" })
        : router.push("/");
    }
  };

  /* ---------------- SEARCH LOGIC ---------------- */
  const performSearch = () => {
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  };

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") performSearch();
  };

  const handleSearchClick = () => {
    if (searchOpen && query.trim()) {
      performSearch();
    } else {
      setSearchOpen((p) => !p);
    }
  };

  /* ---------------- DATA ---------------- */

  const creativeCategories = [
    { label: "Art & Craft", slug: "creativeAndHandcrafted/art-craft" },
    { label: "Handmade Occasion-Special Items", slug: "creativeAndHandcrafted/handmade-special" },
    { label: "Jutt Item", slug: "creativeAndHandcrafted/jutt-item" },
    { label: "Coir Products", slug: "creativeAndHandcrafted/coir-products" },
    { label: "Dry Flowers", slug: "creativeAndHandcrafted/dry-flowers" },
  ];

  const crystalsCategories = [
    { label: "Natural Crystals", slug: "crystalsAndSpiritual/natural-crystals" },
    { label: "Crystal Frames", slug: "crystalsAndSpiritual/crystal-frames" },
    { label: "Crystal Birds", slug: "crystalsAndSpiritual/crystal-birds" },
    { label: "Crystal Trees", slug: "crystalsAndSpiritual/crystal-trees" },
    { label: "Crystal Angles", slug: "crystalsAndSpiritual/crystal-angles" },
    { label: "Crystal Balls", slug: "crystalsAndSpiritual/crystal-balls" },
    { label: "Crystal Rings", slug: "crystalsAndSpiritual/crystal-rings" },
    { label: "Anklets", slug: "crystalsAndSpiritual/anklets" },
    { label: "Crystal Clocks", slug: "crystalsAndSpiritual/crystal-clocks" },
    { label: "Crystal Pyramid", slug: "crystalsAndSpiritual/crystal-pyramid" },
    { label: "Crystal Pencils", slug: "crystalsAndSpiritual/crystal-pencils" },
    { label: "Crystal Box", slug: "crystalsAndSpiritual/crystal-box" },
    { label: "Crystal Idols", slug: "crystalsAndSpiritual/crystal-idols" },
    { label: "Pyrite Dust Frames", slug: "crystalsAndSpiritual/pyrite-dust-frames" },
    { label: "Crystal Seven Chakra Healing Frames", slug: "crystalsAndSpiritual/seven-chakra-frames" },
    { label: "Crystal Strings", slug: "crystalsAndSpiritual/crystal-strings" },
    { label: "Crystal Animals", slug: "crystalsAndSpiritual/crystal-animals" },
    { label: "Yantras", slug: "crystalsAndSpiritual/yantras" },
    { label: "Thakur Ji Dresses", slug: "crystalsAndSpiritual/thakur-ji-dresses" },
    { label: "Rudraksh", slug: "crystalsAndSpiritual/rudraksh" },
    { label: "Pooja Items", slug: "crystalsAndSpiritual/pooja-items" },
    { label: "Sage", slug: "crystalsAndSpiritual/sage" },
    { label: "God Idols", slug: "crystalsAndSpiritual/god-idols" },
    { label: "Crystal Tumbler Kit", slug: "crystalsAndSpiritual/crystal-tumbler-kit" },
    { label: "Crystal Decor", slug: "crystalsAndSpiritual/crystal-decor" },

  ];

  const jewelleryCategories = [
    { label: "Crystal Beads Set", slug: "crystalAccessories/crystal-beads-set" },
    { label: "Crystal Chips Mala Set", slug: "crystalAccessories/crystal-chips-mala-set" },
    { label: "Crystal Beads Bracelets", slug: "crystalAccessories/crystal-beads-bracelets" },
    { label: "Crystal Chips Bracelets", slug: "crystalAccessories/crystal-chips-bracelets" },
    { label: "Crystal Pendents", slug: "crystalAccessories/crystal-pendents" },
    { label: "Crystal Anklets", slug: "crystalAccessories/crystal-anklets" },
    { label: "Crystal Bangles", slug: "crystalAccessories/crystal-bangles" },
  ];

  const remediesCategories = [
    { label: "All Remedies", slug: "remedies" },
    { label: "Wealth", slug: "remedies/wealth" },
    { label: "Health", slug: "remedies/health" },
    { label: "Relationship", slug: "remedies/relationship" },
    { label: "Protection", slug: "remedies/protection" },
    { label: "Self-Confidence", slug: "remedies/self-confidence" },
    { label: "Education", slug: "remedies/education" },
    { label: "Crown Chakra", slug: "remedies/crown-chakra" },
    { label: "Third Eye Chakra", slug: "remedies/third-eye-chakra" },
    { label: "Throat Chakra", slug: "remedies/throat-chakra" },
    { label: "Heart Chakra", slug: "remedies/heart-chakra" },
    { label: "Solar Plexus Chakra", slug: "remedies/solar-plexus-chakra" },
    { label: "Sacral Chakra", slug: "remedies/sacral-chakra" },
    { label: "Root Chakra", slug: "remedies/root-chakra" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b isolate">
        {/* ── DESKTOP NAV: 3-column layout ── */}
        <nav className="hidden lg:flex items-center justify-between max-w-screen-xl mx-auto px-8 py-4">

          {/* LEFT: Logo only */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <Image src="/assets/logo6.png" alt="Logo" width={120} height={34} />
            </Link>
          </div>

          {/* CENTRE: Nav links */}
          <div className="flex items-center gap-5 text-sm font-medium text-gray-700 px-10">
            <Link href="/" onClick={(e) => handleNavClick(e, "Home")} className="hover:text-[#e6cfa7] transition-colors whitespace-nowrap">Home</Link>
            <Link href="/about" className="hover:text-[#e6cfa7] transition-colors whitespace-nowrap">About</Link>
            <Link href="/shop" className="hover:text-[#e6cfa7] transition-colors whitespace-nowrap">Shop</Link>
            <Link href="/collections" className="hover:text-[#e6cfa7] transition-colors whitespace-nowrap">Collections</Link>

            {/* 1. Creative & Handcrafted */}
            <div className="relative group" onMouseEnter={() => setDesktopCreativeOpen(true)} onMouseLeave={() => setDesktopCreativeOpen(false)}>
              <button className="flex items-center gap-1 hover:text-[#e6cfa7] transition-colors whitespace-nowrap">
                Creative & Handcrafted <ChevronDown size={13} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {desktopCreativeOpen && (
                <div className="fixed left-0 right-0 top-[73px] bg-white border-b shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-4 gap-12">
                      {/* Column 1: Arts & Crafts */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Creative Arts</h3>
                        <div className="space-y-3">
                          {creativeCategories.filter(c =>
                            ["Art & Craft", "Jutt Item"].includes(c.label)
                          ).map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/${cat.slug}`}
                              className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Special Items */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Special Collections</h3>
                        <div className="space-y-3">
                          {creativeCategories.filter(c =>
                            ["Handmade Occasion-Special Items"].includes(c.label)
                          ).map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/${cat.slug}`}
                              className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Eco Fibers */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Eco & Fibers</h3>
                        <div className="space-y-3">
                          {creativeCategories.filter(c =>
                            ["Coir Products", "Dry Flowers"].includes(c.label)
                          ).map((cat) => (
                            <div key={cat.slug}>
                              <Link
                                href={`/${cat.slug}`}
                                className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                              >
                                {cat.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Column 4: Handicraft Promo */}
                      <div className="flex flex-col gap-4">
                        <div className="bg-[#f1f8fc] p-6 rounded-2xl relative overflow-hidden group/promo">
                          <div className="relative z-10">
                            <h4 className="font-bold text-gray-900 mb-2">Artisan Crafts</h4>
                            <p className="text-xs text-gray-600 mb-4 leading-relaxed">Unique handcrafted pieces made with love and precision.</p>
                            <Link href="/shop" className="inline-block bg-black text-white px-5 py-2 text-xs font-semibold rounded-full hover:bg-gray-800 transition-colors">
                              View Gallery
                            </Link>
                          </div>
                          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover/promo:scale-110 transition-transform">
                            <ShoppingCart size={120} />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Crystals & Spiritual */}
            <div className="relative group" onMouseEnter={() => setDesktopCrystalsOpen(true)} onMouseLeave={() => setDesktopCrystalsOpen(false)}>
              <button className="flex items-center gap-1 hover:text-[#e6cfa7] transition-colors whitespace-nowrap">
                Crystals & Spiritual <ChevronDown size={13} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {desktopCrystalsOpen && (
                <div className="fixed left-0 right-0 top-[73px] bg-white border-b shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-4 gap-12">
                      {/* Column 1: Core Crystals */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Crystals & Frames</h3>
                        <div className="space-y-3">
                          {crystalsCategories.filter(c =>
                            ["Natural Crystals", "Crystal Frames", "Crystal Birds", "Crystal Trees", "Crystal Angles", "Crystal Balls", "Crystal Rings", "Anklets"].includes(c.label)
                          ).map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/${cat.slug}`}
                              className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Decorative & Specialty Crystals */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Crystal Collection</h3>
                        <div className="space-y-3">
                          {crystalsCategories.filter(c =>
                            ["Crystal Clocks", "Crystal Pyramid", "Crystal Pencils", "Crystal Box", "Crystal Idols", "Pyrite Dust Frames", "Crystal Seven Chakra Healing Frames", "Crystal Strings", "Crystal Animals", "Crystal Tumbler Kit", "Crystal Decor"].includes(c.label)
                          ).map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/${cat.slug}`}
                              className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Spiritual & Pooja */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Spiritual & Pooja</h3>
                        <div className="space-y-3">
                          {crystalsCategories.filter(c =>
                            ["Yantras", "Thakur Ji Dresses", "Rudraksh", "Pooja Items", "Sage", "God Idols"].includes(c.label)
                          ).map((cat) => (
                            <div key={cat.slug}>
                              <Link
                                href={`/${cat.slug}`}
                                className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all"
                              >
                                {cat.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Column 4: Promo Space */}
                      <div className="flex flex-col gap-4">
                        <div className="bg-[#fcf8f1] p-6 rounded-2xl relative overflow-hidden group/promo">
                          <div className="relative z-10">
                            <h4 className="font-bold text-gray-900 mb-2">Crystal Healing</h4>
                            <p className="text-xs text-gray-600 mb-4 leading-relaxed">Discover the power of natural crystals for your wellness.</p>
                            <Link href="/shop" className="inline-block bg-black text-white px-5 py-2 text-xs font-semibold rounded-full hover:bg-gray-800 transition-colors">
                              Explore Now
                            </Link>
                          </div>
                          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover/promo:scale-110 transition-transform">
                            <Search size={120} />
                          </div>
                        </div>
                        <div className="border border-gray-100 p-6 rounded-2xl">
                          <h4 className="font-bold text-sm text-gray-900 mb-1">Expert Pick</h4>
                          <p className="text-xs text-gray-500">Hand-selected spiritual items of the month.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Crystal Accessories */}
            <div className="relative group" onMouseEnter={() => setDesktopJewelleryOpen(true)} onMouseLeave={() => setDesktopJewelleryOpen(false)}>
              <button className="flex items-center gap-1 hover:text-[#e6cfa7] transition-colors whitespace-nowrap">
                Crystal Accessories <ChevronDown size={13} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {desktopJewelleryOpen && (
                <div className="fixed left-0 right-0 top-[73px] bg-white border-b shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-4 gap-12">
                      {/* Column 1: Beads & Malas */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Beads &amp; Malas</h3>
                        <div className="space-y-3">
                          {jewelleryCategories.filter(c =>
                            ["Crystal Beads Set", "Crystal Chips Mala Set"].includes(c.label)
                          ).map((cat) => (
                            <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all">
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Bracelets */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">Bracelets</h3>
                        <div className="space-y-3">
                          {jewelleryCategories.filter(c =>
                            ["Crystal Beads Bracelets", "Crystal Chips Bracelets"].includes(c.label)
                          ).map((cat) => (
                            <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all">
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Other Accessories */}
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100">More Accessories</h3>
                        <div className="space-y-3">
                          {jewelleryCategories.filter(c =>
                            ["Crystal Pendents", "Crystal Anklets", "Crystal Bangles"].includes(c.label)
                          ).map((cat) => (
                            <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all">
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 4: Promo */}
                      <div className="flex flex-col gap-4">
                        <div className="bg-[#fdf4fb] p-6 rounded-2xl relative overflow-hidden group/promo">
                          <div className="relative z-10">
                            <h4 className="font-bold text-gray-900 mb-2">Crystal Accessories</h4>
                            <p className="text-xs text-gray-600 mb-4 leading-relaxed">Handcrafted crystal accessories infused with healing energy.</p>
                            <Link href="/shop" className="inline-block bg-black text-white px-5 py-2 text-xs font-semibold rounded-full hover:bg-gray-800 transition-colors">
                              Shop Now
                            </Link>
                          </div>
                          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover/promo:scale-110 transition-transform">
                            <ShoppingCart size={120} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. School Stationary */}
            <Link href="/shop?category=School+Stationary" className="hover:text-[#e6cfa7] transition-colors whitespace-nowrap">
              School Stationary
            </Link>
          </div>

          {/* RIGHT: Search + Cart + Talk to Us */}
          <div className="flex items-center gap-5 flex-shrink-0 relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-black transition-colors" onClick={handleSearchClick} />
              {searchOpen && (
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearchKey} placeholder="Search products..." className="absolute right-7 top-1/2 -translate-y-1/2 w-56 px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-white shadow-md text-black placeholder:text-gray-400 caret-black z-50" autoFocus />
              )}
            </div>
            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-black transition-colors" />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-[#e6cfa7] h-5 w-5 rounded-full text-xs flex items-center justify-center">{totalItems}</span>}
            </button>
            <Link href="/experts" className="text-sm font-medium text-gray-700 hover:text-[#e6cfa7] transition-colors">Talk to Us</Link>
          </div>
        </nav>

        {/* ── MOBILE TOP BAR ── */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3">
          <Link href="/">
            <Image src="/assets/logo6.png" alt="Logo" width={130} height={36} />
          </Link>
          <div className="flex items-center gap-4 relative">
            <Search className="w-5 h-5 text-black cursor-pointer" onClick={handleSearchClick} />
            {searchOpen && (
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearchKey} placeholder="Search products..." className="absolute top-8 right-0 w-56 px-3 py-2 text-sm rounded-lg border bg-white shadow text-black placeholder:text-gray-400 caret-black z-50" autoFocus />
            )}
            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="w-5 h-5 text-black" />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-[#e6cfa7] h-4 w-4 rounded-full text-[10px] flex items-center justify-center">{totalItems}</span>}
            </button>
            <button className="text-black" onClick={() => setMenuOpen((p) => !p)}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>


        {menuOpen && (
          <div className="lg:hidden bg-white border-t max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 space-y-3">
              <Link
                href="/"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>

              <Link
                href="/shop"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Collections
              </Link>

              {/* 1. Mobile Creative & Handicraft */}
              <div>
                <button
                  onClick={() => setMobileCreativeOpen((p) => !p)}
                  className="w-full flex items-center justify-between py-2 text-black"
                >
                  <span>Creative & Handcrafted</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileCreativeOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {mobileCreativeOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {creativeCategories.map((cat) => (
                      <div key={cat.slug}>
                        <Link
                          href={`/${cat.slug}`}
                          className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                          onClick={() => setMenuOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Mobile Crystal & Spirituality */}
              <div>
                <button
                  onClick={() => setMobileCrystalsOpen((p) => !p)}
                  className="w-full flex items-center justify-between py-2 text-black"
                >
                  <span>Crystal &amp; Spirituality</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileCrystalsOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {mobileCrystalsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {crystalsCategories.map((cat) => (
                      <div key={cat.slug}>
                        <Link
                          href={`/${cat.slug}`}
                          className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                          onClick={() => setMenuOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Mobile Crystal Accessories */}
              <div>
                <button
                  onClick={() => setMobileJewelleryOpen((p) => !p)}
                  className="w-full flex items-center justify-between py-2 text-black"
                >
                  <span>Crystal Accessories</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileJewelleryOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileJewelleryOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {jewelleryCategories.map((cat) => (
                      <div key={cat.slug}>
                        <Link
                          href={`/${cat.slug}`}
                          className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                          onClick={() => setMenuOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Mobile School Stationary */}
              <Link
                href="/shop?category=School+Stationary"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                School Stationary
              </Link>

              {/* Mobile Remedies */}
              <div>
                <button
                  onClick={() => setMobileRemediesOpen((p) => !p)}
                  className="w-full flex items-center justify-between py-2 text-black"
                >
                  <span>Remedies</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileRemediesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {mobileRemediesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {remediesCategories.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        className="block py-1 text-sm text-black hover:text-[#e6cfa7]"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>



              <Link
                href="/experts"
                className="block py-2 text-black hover:text-[#e6cfa7]"
                onClick={() => setMenuOpen(false)}
              >
                Talk to Us
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}