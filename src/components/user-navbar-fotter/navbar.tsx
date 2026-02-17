"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  X,
  Heart,
  ShoppingCart,
  User,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  LogOut,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useFavourite } from "@/hooks/use-favourite";
import { useCart } from "@/hooks/use-cart";
import { useApi } from "@/hooks/use-api-data";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchProduct {
  _id: string;
  productName: string;
  image: string;
  basePrice: number;
}

interface SearchResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: SearchProduct[];
  };
}

const getImageUrl = (path: string | undefined) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/"))
    return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${path}`;
  return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${path}`;
};

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Service", href: "/service" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { favouriteList, isLoading } = useFavourite();
  const { cartCount, isLoading: isCartLoading } = useCart();
  const [isBumpAnimating, setIsBumpAnimating] = useState(false);
  const [isCartBumpAnimating, setIsCartBumpAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const prevCountRef = useRef(0);
  const prevCartCountRef = useRef(0);
  const isFirstRender = useRef(true);
  const isFirstCartRender = useRef(true);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const suggestionsEnabled = debouncedSearchQuery.trim().length > 0;

  const { data: searchResponse } = useApi<SearchResponse>(
    suggestionsEnabled
      ? `/product&catelog?search=${encodeURIComponent(debouncedSearchQuery.trim())}`
      : undefined,
    suggestionsEnabled
      ? ["global-search", debouncedSearchQuery.trim()]
      : undefined,
    {
      enabled: suggestionsEnabled,
      staleTime: 10000,
    },
  );

  const suggestions: SearchProduct[] =
    searchResponse?.data?.data?.slice(0, 6) || [];

  useEffect(() => {
    // Skip animation on initial load or if loading
    if (isLoading) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevCountRef.current = favouriteList.length;
      return;
    }

    if (favouriteList.length > prevCountRef.current) {
      const startTimer = setTimeout(() => setIsBumpAnimating(true), 0);
      const endTimer = setTimeout(() => setIsBumpAnimating(false), 300);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
    prevCountRef.current = favouriteList.length;
  }, [favouriteList.length, isLoading]);

  useEffect(() => {
    // Skip animation on initial load or if loading
    if (isCartLoading) return;

    if (isFirstCartRender.current) {
      isFirstCartRender.current = false;
      prevCartCountRef.current = cartCount;
      return;
    }

    if (cartCount > prevCartCountRef.current) {
      const startTimer = setTimeout(() => setIsCartBumpAnimating(true), 0);
      const endTimer = setTimeout(() => setIsCartBumpAnimating(false), 300);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount, isCartLoading]);

  const handleGlobalSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/service?search=${encodeURIComponent(trimmed)}`);
  };

  const handleSelectSuggestion = (product: SearchProduct) => {
    setSearchQuery(product.productName);
    setMobileSearchQuery(product.productName);
    router.push(`/service/${product._id}`);
  };

  return (
    <header className="shadow-md bg-primary tracking-wide relative z-50">
      {/* Top bar */}
      <section className="flex items-center flex-wrap lg:justify-center gap-4 py-2.5 sm:px-10 px-4 border-primary-foreground/20 border-b min-h-17.5">
        {/* Social Icons - desktop only */}
        <div className="absolute left-10 z-50 flex items-center gap-4 max-lg:hidden">
          {SOCIAL_LINKS.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                className="text-white transition-colors hover:text-white/80"
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </div>

        {/* Logo */}
        <Link href="/" className="max-sm:hidden font-brand">
          <span className="text-3xl font-bold text-white leading-none">
            Unified Produce
          </span>
        </Link>

        <Link href="/" className="hidden max-sm:block font-brand">
          <span className="text-2xl font-bold text-white leading-none">
            Unified Produce
          </span>
        </Link>

        {/* Icons */}
        <div className="lg:absolute lg:right-10 flex items-center ml-auto gap-6 sm:gap-8">
          <Link
            href="/favourite"
            className="text-white hover:text-white/80 transition-colors relative"
          >
            <div id="navbar-wishlist-icon" className="relative">
              <Heart
                className={`h-5 w-5 transition-transform duration-300 ${
                  isBumpAnimating
                    ? "animate-bump text-red-500 fill-red-500"
                    : ""
                }`}
              />
              {favouriteList.length > 0 && (
                <span
                  className={`absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full transition-transform duration-300 ${
                    isBumpAnimating ? "scale-125" : "scale-100"
                  }`}
                >
                  {favouriteList.length}
                </span>
              )}
            </div>
          </Link>

          <Link
            href="/cart"
            className="text-white hover:text-white/80 transition-colors relative"
          >
            <div id="navbar-cart-icon" className="relative">
              <ShoppingCart
                className={`h-5 w-5 transition-transform duration-300 ${
                  isCartBumpAnimating
                    ? "animate-bump text-[#146041] fill-[#146041]"
                    : ""
                }`}
              />
              {cartCount > 0 && (
                <span
                  className={`absolute -top-2 -right-2 bg-[#146041] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full transition-transform duration-300 ${
                    isCartBumpAnimating ? "scale-125" : "scale-100"
                  }`}
                >
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 overflow-hidden border-2 border-white/20 hover:border-white/50 transition-colors"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(user.role === "ADMIN" || user.role === "admin") && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    console.log("Opening profile dialog");
                    setIsProfileOpen(true);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="secondary" size="sm" className="font-semibold">
                Login
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Navigation */}
      <div className="sm:px-10 px-4 py-3 border-t border-white/10">
        <div className="container mx-auto">
          <div className="hidden lg:grid grid-cols-3 items-center w-full">
            <div className="flex justify-start">
              <form
                className="relative group w-full max-w-55 focus-within:max-w-95 transition-all duration-500 ease-in-out"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGlobalSearch(searchQuery);
                }}
              >
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 text-white/50 group-focus-within:text-primary group-focus-within:scale-110" />
                <input
                  type="text"
                  placeholder="Search fresh produce..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/15 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-focus-within:border-white/20 pointer-events-none transition-all duration-500" />
                {searchQuery.trim().length > 0 && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-80 overflow-y-auto z-50">
                    {suggestions.map((product) => (
                      <button
                        key={product._id}
                        type="button"
                        onClick={() => handleSelectSuggestion(product)}
                        className="w-full px-3 py-2 flex items-center gap-3 text-left hover:bg-gray-50"
                      >
                        <div className="relative h-9 w-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={getImageUrl(product.image)}
                            alt={product.productName}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex items-center justify-between gap-3">
                          <span className="text-sm text-gray-800 line-clamp-1">
                            {product.productName}
                          </span>
                          <span className="text-xs font-semibold text-[#004F3B]">
                            ${product.basePrice.toFixed(2)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </form>
            </div>

            {/* Center: Desktop Menu */}
            <div className="flex justify-center gap-x-10">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="font-bold text-white hover:text-white/80 transition-opacity tracking-wide uppercase text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div />
          </div>
        </div>

        {/* Mobile Layout Wrapper */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <div className="relative group flex-1 mr-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search items..."
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleGlobalSearch(mobileSearchQuery);
                  setIsOpen(false);
                }
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition-colors shadow-inner"
            />
            {mobileSearchQuery.trim().length > 0 && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-80 overflow-y-auto z-50">
                {suggestions.map((product) => (
                  <button
                    key={product._id}
                    type="button"
                    onClick={() => {
                      handleSelectSuggestion(product);
                      setIsOpen(false);
                    }}
                    className="w-full px-3 py-2 flex items-center gap-3 text-left hover:bg-gray-50"
                  >
                    <div className="relative h-9 w-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={getImageUrl(product.image)}
                        alt={product.productName}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex items-center justify-between gap-3">
                      <span className="text-sm text-gray-800 line-clamp-1">
                        {product.productName}
                      </span>
                      <span className="text-xs font-semibold text-[#004F3B]">
                        ${product.basePrice.toFixed(2)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu - using Sheet */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-75 sm:w-95 p-6">
              <div className="flex justify-between items-center mb-8">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="font-brand"
                >
                  <span className="text-xl font-bold text-foreground">
                    Unified Produce
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="flex flex-col gap-6 text-lg font-medium">
                {NAV_LINKS.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-4 pt-6 border-t border-gray-100 flex flex-col gap-4" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Profile Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          {user && (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary/20">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-secondary flex items-center justify-center">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                )}
              </div>
              <div className="text-center space-y-1">
                <h3 className="text-lg font-semibold text-[#0D1E32]">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
}
