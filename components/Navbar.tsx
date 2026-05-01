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
  const [desktopJewelleryOpen, setDesktopJewelleryOpen] = useState(false);

  // Timers for delayed close — prevents menu closing when mouse moves from button to dropdown
  const creativeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const crystalsTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const jewelleryTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (setter: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (timer.current) clearTimeout(timer.current);
    setter(true);
  };
  const closeMenu = (setter: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    timer.current = setTimeout(() => setter(false), 180);
  };

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
    { label: "Cotton Jute Item", slug: "creativeAndHandcrafted/jutt-item" },
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
    { label: "Crystal Anklets", slug: "crystalsAndSpiritual/crystal-anklets" },
    { label: "Crystal Rakhi", slug: "crystalsAndSpiritual/crystal-rakhi" },
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
    { label: "Crystal Pendants", slug: "crystalsAndSpiritual/crystal-pendants" },
  ];

  const jewelleryCategories = [
    { label: "Crystal Beads Set", slug: "crystalAccessories/crystal-beads-set" },
    { label: "Crystal Beads Bracelets", slug: "crystalAccessories/crystal-beads-bracelets" },
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
        {/* ── DESKTOP NAV ── */}
        <nav className="hidden lg:flex items-center justify-between max-w-[1440px] mx-auto px-10 py-5">
          {/* LEFT: Logo only */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src="/assets/logo6.png" alt="Logo" width={140} height={38} />
            </Link>
          </div>

          {/* CENTRE: Navigation Links */}
          <div className="flex items-center gap-8 text-[15px] font-medium text-gray-800">
            <Link href="/" onClick={(e) => handleNavClick(e, "Home")} className="hover:text-[#e6cfa7] transition-colors whitespace-nowrap">Home</Link>
            <Link href="/about" className="hover:text-[#e6cfa7] transition-colors whitespace-nowrap">About</Link>
            <Link href="/shop" className="hover:text-[#e6cfa7] transition-colors whitespace-nowrap">Shop</Link>
            <Link href="/collections" className="hover:text-[#e6cfa7] transition-colors whitespace-nowrap">Collections</Link>

            {/* Creative Mega Menu */}
            <div className="relative group" onMouseEnter={() => openMenu(setDesktopCreativeOpen, creativeTimer)} onMouseLeave={() => closeMenu(setDesktopCreativeOpen, creativeTimer)}>
              <button className="flex items-center gap-1 hover:text-[#e6cfa7] transition-colors whitespace-nowrap">
                Creative & Handcrafted <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {desktopCreativeOpen && (
                <div
                  className="fixed left-0 right-0 top-[78px] bg-white border-b shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300"
                  onMouseEnter={() => openMenu(setDesktopCreativeOpen, creativeTimer)}
                  onMouseLeave={() => closeMenu(setDesktopCreativeOpen, creativeTimer)}
                >
                  <div className="max-w-7xl mx-auto px-10 py-10 text-left">
                    <div className="grid grid-cols-4 gap-12">
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100 uppercase tracking-wider">Creative Arts</h3>
                        <div className="space-y-3">
                          {creativeCategories.filter(c => ["Art & Craft", "Cotton Jute Item"].includes(c.label)).map((cat) => (
                            <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all">{cat.label}</Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100 uppercase tracking-wider">Home Accents</h3>
                        <div className="space-y-3">
                          {creativeCategories.filter(c => ["Coir Products", "Dry Flowers", "Handmade Occasion-Special Items"].includes(c.label)).map((cat) => (
                            <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all">{cat.label}</Link>
                          ))}
                        </div>
                      </div>
                      <div className="border-l border-gray-100 pl-12 col-span-2">
                        <div className="bg-[#fff9f1] p-8 rounded-3xl text-center">
                          <h4 className="font-bold text-gray-900 mb-2">Artisan Collection</h4>
                          <p className="text-xs text-gray-600 mb-6 leading-relaxed">Unique pieces handcrafted with love and tradition.</p>
                          <Link href="/creativeAndHandcrafted" className="text-sm font-bold text-[#e6cfa7] hover:underline">View All Creative Items</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Crystals Mega Menu */}
            <div className="relative group" onMouseEnter={() => openMenu(setDesktopCrystalsOpen, crystalsTimer)} onMouseLeave={() => closeMenu(setDesktopCrystalsOpen, crystalsTimer)}>
              <button className="flex items-center gap-1 hover:text-[#e6cfa7] transition-colors whitespace-nowrap">
                Crystals & Spiritual <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {desktopCrystalsOpen && (
                <div
                  className="fixed left-0 right-0 top-[78px] bg-white border-b shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300"
                  onMouseEnter={() => openMenu(setDesktopCrystalsOpen, crystalsTimer)}
                  onMouseLeave={() => closeMenu(setDesktopCrystalsOpen, crystalsTimer)}
                >
                  <div className="max-w-7xl mx-auto px-10 py-10 text-left">
                    <div className="grid grid-cols-4 gap-12">
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100 uppercase tracking-wider">Natural Forms</h3>
                        <div className="space-y-3">
                          {crystalsCategories.slice(0, 8).map((cat) => (
                            <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all">{cat.label}</Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100 uppercase tracking-wider">Sacred Geometry</h3>
                        <div className="space-y-3">
                          {crystalsCategories.slice(8, 16).map((cat) => (
                            <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all">{cat.label}</Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100 uppercase tracking-wider">Divine Tools</h3>
                        <div className="space-y-3">
                          {crystalsCategories.slice(16).map((cat) => (
                            <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all">{cat.label}</Link>
                          ))}
                        </div>
                      </div>
                      <div className="border-l border-gray-100 pl-12">
                        <div className="bg-[#f0f9ff] p-8 rounded-3xl text-center">
                          <h4 className="font-bold text-gray-900 mb-2">Crystal Guidance</h4>
                          <p className="text-xs text-gray-600 mb-6 leading-relaxed">Discover which crystal resonates with your energy.</p>
                          <Link href="/crystalsAndSpiritual" className="text-sm font-bold text-blue-500 hover:underline">Explore All Crystals</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accessories Mega Menu */}
            <div className="relative group" onMouseEnter={() => openMenu(setDesktopJewelleryOpen, jewelleryTimer)} onMouseLeave={() => closeMenu(setDesktopJewelleryOpen, jewelleryTimer)}>
              <button className="flex items-center gap-1 hover:text-[#e6cfa7] transition-colors whitespace-nowrap">
                Crystal Accessories <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {desktopJewelleryOpen && (
                <div
                  className="fixed left-0 right-0 top-[78px] bg-white border-b shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300"
                  onMouseEnter={() => openMenu(setDesktopJewelleryOpen, jewelleryTimer)}
                  onMouseLeave={() => closeMenu(setDesktopJewelleryOpen, jewelleryTimer)}
                >
                  <div className="max-w-7xl mx-auto px-10 py-10 text-left">
                    <div className="grid grid-cols-4 gap-12">
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100 uppercase tracking-wider">Beaded Decor</h3>
                        <div className="space-y-3">
                          {jewelleryCategories.slice(0, 4).map((cat) => (
                            <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all">{cat.label}</Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-black font-bold text-sm mb-6 border-b pb-2 border-gray-100 uppercase tracking-wider">Wearable Energy</h3>
                        <div className="space-y-3">
                          {jewelleryCategories.slice(4).map((cat) => (
                            <Link key={cat.slug} href={`/${cat.slug}`} className="block text-sm text-gray-500 hover:text-[#e6cfa7] transition-all">{cat.label}</Link>
                          ))}
                        </div>
                      </div>
                      <div className="border-l border-gray-100 pl-12 col-span-2">
                        <div className="bg-[#fff1f1] p-8 rounded-3xl text-center">
                          <h4 className="font-bold text-gray-900 mb-2">Style with Purpose</h4>
                          <p className="text-xs text-gray-600 mb-6 leading-relaxed">Combine aesthetics with spiritual benefits.</p>
                          <Link href="/crystalAccessories" className="text-sm font-bold text-red-500 hover:underline">Browse Collection</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/schoolStationary" className="hover:text-[#e6cfa7] transition-colors whitespace-nowrap">School Stationary</Link>
          </div>

          {/* RIGHT: Search + Cart + Talk to Us */}
          <div className="flex items-center gap-7">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#e6cfa7] transition-colors" onClick={handleSearchClick} />
              {searchOpen && (
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearchKey}
                  placeholder="Search products..."
                  className="absolute right-7 top-1/2 -translate-y-1/2 w-56 px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-white shadow-md text-black placeholder:text-gray-400 caret-black z-50"
                  autoFocus
                />
              )}
            </div>
            <button onClick={() => setCartOpen(true)} className="relative hover:text-[#e6cfa7] transition-colors">
              <ShoppingCart size={22} className="text-gray-800" />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-[#e6cfa7] h-4 w-4 rounded-full text-[10px] flex items-center justify-center text-white">{totalItems}</span>}
            </button>
            <Link href="/experts" className="text-[15px] font-medium text-gray-800 hover:text-[#e6cfa7] transition-colors whitespace-nowrap">Talk to Us</Link>
          </div>
        </nav>

        {/* ── MOBILE NAV ── */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3">
          <Link href="/">
            <Image src="/assets/logo6.png" alt="Logo" width={130} height={36} />
          </Link>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-black cursor-pointer" onClick={handleSearchClick} />
            {searchOpen && (
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Search products..."
                className="absolute top-12 right-0 w-64 px-3 py-2 text-sm rounded-lg border bg-white shadow-lg text-black z-50"
                autoFocus
              />
            )}
            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="w-5 h-5 text-black" />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-[#e6cfa7] h-4 w-4 rounded-full text-[10px] flex items-center justify-center">{totalItems}</span>}
            </button>
            <button className="text-black" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t max-h-[80vh] overflow-y-auto pb-8">
            <div className="px-6 py-4 space-y-4">
              <Link href="/" className="block text-black" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/about" className="block text-black" onClick={() => setMenuOpen(false)}>About</Link>
              <Link href="/shop" className="block text-black" onClick={() => setMenuOpen(false)}>Shop</Link>
              <Link href="/collections" className="block text-black" onClick={() => setMenuOpen(false)}>Collections</Link>
              
              <div className="space-y-4 pt-2">
                <button onClick={() => setMobileCreativeOpen(!mobileCreativeOpen)} className="w-full flex justify-between items-center text-black">
                  <span>Creative & Handcrafted</span>
                  <ChevronDown size={16} className={mobileCreativeOpen ? "rotate-180" : ""} />
                </button>
                {mobileCreativeOpen && (
                  <div className="pl-4 space-y-2">
                    {creativeCategories.map(c => <Link key={c.slug} href={`/${c.slug}`} className="block text-sm text-gray-600" onClick={() => setMenuOpen(false)}>{c.label}</Link>)}
                  </div>
                )}

                <button onClick={() => setMobileCrystalsOpen(!mobileCrystalsOpen)} className="w-full flex justify-between items-center text-black">
                  <span>Crystals & Spirituality</span>
                  <ChevronDown size={16} className={mobileCrystalsOpen ? "rotate-180" : ""} />
                </button>
                {mobileCrystalsOpen && (
                  <div className="pl-4 space-y-2">
                    {crystalsCategories.map(c => <Link key={c.slug} href={`/${c.slug}`} className="block text-sm text-gray-600" onClick={() => setMenuOpen(false)}>{c.label}</Link>)}
                  </div>
                )}

                <button onClick={() => setMobileJewelleryOpen(!mobileJewelleryOpen)} className="w-full flex justify-between items-center text-black">
                  <span>Crystal Accessories</span>
                  <ChevronDown size={16} className={mobileJewelleryOpen ? "rotate-180" : ""} />
                </button>
                {mobileJewelleryOpen && (
                  <div className="pl-4 space-y-2">
                    {jewelleryCategories.map(c => <Link key={c.slug} href={`/${c.slug}`} className="block text-sm text-gray-600" onClick={() => setMenuOpen(false)}>{c.label}</Link>)}
                  </div>
                )}
              </div>

              <Link href="/schoolStationary" className="block text-black pt-2" onClick={() => setMenuOpen(false)}>School Stationary</Link>
              <Link href="/experts" className="block text-black" onClick={() => setMenuOpen(false)}>Talk to Us</Link>
            </div>
          </div>
        )}
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}