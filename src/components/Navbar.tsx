"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Players", href: "/players" },
    { name: "Rosters", href: "/rosters" },
    { name: "Tournaments", href: "/tournaments" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-[#080808]/60 backdrop-blur-lg border-white/5 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group" aria-label="TNFFM Home">
          <Image
            src="/images/logo/logo.png"
            alt="TNFFM Logo"
            width={180}
            height={120}
            className="w-[140px] h-[32px] md:w-[170px] md:h-[38px] object-cover object-[center_48%] transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive =
              (link.name === "About" && pathname === "/about") ||
              (link.name === "Rosters" && pathname.startsWith("/rosters")) ||
              (link.name === "Players" && pathname.startsWith("/players")) ||
              (link.name === "Tournaments" && pathname.startsWith("/tournaments"));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors",
                  isActive
                    ? "text-primary drop-shadow-[0_0_8px_rgba(255,59,48,0.5)]"
                    : "text-white/60 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="https://chat.whatsapp.com/LCP24W7GlhM40bIL3ey29R"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-all hover:scale-105 hover:bg-gray-100 active:scale-95"
          >
            Join Community
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-[#111111] border-b border-white/10 p-6 shadow-xl md:hidden flex flex-col gap-4"
        >
          {navLinks.map((link) => {
            const isActive =
              (link.name === "About" && pathname === "/about") ||
              (link.name === "Rosters" && pathname.startsWith("/rosters")) ||
              (link.name === "Players" && pathname.startsWith("/players")) ||
              (link.name === "Tournaments" && pathname.startsWith("/tournaments"));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-medium tracking-wide transition-colors py-2 border-b border-white/5",
                  isActive ? "text-primary" : "text-white/70 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="https://chat.whatsapp.com/LCP24W7GlhM40bIL3ey29R"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 inline-flex h-12 items-center justify-center rounded-md bg-white px-6 text-base font-semibold text-black transition-colors"
          >
            Join Community
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
