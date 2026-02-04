"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
import { Ticket, Copy, Check, Search } from "lucide-react";
import { toast } from "sonner";
import { useFavourite } from "@/hooks/use-favourite";

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

const PROMO_CODES = [
  { code: "FRESH25", discount: "25% OFF" },
  { code: "UNIFIED10", discount: "10% OFF" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const { favouriteList, isLoading } = useFavourite();
  const [isBumpAnimating, setIsBumpAnimating] = useState(false);
  const prevCountRef = useRef(0);
  const isFirstRender = useRef(true);

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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Promo code ${code} selected!`, {
      description: "Code has been copied to your clipboard.",
      duration: 2000,
    });
    setTimeout(() => setCopiedCode(null), 2000);
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
            className="text-white hover:text-white/80 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
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
            {/* Left: Search Input */}
            <div className="flex justify-start">
              <div className="relative group w-full max-w-55 focus-within:max-w-95 transition-all duration-500 ease-in-out">
                <Search
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${copiedCode ? "text-white/30" : "text-white/50 group-focus-within:text-primary group-focus-within:scale-110"}`}
                />
                <input
                  type="text"
                  placeholder="Search fresh produce..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/15 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                />
                {/* Visual indicator for search field expansion */}
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-focus-within:border-white/20 pointer-events-none transition-all duration-500" />
              </div>
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

            {/* Right: Promo Codes */}
            <div className="flex justify-end items-center gap-3">
              <div className="flex items-center gap-3">
                {PROMO_CODES.map((promo) => (
                  <button
                    key={promo.code}
                    onClick={() => handleCopyCode(promo.code)}
                    className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-dashed transition-all duration-300 ${
                      copiedCode === promo.code
                        ? "bg-white border-white text-primary scale-105"
                        : "border-white/20 text-white hover:border-white/50 hover:bg-white/10"
                    }`}
                  >
                    <Ticket
                      className={`w-3.5 h-3.5 ${copiedCode === promo.code ? "text-primary" : "text-white/60 group-hover:text-white"}`}
                    />
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[9px] font-black uppercase opacity-70">
                        {promo.discount}
                      </span>
                      <span className="text-xs font-black tracking-wider">
                        {promo.code}
                      </span>
                    </div>
                    {copiedCode === promo.code ? (
                      <Check className="w-3 h-3 text-primary animate-in zoom-in" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout Wrapper */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <div className="relative group flex-1 mr-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search items..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition-colors shadow-inner"
            />
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

                <div className="mt-4 pt-6 border-t border-gray-100 flex flex-col gap-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Active Offers
                  </p>
                  {PROMO_CODES.map((promo) => (
                    <button
                      key={promo.code}
                      onClick={() => {
                        handleCopyCode(promo.code);
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-all text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-xl shadow-sm">
                          <Ticket className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-primary">
                            {promo.discount}
                          </span>
                          <span className="text-lg font-black text-[#1A2D42]">
                            {promo.code}
                          </span>
                        </div>
                      </div>
                      <Copy className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
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
