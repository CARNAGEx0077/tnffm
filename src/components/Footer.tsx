"use client";

import Link from "next/link";
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
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-black tracking-tighter text-white">
                TNFFM
              </span>
            </Link>
            <p className="text-muted max-w-sm leading-relaxed mb-8">
              The premier platform for Free Fire MAX players, teams, and tournament organizers in Tamil Nadu.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-colors">
                <Tv size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-colors">
                <Gamepad2 size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-muted hover:text-primary transition-colors">Tournaments</Link></li>
              <li><Link href="#" className="text-muted hover:text-primary transition-colors">Teams</Link></li>
              <li><Link href="#" className="text-muted hover:text-primary transition-colors">Players</Link></li>
              <li><Link href="#" className="text-muted hover:text-primary transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-muted hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-muted hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-muted hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted hover:text-primary transition-colors">Terms of Service</Link></li>
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
