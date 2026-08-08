"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, Tv, Gamepad2, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  // Ensure it shows 2026 as per user requirement, or dynamic if preferred. User said: © 2026 TNFFM.
  const displayYear = 2026; 

  return (
    <footer className="border-t border-border bg-surface pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group" aria-label="TNFFM Home">
              <Image
                src="/images/logo/logo.png"
                alt="TNFFM Logo"
                width={150}
                height={100}
                className="w-[120px] h-[28px] md:w-[140px] md:h-[32px] object-cover object-[center_48%] transition-opacity group-hover:opacity-80"
              />
            </Link>
            <p className="text-muted max-w-sm leading-relaxed mb-8">
              The premier platform for Free Fire MAX players, teams, and tournament organizers in Tamil Nadu.
            </p>
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted cursor-default" aria-label="Website">
                <Globe size={18} />
              </span>
              <span className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted cursor-default" aria-label="Stream">
                <Tv size={18} />
              </span>
              <span className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted cursor-default" aria-label="Gaming">
                <Gamepad2 size={18} />
              </span>
              <a href="https://chat.whatsapp.com/LCP24W7GlhM40bIL3ey29R" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/tournaments" className="text-muted hover:text-primary transition-colors">Tournaments</Link></li>
              <li><Link href="/rosters" className="text-muted hover:text-primary transition-colors">Teams</Link></li>
              <li><Link href="/players" className="text-muted hover:text-primary transition-colors">Players</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted hover:text-primary transition-colors">About Us</Link></li>
              <li><a href="https://chat.whatsapp.com/LCP24W7GlhM40bIL3ey29R" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            &copy; {displayYear} TNFFM. All rights reserved.
          </p>
          <div className="text-muted text-sm flex items-center gap-2">
            Designed for Tamil Nadu <span className="text-primary">&hearts;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
