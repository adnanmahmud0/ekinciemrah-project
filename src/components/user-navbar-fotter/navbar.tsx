"use client";

import { useState } from "react";
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

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Store", href: "/store" },
  { label: "Features", href: "/features" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="shadow-md bg-primary tracking-wide relative z-50">
      {/* Top bar */}
      <section className="flex items-center flex-wrap lg:justify-center gap-4 py-2.5 sm:px-10 px-4 border-primary-foreground/20 border-b min-h-[70px]">
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
        <Link href="/" className="max-sm:hidden">
          <span className="text-2xl font-bold text-white">Unified Produce</span>
        </Link>

        <Link href="/" className="hidden max-sm:block">
          <span className="text-xl font-bold text-white">Unified Produce</span>
        </Link>

        {/* Icons */}
        <div className="lg:absolute lg:right-10 flex items-center ml-auto gap-6 sm:gap-8">
          <Link
            href="#"
            className="text-white hover:text-white/80 transition-colors"
          >
            <Heart className="h-5 w-5" />
          </Link>

          <Link
            href="#"
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
                <DropdownMenuItem>
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
      <div className="flex justify-center sm:px-10 px-4 py-3 relative">
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-x-10">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="font-medium text-white hover:text-white/80"
            >
              {link.label}
            </Link>
          ))}
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
          <SheetContent side="left" className="w-[300px] sm:w-[380px] p-6">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" onClick={() => setIsOpen(false)}>
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
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
