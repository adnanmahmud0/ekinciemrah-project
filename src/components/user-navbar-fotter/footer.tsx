// components/Footer.tsx
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
];

const RESOURCES_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Condition", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-primary px-4 sm:px-6 py-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* CONTACT INFO */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <span className="font-medium">Phone:</span>
              <span className="text-white/80">+012 (345) 678 99</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <span className="font-medium">Email:</span>
              <span className="text-white/80">support@unifiedproduce.com</span>
            </div>
          </div>
        </div>

        {/* RESOURCES */}
        <div className="space-y-6">
          <h6 className="text-lg text-white font-bold">Resources</h6>
          <ul className="space-y-3 text-[15px]">
            {RESOURCES_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div className="space-y-6">
          <h6 className="text-lg text-white font-bold">Quick Links</h6>
          <ul className="space-y-3 text-[15px]">
            {QUICK_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* FOLLOW US ON */}
        <div className="space-y-6">
          <h6 className="text-lg text-white font-bold">Follow Us On</h6>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  href={link.href}
                  className="bg-white/10 p-2 rounded-full text-white hover:bg-white hover:text-primary transition-all"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Unified Produce.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
